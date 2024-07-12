import React from "react";
import ImageCarousel from "../cmp/ImageCarousel";
import TeamCard from "./TeamCard";
import Mentor from "./Mentor";

const Team = () => {
  const team = [
    { name: "Yedukondalu naik", id: "O190679", title: "Software Dev" },
    { name: "Dharma Teja G", id: "O190000", title: "Documentor" },
    { name: "Vinitha K", id: "O190000", title: "Frontend Dev" },
    { name: "Venu Bitra", id: "O190000", title: "Documentor" },
    { name: "Babu Y", id: "O190000", title: "Nothing" },
  ];
  return (
    <div className="container-fluid d-flex flex-column gap-3">
      <div>
        <div className="bg-glass mb-4">
          <h1 className="text-white  rounded-bottom-2  poppins-semibold w-maxcontent mx-auto mt-0 px-1">
            Meet our Guide
          </h1>
        </div>
        <Mentor />
      </div>
      <div>
        <div className="bg-glass">
          <h1 className="text-light  rounded-bottom-2  poppins-semibold w-maxcontent mx-auto mt-0 px-1">
            Meet our team
          </h1>
        </div>
        <ImageCarousel
          dots={false}
          slidesToScroll={1}
          noOfSlides={3}
          draggable={true}
          className="py-2 container-fluid"
        >
          {team.map((data, i) => {
            return (
              <div key={i}>
                <div className="row bg-transparent">
                  <TeamCard data={data} />
                </div>
              </div>
            );
          })}
        </ImageCarousel>
      </div>
    </div>
  );
};

export default Team;
