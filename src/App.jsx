import React, { useEffect, useMemo, Suspense, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/Landing sections";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import TempCard from "./components/TempCard";
import { CSSTransition } from "react-transition-group";
import "./transitionStyle.css";
import { HeroAnimation } from "./components/AnimatedBox/HeroAnimation";

const LazyComponent = (factory) => {
  const Component = React.lazy(factory);
  return (props) => {
    const [inProp, setInProp] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => {
        setInProp(true);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <Suspense fallback={<TempCard count={6} />}>
        <CSSTransition in={inProp} timeout={1000} classNames="fade">
          <Component {...props} />
        </CSSTransition>
      </Suspense>
    );
  };
};

const Human = LazyComponent(() => import("./pages/human"));
const Plants = LazyComponent(() => import("./pages/plants"));
const Profile = LazyComponent(() => import("./pages/Profile"));

function Layout() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  useEffect(() => {
    AOS.init({
      duration: 1200,
      mirror: false,
      once: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div
        className={!isSmallDevice ? "mainContent-body" : "mainContent-body-bt"}
      >
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  // Memoize lazy loaded components
  const MemoizedHuman = useMemo(() => Human, []);
  const MemoizedPlants = useMemo(() => Plants, []);
  const MemoizedProfile = useMemo(() => Profile, []);

  return (
    <>
      <div className="h-100 w-100">
        <HeroAnimation />
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/human" element={<MemoizedHuman />} />
          <Route path="/plants" element={<MemoizedPlants />} />
          <Route path="/profile" element={<MemoizedProfile />} />
        </Route>
      </Routes>
    </>
  );
}
