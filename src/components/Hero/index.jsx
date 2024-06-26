import React from "react";
import Carousel from "react-material-ui-carousel";
import "./hero.css";
import logo from "../../assets/omnicarelogo.svg";
import ModelLoad from "../ModelLoad";
const carouselItems = [
  {
    src: "/c1.png",
    alt: "First slide",
  },
  {
    src: "/c2.png",
    alt: "Second slide",
  },
  {
    src: "/c3.png",
    alt: "Third slide",
  },
  {
    src: "/c4.png",
    alt: "Third slide",
  },
  {
    src: "/c5.png",
    alt: "Third slide",
  },
];
const Hero = () => {
  return (
    <div className="hero-container ">
      <Carousel indicators={false} style={{ height: "100vh" }}>
        {carouselItems.map((item, index) => (
          <img
            key={index}
            className="h-100 w-100 "
            src={item.src}
            alt={item.alt}
          />
        ))}
      </Carousel>
      <div className="container-fluid d-flex justify-content-center row  foreground-content">
        <div className="row col-6-md col-12">
          <div className="col-md-6 ">
            <ModelLoad
              scene={false}
              height="400px"
              path="/models/steth/scene.gltf"
              imagepath="/steth.png"
              scale={1.2}
              rotation={[0, 0, -0.6]}
            />
          </div>
          <div className="col-md-6 container-fluid d-flex justify-content-center flex-column">
            <div className="fs-1 poppins-bold bgblur">
              <img src={logo} style={{ height: "6rem" }} />
              <span className="tlg fs-1 ">MNI</span>
              <span className="text-dark">CARE</span>
            </div>
            <div className="bgdark text-center poppins-semibold fs-3 d-flex justify-content-center align-items-center ">
              Prognosis at your finger tip
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
