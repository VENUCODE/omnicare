import React from "react";
import ImageCarousel from "../cmp/ImageCarousel";
import TeamCard from "./TeamCard";

const Team = () => {
  return (
    <div className="bg-dark pb-2 pt-0 mx-0 px-0">
      <h1 className="bg-white  rounded-bottom-2 text-dark poppins-semibold w-maxcontent mx-auto mt-0 px-1">
        Meet our team
      </h1>
      <ImageCarousel dots={false} noOfSlides={3} draggable={true}>
        {[1, 2, 3, 4, 5, 6, 7].map((i) => {
          return (
            <div key={i}>
              <div className="row">
                <TeamCard />
              </div>
            </div>
          );
        })}
      </ImageCarousel>
    </div>
  );
};

export default Team;
