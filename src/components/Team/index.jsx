import React from "react";
import ImageCarousel from "../cmp/ImageCarousel";
import TeamCard from "./TeamCard";
import Mentor from "./Mentor";
import { Divider } from "@mui/material";

const Team = () => {
  const team = [
    { name: "Baladithya V", id: "O190629", title: "Team Lead" },
    { name: "Charan M", id: "O190417", title: "Teammate" },
  ];
  return (
    <div className="container-fluid d-flex flex-column gap-3">
      <div>
        <div className="bg-glass mb-4">
          <h1 className="text-white  rounded-bottom-2  poppins-semibold w-maxcontent mx-auto mt-0 px-1">
            Our Guide
          </h1>
        </div>
        <Mentor />
      </div>
      <div>
        <div className="bg-glass">
          <h1 className="text-light  rounded-bottom-2  poppins-semibold w-maxcontent mx-auto mt-0 px-1">
            Our team
          </h1>
        </div>
        {/* <ImageCarousel
          dots={false}
          slidesToScroll={1}
          noOfSlides={3}
          draggable={true}
          className="py-2 container-fluid"
        > */}
        <div className="container-fluid bg-glass d-flex flex-row h-100 justify-content-center gap-4 py-5">
          {team.map((data, i) => {
            return (
              <div key={i} className="card p-4">
                <TeamCard data={data} />
              </div>
            );
          })}
        </div>
        {/* </ImageCarousel> */}
      </div>
    </div>
  );
};

export default Team;
