import "./styles.css";
import LandingPage from "./components/Landing sections";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="p-0 m-0">
      <Navbar />
      <LandingPage />
      <Home />
    </div>
  );
}
