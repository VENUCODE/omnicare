import React from "react";
import ImageCarousel from "../cmp/ImageCarousel";
import TeamCard from "./TeamCard";

const Team = () => {
  const team = [
    { name: "Vinitha K", id: "O190000", title: "Frontend Dev" },
    { name: "Yedukondalu naik", id: "O190679", title: "Software Dev" },
    { name: "Dharma Teja G", id: "O190000", title: "Documentor" },
    { name: "Venu Bitra", id: "O190000", title: "Documentor" },
    { name: "Babu Y", id: "O190000", title: "Nothing" },
  ];
  return (
    <div className=" pb-2 mt-2 mx-0 px-0">
      <h1 className="text-gradient-1  rounded-bottom-2  poppins-semibold w-maxcontent mx-auto mt-0 px-1">
        Meet our team
      </h1>
      <ImageCarousel
        dots={false}
        slidesToScroll={1}
        noOfSlides={3}
        draggable={true}
        className="py-2 "
      >
        {team.map((data, i) => {
          return (
            <div key={i}>
              <div className="row">
                <TeamCard data={data} />
              </div>
            </div>
          );
        })}
      </ImageCarousel>
    </div>
  );
};

export default Team;
