import React, { useEffect, useMemo, useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import { HeroAnimation } from "./components/AnimatedBox/HeroAnimation";
import Navbar from "./components/Navbar";
import LandingPage from "./components/Landing sections";
import AOS from "aos";
import "aos/dist/aos.css";
import "./styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";
import MyPredictions from "./pages/Profile/MyPredictions";
import ProfileLayout from "./pages/Profile/Layout";
import { useUser } from "./context/useUser";
import Human from "./pages/human";
import Plants from "./pages/plants";
import Profile from "./pages/Profile";
import Login from "./pages/login"; // Add your login component

function Layout() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { isAuthenticated } = useUser();
  const location = useLocation();
  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      mirror: false,
      once: true,
    });
  }, []);

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  return (
    <>
      {(path === "/" || isAuthenticated) && <Navbar />}
      <div
        className={!isSmallDevice ? "mainContent-body" : "mainContent-body-bt"}
      >
        <Outlet />
      </div>
    </>
  );
}

export default function App() {
  const { isAuthenticated } = useUser();
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/auth" />;
  };

  return (
    <>
      <div className="h-100 w-100">
        <HeroAnimation />
      </div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route
            path="/human"
            element={
              <ProtectedRoute>
                <Human />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plants"
            element={
              <ProtectedRoute>
                <Plants />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfileLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Profile />} />
            <Route path="my-info" element={<Profile />} />
            <Route path="my-predictions" element={<MyPredictions />} />
          </Route>
          <Route
            path="/auth"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
        </Route>
        <Route
          path="*"
          element={
            <div className="bg-glass text-light fs-2">
              <h1>Page Not found</h1>
              <Link to="/">Go home</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}
