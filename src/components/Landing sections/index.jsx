import React from "react";
import "./index.css";
import Hero from "../Hero";
import Home from "../../pages/Home";
import Team from "../Team";
const LandingPage = () => {
  return (
    <div className=" border border-2 border-black container-fluid d-flex flex-column gap-3">
      <div className="contianer-fluid">
        <Hero />
      </div>
      <div>
        <Home />
      </div>
      <div>
        <Team />
      </div>
    </div>
  );
};

export default LandingPage;
