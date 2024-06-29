import React from "react";
import "./index.css";
import Hero from "../Hero";
import Team from "../Team";
const LandingPage = () => {
  return (
    <div className="container-fluid p-0 m-0">
      <div>
        <Hero />
      </div>
      <div className="container-fluid px-0 mx-0 mt-2">{/* <Team /> */}</div>
    </div>
  );
};

export default LandingPage;
