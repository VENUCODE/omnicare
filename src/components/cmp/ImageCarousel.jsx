import React, { Children } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imageCarousel.css";

const ImageCarousel = ({ children, noOfSlides, ...props }) => {
  const settings = {
    className: "center",
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: noOfSlides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    swipeToSlide: true,
    centerMode: true,
    swippable: true,
    draggable: true,
    pauseOnHover: true,
    variableWidth: true,
    ...props,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default ImageCarousel;
