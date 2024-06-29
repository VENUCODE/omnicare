import React, { useEffect, useMemo, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/Landing sections";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";

// Lazy load components
const LazyComponent = (factory) => {
  const Component = React.lazy(factory);
  return (props) => (
    <Suspense fallback={<div>Loading...</div>}>
      <Component {...props} />
    </Suspense>
  );
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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/human" element={<MemoizedHuman />} />
        <Route path="/plants" element={<MemoizedPlants />} />
        <Route path="/profile" element={<MemoizedProfile />} />
      </Route>
    </Routes>
  );
}
