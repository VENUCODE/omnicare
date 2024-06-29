import React from "react";
import "./index.css";
import Hero from "../Hero";
import Home from "../../pages/Home";
import Team from "../Team";
const LandingPage = () => {
  return (
    <div className="container-fluid p-0 m-0">
      <div>
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
