import React from "react";
import person from "../../assets/person.png";
const TeamCard = ({ data }) => {
  const { name, id, title, img = "" } = data;
  return (
    <div className="m-1 ">
      <div className="w-maxcontent content  ">
        <div className="col-12  ">
          <img
            src={person}
            alt="img"
            c
            style={{
              height: "100px",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="col-12 d-flex bg-glass  flex-column justify-content-center align-items-center gap-0 py-2">
          <p className="poppins-bold my-0 pt-2 text-gradient-1">{name}</p>
          <p className="poppins-medium my-0 pt-2 text-gradient-1">{id}</p>
          <p className="poppins-regular my-0 pt-2 text-gradient-1">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
