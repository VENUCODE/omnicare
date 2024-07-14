import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import mentor from "../../assets/working.png";
import person from "../../assets/person.png";

const Mentor = ({
  image = "https://picsum.photos/200/300?random=2",
  title = "Mallikarjuna Nandi",
  subtitle = "Asst.Professor IIIT Ongole",
  description = "Lorem ispusm",
}) => {
  return (
    <div className="row ">
      <div className=" col-md-5 col-12  d-flex justify-content-center align-items-center ">
        {" "}
        <img
          src={person}
          className="object-fit-cover w-100 bg-glass rounded-2"
          style={{
            width: "300px",

            height: "100%",
          }}
        />
      </div>
      <div className="bg-glass rgrad-r col-md-7 col-12 rounded-0 position">
        <div>
          <h1 className="text-white poppins-medium w-maxcontent">
            Mr. Mallikarjuna Nandi
          </h1>
          <h5 className="text-light poppins-regular w-maxcontent">
            Assistant Professor@ IIIT ONGOLE
          </h5>
        </div>
        <div className="position-relative ">
          <p className="poppins-extralight text-light">
            Our HoD exemplifies visionary leadership and profound expertise in
            computer science. He fosters innovation and empowers students to
            excel, combining deep knowledge with unwavering support. His
            optimism and guidance inspire growth and transformation, shaping
            future leaders in technology
          </p>
        </div>
        <img
          src={mentor}
          className="position-absolute fade-right"
          style={{
            maxWidth: "400px",
            width: "100px",
            top: 0,
            objectFit: "cover",
            minWidth: "200px",
            maxHeight: "300px",
            height: "100%",
            right: 0,
          }}
        />
      </div>
    </div>
  );
};

export default Mentor;
