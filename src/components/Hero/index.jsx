import React, { useState, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./hero.css";
import logo from "../../assets/omnicarelogo.svg";
import ModelLoad from "../ModelLoad";

import doctor from "../../assets/doctor.webp";
const Hero = () => {
  return (
    <div className="hero-container ">
      <div className="container-fluid d-flex justify-content-center row foreground-content">
        <div className="row col-6-md col-12">
          <div className="col-md-6">
            <div className="rgrad-1 rounded-0">
              <ModelLoad
                height="500px"
                path="/models/steth/scene.gltf"
                imagepath="/steth.png"
                scale={1.2}
                scene={false}
                env={true}
                rotation={[0, 0, -0.6]}
              />
            </div>
          </div>
          <div className="col-md-6  container-fluid d-flex justify-content-center flex-column">
            <div className="fs-1 poppins-bold bg-glass rounded-0 border-0 ">
              <img src={logo} style={{ height: "6rem" }} alt="Omnicare logo" />
              <span className="tlg fs-1">MNI</span>
              <span className="text-white">CARE</span>
            </div>
            <div className=" text-center bg-glass border-0 rounded-0 poppins-semibold fs-3 d-flex justify-content-center align-items-center">
              Prognosis at your finger tip
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
