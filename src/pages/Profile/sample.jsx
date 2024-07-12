import React, { useEffect, useRef } from "react";

const ProfileSample = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    import("../../visme");

    const handleMessage = (event) => {
      // Ensure the message is from the trusted iframe origin
      if (event.origin !== "https://visme.co") return;

      const iframeDocument =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow.document;

      // Accessing the div with className "visme_d" inside the iframe
      const vismeDiv = iframeDocument.querySelector(".visme_d");
      window.parent.console.log(vismeDiv);
      if (vismeDiv) {
        // Listen for form submission events inside the visme_d div
        vismeDiv.addEventListener("submit", handleFormSubmit);
      }
    };

    const handleFormSubmit = (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const data = {};
      formData.forEach((value, key) => {
        data[key] = value;
      });

      console.log("Form data received from iframe:", data);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleLinkClick = (event) => {
    event.preventDefault();
    if (iframeRef.current) {
      iframeRef.current.src = event.target.href;
    }
  };

  return (
    <div className="h-100 d-flex flex-md-row flex-column gap-2 px-2 pt-2">
      <div
        style={{ minWidth: "200px" }}
        className="text-white bg-glass rounded-0 d-flex flex-column gap-2"
      >
        <a
          className="btn btn-warning text-decoration-none w-100 bg-glass rounded-1"
          href="https://forms.visme.co/formsPlayer/kkgneryk-conference-sign-up-form"
          onClick={handleLinkClick}
        >
          Signup
        </a>
      </div>
      <iframe
        className="bg-glass-1 p-0 m-0 rgrad-1"
        ref={iframeRef}
        style={{
          width: "100%",
          minHeight: "400px",
          maxHeight: "600px",
          height: "100vh",
          border: "none",
        }}
      ></iframe>
    </div>
  );
};

export default ProfileSample;
