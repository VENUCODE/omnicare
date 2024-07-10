import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";

const Mentor = ({
  image = "https://picsum.photos/200/300?random=2",
  title = "Mallikarjuna Nandi",
  subtitle = "Asst.Professor IIIT Ongole",
  description = "Lorem ispusm",
}) => {
  return (
    <div className="row my-2">
      <div className="col-md-6 col-12 bg-glass px-0">
        {" "}
        <img
          src="https://picsum.photos/200/300?random=2"
          className="object-fit-cover w-100"
          height={"300px"}
        />
      </div>
      <div className="col-md-6 col-12 bg-glass rounded-0">
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
