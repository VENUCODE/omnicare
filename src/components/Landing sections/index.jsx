import React from "react";
import "./index.css";
import Hero from "../Hero";
import Home from "../../pages/Home";
import Team from "../Team";
const LandingPage = () => {
  return (
    <div className="container-fluid d-flex flex-column gap-3">
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
