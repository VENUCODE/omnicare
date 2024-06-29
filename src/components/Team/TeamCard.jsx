import React from "react";
import "./team.css";
const TeamCard = ({ data }) => {
  const { name, id, title } = data;
  return (
    <div className="card  d-flex">
      <div className="img-bx position-relative">
        <img src="https://i.postimg.cc/dQ7zWbS5/img-4.jpg" alt="img" />
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
