import { Avatar, Card, CardContent, Grid } from "@mui/material";
import { FaRegStar } from "react-icons/fa";
const TestimonialCard = ({ data }) => {
  return (
    <Card className="rounded-4 " style={{ height: "280px", width: "355px" }}>
      <CardContent>
        <Grid container>
          <Grid item xs={4}>
            <Avatar
              alt={data.name || " name"}
              src={data.image || "image "}
              sx={{ width: 78, height: 78 }}
            />
          </Grid>
          <Grid item xs={8}>
            <p className=" p-0 my-0 text-color poppins-bold text-medium w-100 text-ellipsis">
              {data.name || "name"}
            </p>
            <p className=" p-0 my-0 poppins-light text-color text-small">
              {data.role || "role"}
            </p>
            <div className="">
              {Array.from(
                { length: Math.round(data.rating || 4) },
                (_, index) => (
                  <FaRegStar key={index} className="text-color" />
                )
              )}
            </div>
          </Grid>
          <Grid item container xs={12} className="mt-3">
            <Grid item xs={12}>
              <p className="poppins-bold text-medium py-0 my-0 w-100 text-ellipsis pe-2">
                Title of testimonila
                text-ellipsistext-ellipsistext-ellipsistext-ellipsistext-ellipsistext-ellipsis
              </p>
            </Grid>
            <Grid item xs={12}>
              <p className=" poppins-light text-tiny w-100 h-50 py-1 overflow-y-hidden">
                {data.testimonial || " testimonial data"}
              </p>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
