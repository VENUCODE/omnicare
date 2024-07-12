import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const Mentor = ({
  image = "https://picsum.photos/200/300?random=2",
  title = "Mallikarjuna Nandi",
  subtitle = "Asst.Professor IIIT Ongole",
  description = "Lorem ispusm",
}) => {
  return (
    <div className="row  ">
      <div className=" col-md-5 col-12  d-flex justify-content-center align-items-center ">
        {" "}
        <img
          src="https://picsum.photos/200/300?random=8"
          className="object-fit-cover w-100 bg-glass rounded-2"
          style={{
            maxWidth: "400px",
            width: "300px",
            minWidth: "200px",
            maxHeight: "200px",
            height: "100%",
          }}
        />
      </div>
      <div className="bg-glass rgrad-r col-md-6 col-12 rounded-0">
        <div>
          <h1 className="text-white poppins-semibold w-maxcontent">
            Mr. Mallikarjuna Nandi
          </h1>
          <h5 className="text-light poppins-medium w-maxcontent">
            Assistant Professor@ IIIT ONGOLE
          </h5>
        </div>
        <div>
          <p className="poppins-regular text-light">
            Our HoD exemplifies visionary leadership and profound expertise in
            computer science. He fosters innovation and empowers students to
            excel, combining deep knowledge with unwavering support. His
            optimism and guidance inspire growth and transformation, shaping
            future leaders in technology
          </p>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
