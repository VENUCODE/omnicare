import React from "react";
import "./team.css";
const TeamCard = ({ data }) => {
  const {
    name,
    id,
    title,
    img = "https://picsum.photos/200/300?random=2",
  } = data;
  return (
    <div className="card  d-flex  border-0 my-2 shadow">
      <div className="img-bx position-relative">
        <img src={img} alt="img" />
      </div>
      <div className="content position-relative">
        <div className="detail">
          <h2 className="poppins-bold text-capitalize text-gradient-1">
            {name}
          </h2>
          <p className="poppins-medium ">{id}</p>
          <p className="text-center poppins-regular ">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
