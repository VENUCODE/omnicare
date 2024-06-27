import React from "react";
import Carousel from "react-material-ui-carousel";
import "./hero.css";
import logo from "../../assets/omnicarelogo.svg";

const carouselItems = [
  {
    src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "First slide",
  },
  {
    src: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Second slide",
  },
  {
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Third slide",
  },
];
const Hero = () => {
  return (
    <div className="hero-container">
      <Carousel>
        {carouselItems.map((item, index) => (
          <img
            key={index}
            className="carousel-img"
            src={item.src}
            alt={item.alt}
          />
        ))}
      </Carousel>
      <div className="container row px-0 foreground-content">
        <div className="row col-6-md col-12">
          <div className="col-md-6 col-12 bgblur">
            <div className="fs-1 poppins-bold ">
              <img src={logo} style={{ height: "6rem" }} />
              <span className="tlg fs-1 ">MNI</span>
              <span className="text-dark">CARE</span>
            </div>
          </div>
          <div className="col-md-6  col-12 bgdark text-center poppins-semibold fs-3 d-flex justify-content-center align-items-center ">
            Prognosis at your finger tip
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
