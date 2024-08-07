!(function () {
  "use strict";
  if ("undefined" != typeof window && void 0 === window.vismeForms) {
    let e = {
      constants: { mode: { INLINE: "inline", FULL_PAGE: "fullPage" } },
      iframeId: 1,
      forms: [],
      flags: {
        isInitialized: !1,
        isInitOnReadyFired: !1,
        shouldBeShown: !1,
        shouldBePreloaded: !1,
      },
      initOnReady() {
        e.flags.isInitOnReadyFired || e.onInit(window, e.init);
      },
      onInit(t, r) {
        if (
          t.document &&
          ("complete" === t.document.readyState ||
            "interactive" === t.document.readyState)
        ) {
          r();
          return;
        }
        e.addEvent(t, "load", r),
          t.document &&
            (e.addEvent(t.document, "DOMContentLoaded", r),
            e.addEvent(t.document, "readystatechange", function () {
              "complete" === t.document.readyState && r();
            }));
      },
      init() {
        e.flags.isInitialized ||
          ((e.flags.isInitialized = !0),
          e.setupVisme(),
          e.addEvent(window, "message", e.onMessageHandler, !1));
      },
      getWidth: () => "100%",
      getHeight: (e) => (e ? "100vh" : "100%"),
      getStyle(e) {
        let t = "border: none; max-width: 100%; ";
        return (
          e &&
            (t +=
              "position: fixed; z-index: 999999; top: 0; left: 0; background: rgba(255, 255, 255, 0.78); "),
          t
        );
      },
      async getSettings({ vismeDiv: e, formId: t, origin: r }) {
        if (t && r) {
          let i =
            "true" === e.getAttribute("data-full-page") ? "?type=fullPage" : "";
          try {
            let e = await fetch(`${r}/ajax/forms/settings/${t}${i}`),
              s = await e.json();
            if (s?.settings) return JSON.parse(s.settings);
          } catch (e) {
            console.warn("VISME_FORMS: Error fetching popup settings.", e);
          }
        } else
          console.warn(
            "VISME_FORMS: Popup settings are not loaded. Please update your embed code."
          );
        if (e.getAttribute("data-trigger-page-load"))
          return { afterPageLoad: !0 };
        if (e.getAttribute("data-trigger-user-interaction"))
          return { afterUserInteraction: !0 };
        let i = parseInt(e.getAttribute("data-trigger-scroll"));
        if (!Number.isNaN(i)) return { afterScrollDown: i };
        if (e.getAttribute("data-trigger-leave")) return { beforeLeave: !0 };
        let s = parseInt(e.getAttribute("data-trigger-timer"));
        return Number.isNaN(s) ? null : { afterTime: s };
      },
      addOnUserInteractionListener(t, r) {
        let i = () => {
          if (e.flags[r]) {
            console.warn(
              "VISME_FORMS: onUserInteraction callback already fired"
            );
            return;
          }
          t(), (e.flags[r] = !0);
        };
        [
          "keydown",
          "mousedown",
          "mousemove",
          "touchmove",
          "touchstart",
          "touchend",
          "wheel",
        ].forEach((e) => {
          document.addEventListener(e, i, { once: !0 });
        });
      },
      popupHandlers: {
        onAfterTime(e, t) {
          setTimeout(() => {
            t();
          }, 1e3 * e);
        },
        onPageScroll(e, t) {
          let r = document.documentElement.scrollHeight - window.innerHeight;
          r <= 0
            ? t()
            : ((e) => {
                let i = (e / 100) * r,
                  s = () => {
                    window.scrollY >= i &&
                      (t(), window.removeEventListener("scroll", s));
                  };
                window.addEventListener("scroll", s);
              })(e);
        },
        onUserInteraction(t) {
          e.addOnUserInteractionListener(t, "shouldBeShown");
        },
        onPageLeave(e) {
          document.body.addEventListener("mouseleave", e, { once: !0 });
        },
      },
      setPopupListener(t, r) {
        let i = t.settings;
        if (i?.afterPageLoad || !i) {
          r();
          return;
        }
        let {
            afterUserInteraction: s,
            afterScrollDown: o,
            beforeLeave: n,
            afterTime: a,
          } = i,
          { popupHandlers: d } = e;
        a
          ? d.onAfterTime(a, r)
          : o
            ? d.onPageScroll(o, r)
            : s
              ? d.onUserInteraction(r)
              : n && d.onPageLeave(r);
      },
      defineEmbedMode(t) {
        let { INLINE: r, FULL_PAGE: i } = e.constants.mode;
        return "true" === t.getAttribute("data-full-page") ? i : r;
      },
      isDivTopEdgeInViewport(e) {
        let t = window.innerHeight || document.documentElement.clientHeight,
          r = e.getBoundingClientRect();
        return r.top >= 0 && r.top <= t;
      },
      loadPopup(t) {
        e.createIframe(t, !0),
          e.setPopupListener(t, () => {
            let r = e.getFormByIframeId(t.iframeId);
            if (!r.ref) {
              console.warn("VISME_FORMS: form.ref not found");
              return;
            }
            (r.ref.style.opacity = 1),
              (r.ref.style.zIndex = 999999),
              r.ref.contentWindow.postMessage(
                { type: "vismeForms:play", id: t.formId },
                "*"
              ),
              e.increaseNumberOfVisits(t.formId),
              e.updateLastVisit(t.formId);
          });
      },
      async getVismeDivsForSetup() {
        let t = document.getElementsByClassName("visme_d"),
          r = [];
        for (let i of t) {
          let t = i.getAttribute("data-form-id") || "",
            s = "true" === i.getAttribute("data-full-page"),
            o = e.getOrigin(i),
            n = e.defineEmbedMode(i),
            a = {
              vismeDiv: i,
              width: e.getWidth(),
              height: e.getHeight(s),
              style: e.getStyle(s),
              origin: o,
              formId: t,
              mode: n,
              iframeId: this.iframeId,
              settings: null,
            },
            d =
              r.some((e) => e.formId === t) && n === e.constants.mode.FULL_PAGE;
          t &&
            !d &&
            (r.push(a),
            e.forms.push({
              formId: t,
              ref: null,
              mode: n,
              iframeId: this.iframeId,
            }),
            this.iframeId++);
        }
        for (let t of r) {
          let { vismeDiv: r, formId: i, origin: s } = t,
            o = await e.getSettings({ vismeDiv: r, formId: i, origin: s });
          t.settings = o || null;
        }
        return r;
      },
      async setupVisme() {
        (await e.getVismeDivsForSetup()).forEach(async (t) => {
          let r = t.mode === e.constants.mode.FULL_PAGE,
            i = !0;
          if (t.settings?.showing)
            switch (t.settings.showing.type) {
              case "everySession":
                i = !window.sessionStorage.getItem(
                  `vismeforms_${t.formId}_closed`
                );
                break;
              case "submission":
                i = !window.localStorage.getItem(
                  `vismeforms_${t.formId}_submitted`
                );
                break;
              case "closingForm":
                i = !window.localStorage.getItem(
                  `vismeforms_${t.formId}_closed`
                );
                break;
              case "visit":
                i = e.getNumberOfVisits(t.formId) < t.settings.showing.value;
                break;
              case "onceEvery": {
                let e =
                    parseInt(
                      window.localStorage.getItem(
                        `vismeforms_${t.formId}_lastVisit`
                      )
                    ) || 0,
                  [r, s] = t.settings.showing.value.split("*");
                e &&
                  r &&
                  s &&
                  (i =
                    Date.now() >
                    e +
                      parseInt(r) *
                        { hours: 36e5, days: 864e5, weeks: 6048e5 }[s]);
              }
            }
          if (r && !i) {
            console.warn(
              "VISME_FORMS: Full page form not shown because of showing settings"
            );
            return;
          }
          if (t.settings?.afterPageLoad) {
            r ? e.loadPopup(t) : e.createIframe(t);
            return;
          }
          if (r) {
            e.addOnUserInteractionListener(() => {
              e.loadPopup(t);
            }, `shouldBePreloaded-${t.mode}-${t.iframeId}`);
            return;
          }
          if (e.isDivTopEdgeInViewport(t.vismeDiv)) {
            e.createIframe(t);
            return;
          }
          e.addOnUserInteractionListener(() => {
            e.createIframe(t);
          }, `shouldBePreloaded-${t.mode}-${t.iframeId}`);
        });
      },
      getOrigin(e) {
        let t = e.getAttribute("data-domain") || "my";
        return `https://${t}.visme.co`;
      },
      addEvent(e, t, r) {
        e.addEventListener && e.addEventListener(t, r, !1);
      },
      getFormByIframeId: (t) => e.forms.find((e) => e.iframeId === t),
      getFormByIdAndMode: (t, r) =>
        e.forms.find((e) => e.formId === t && e.mode === r),
      createIframe(
        {
          vismeDiv: t,
          width: r,
          height: i,
          style: s,
          iframeId: o,
          mode: n,
          origin: a,
        },
        d = !1
      ) {
        let l = e.getFormByIframeId(o);
        if (!l || l.ref) return;
        let m = document.createElement("IFRAME"),
          f =
            "/formsPlayer/_embed/" +
            t.getAttribute("data-url") +
            "?embedIframeId=" +
            o;
        (m.style.cssText = s),
          (m.style.minHeight = t.getAttribute("data-min-height")),
          (m.style.width = r),
          (m.style.height = i),
          (m.style.border = "none"),
          d &&
            ((m.style.transition = "opacity 0.2s"),
            (m.style.opacity = 0),
            (m.style.zIndex = -999)),
          m.setAttribute("webkitallowfullscreen", !0),
          m.setAttribute("mozallowfullscreen", !0),
          m.setAttribute("allowfullScreen", !0),
          m.setAttribute("scrolling", "no"),
          m.setAttribute("src", a + f),
          m.setAttribute("title", t.getAttribute("data-title")),
          n === e.constants.mode.INLINE && m.setAttribute("loading", "lazy"),
          (m.className = "vismeForms"),
          t.parentNode.replaceChild(m, t),
          (l.ref = m);
      },
      onMessageHandler(t) {
        if (-1 === t.origin.indexOf("visme")) return;
        let r = t.data.type,
          i = t.data.id;
        if ("vismeForms:shouldClose" === r) {
          let t = e.getFormByIdAndMode(i, e.constants.mode.FULL_PAGE);
          t?.ref.parentNode.removeChild(t.ref),
            window.sessionStorage.setItem(`vismeforms_${i}_closed`, "true"),
            window.localStorage.setItem(`vismeforms_${i}_closed`, "true");
        }
        if (
          ("vismeForms:submitSuccess" === r &&
            window.localStorage.setItem(`vismeforms_${i}_submitted`, "true"),
          "vismeForms:formRectUpdated" === r)
        ) {
          let r = e.getFormByIframeId(parseInt(t.data.iframeId));
          if (!r || r.iframeSizeAdjusted) return;
          let i = JSON.parse(t.data.data.formRect);
          (r.ref.style.minHeight =
            Math.min(Math.max(i.height, 500), 600) +
            Number(t.data.data.badgeHeight) +
            "px"),
            (r.iframeSizeAdjusted = !0);
        }
        if ("vismeForms:redirectUser" === r) {
          let { url: e } = t.data;
          window.location.href = e;
        }
      },
      getNumberOfVisits: (e) =>
        parseInt(window.localStorage.getItem(`vismeforms_${e}_visits`)) || 0,
      increaseNumberOfVisits(t) {
        let r = e.getNumberOfVisits(t);
        window.localStorage.setItem(`vismeforms_${t}_visits`, r + 1);
      },
      updateLastVisit(e) {
        window.localStorage.setItem(`vismeforms_${e}_lastVisit`, Date.now());
      },
    };
    (window.vismeForms = e), e.initOnReady();
  }
})();
