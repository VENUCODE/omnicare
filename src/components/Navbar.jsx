import { useEffect, useState } from "react";
import { PiPlantDuotone } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { TbUserPentagon } from "react-icons/tb";
import { useMediaQuery } from "@uidotdev/usehooks";
import { VscAccount } from "react-icons/vsc";
import "./navStyles.css";
import logo from "../assets/omnicarelogo.svg";
import { Link, useLocation, useParams } from "react-router-dom";
function Navbar() {
  const location = useLocation();
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const [active, setActive] = useState(getInitialActive(location.pathname));

  // Function to set initial active state based on pathname
  function getInitialActive(pathname) {
    if (pathname === "/") return "home";
    if (pathname === "/plants") return "plant";
    if (pathname === "/human") return "human";
    if (pathname === "/profile" || pathname.startsWith("/profile/"))
      return "profile";
    return "home";
  }
  function handleSetActive(link) {
    setActive(link);
  }

  return (
    <>
      {!isSmallDevice && (
        <nav className="navbar navbar-expand-md bg-glass  container fixed-top mx-auto rounded-5 shadow-sm my-1">
          <div className="container py-1 px-3">
            <Link to="/" className="navbar-brand poppins-bold text-white">
              <img src={logo} style={{ height: "2rem" }} />
              <span className="tlg">MNI</span>CARE
            </Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className={`nav-item poppins-light`}>
                  <Link
                    to="/"
                    className={`nav-link  py-0 text-capitalize transition-all text-light  ${active === "home" ? "rgrad-1 bg-glass rounded-5 " : ""}`}
                    onClick={() => handleSetActive("home")}
                  >
                    Home
                  </Link>
                </li>
                <li className={`nav-item poppins-light `}>
                  <Link
                    to="/plants"
                    className={`nav-link  py-0 text-capitalize transition-all text-light  ${active === "plants" ? "rgrad-3 bg-glass rounded-5 " : ""}`}
                    onClick={() => handleSetActive("plants")}
                  >
                    Plants
                  </Link>
                </li>
                <li className={`nav-item poppins-light`}>
                  <Link
                    to="/human"
                    className={`nav-link  py-0 text-capitalize transition-all text-light  ${active === "human" ? "rgrad-2 bg-glass rounded-5 " : ""}`}
                    onClick={() => handleSetActive("human")}
                  >
                    Human
                  </Link>
                </li>
                <li className={`nav-item poppins-light `}>
                  <Link
                    to="/profile"
                    className={`nav-link  py-0 text-capitalize transition-all text-light  ${active === "profile" ? "rgrad-1 bg-glass rounded-5 " : ""}`}
                    onClick={() => handleSetActive("profile")}
                  >
                    profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
      {isSmallDevice && (
        <div className="fixed-bottom w-75 mx-auto bg-glass d-flex justify-content-between my-2 px-3 py-1 rounded-5 gap-2 align-items-center">
          <div className="w-auto d-flex justify-content-center align-items-center">
            <Link
              to="/"
              className={`icon-container p-2 rounded-circle ${
                active === "home" ? "icon-container-active" : "bg-dark"
              }`}
            >
              <IoHome
                className={`${active === "home" ? "icon-active tlg" : "icon"}`}
                size={25}
                onClick={() => {
                  setActive("home");
                }}
              />
            </Link>
          </div>
          <div className="w-auto gap-4 position-relative bg-dark d-flex flex-row w-maxcontent px-4 rounded-5">
            <Link
              to="/plants"
              className={`icon-container p-2 rounded-circle ${
                active === "plant" ? "icon-container-active" : "bg-dark"
              }`}
            >
              <PiPlantDuotone
                className={`${active === "plant" ? "icon-active tlg" : "icon"}`}
                size={25}
                onClick={() => {
                  setActive("plant");
                }}
              />
            </Link>
            <Link
              to="/human"
              className={`icon-container p-2 rounded-circle ${
                active === "human" ? "icon-container-active" : "bg-dark"
              }`}
            >
              <TbUserPentagon
                className={`${active === "human" ? "icon-active tlg" : "icon"}`}
                size={25}
                onClick={() => {
                  setActive("human");
                }}
              />
            </Link>
          </div>
          <div className="w-auto d-flex justify-content-center align-items-center">
            <Link
              to="/profile"
              className={`icon-container p-2 rounded-circle ${
                active === "profile" ? "icon-container-active" : "bg-dark"
              }`}
            >
              <VscAccount
                className={`${
                  active === "profile" ? "icon-active tlg" : "icon"
                }`}
                size={25}
                onClick={() => {
                  setActive("profile");
                }}
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
