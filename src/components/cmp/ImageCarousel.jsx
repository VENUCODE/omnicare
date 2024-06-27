// ImageCarousel.jsx
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./imageCarousel.css";

const CustomDot = ({ onClick, active }) => (
  <li>
    <button
      className={`custom-dot ${active ? "custom-dot-active" : ""}`}
      onClick={onClick}
    />
  </li>
);

const ImageCarousel = ({
  children,
  noOfSlides = 1,
  className = "",
  ...props
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 4000,
    slidesToShow: noOfSlides,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    swipeToSlide: true,
    centerMode: true,
    draggable: true,
    centerPadding: "0px",
    ...props,
    appendDots: (dots) => (
      <div>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => <CustomDot />,
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
          slidesToShow: 2,
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
    <div className={`container-fluid w-100 my-4 ${className}`}>
      <Slider {...settings} className="container">
        {children}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
