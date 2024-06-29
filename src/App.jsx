import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/Landing sections";
import Human from "./pages/human";
import Plants from "./pages/plants";
import Profile from "./pages/Profile";
import "./styles.css";
import { useMediaQuery } from "@uidotdev/usehooks";
function Layout() {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

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
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/" element={<LandingPage />} />
        <Route path="/human" element={<Human />} />
        <Route path="/plants" element={<Plants />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
}
