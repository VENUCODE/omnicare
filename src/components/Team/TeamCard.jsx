import React from "react";
import "./team.css";
const TeamCard = ({
  name = "name",
  id = "O190",
  description = "Abou the team member",
}) => {
  return (
    <div className="card  shadow d-flex">
      <div className="img-bx position-relative">
        <img src="https://i.postimg.cc/dQ7zWbS5/img-4.jpg" alt="img" />
      </div>
      <div className="content position-relative">
        <div className="detail">
          <h2 className="poppins-bold text-capitalize">{name}</h2>
          <p className="poppins-medium ">{id}</p>
          <p className="text-center poppins-regular ">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
