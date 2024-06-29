import React from "react";
import ModelLoad from "../../components/ModelLoad";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Home = () => {
  const humanitems = [
    {
      to: "/human",
      path: "/models/human_brain/scene.gltf",
      img: "/src/assets/imgs/brain.png",
      scale: 5,
      position: [0, -1, 0],
      title: "Brain Tumor Detection",
      description:
        "Get results from MRI images for accurate brain tumor detection. Our advanced technology analyzes MRI scans to identify and diagnose brain tumors. Experience a new level of precision and reliability in medical imaging.",
    },
    {
      to: "/human",
      path: "/models/realistic_human_heart/scene.gltf",
      img: "/src/assets/imgs/heart.png",
      position: [0, -0.5, 0],
      scale: 4,
      title: "Heart Risk Prediction",
      description:
        "Predict your heart risk with our advanced tools. Understand potential heart risks with our predictive analysis. Our system evaluates your data to offer insights into your heart health. Stay ahead with preventive measures.",
    },
    {
      to: "/human",
      path: "/models/animal_cell/scene.gltf",
      img: "/src/assets/imgs/animalcell.png",
      position: [0, 0.5, 0],
      scale: 1,
      title: "Disease Prediction",
      description:
        "Predict diseases from symptoms using our model. Our system identifies potential diseases based on your symptoms. Gain quick and reliable health insights. Early detection can lead to better health outcomes.",
      rotation: [45, 0, 0],
    },
    {
      to: "/human",
      path: "/models/lung/scene.gltf",
      img: "/src/assets/imgs/lung.png",
      scale: 0.03,
      position: [0, -5, 0],
      animation: false,
      title: "Pneumonia Prediction",
      description:
        "Predict pneumonia from symptoms with our tool. Our model helps in early detection and diagnosis. Get accurate results to start timely treatment. Protect your respiratory health with advanced technology.",
    },
  ];

  const plantitems = [
    {
      to: "/plants",
      path: "/models/land/scene.gltf",
      img: "/src/assets/imgs/animalcell.png",
      scale: 1,
      position: [0, -2, 0],
      rotation: [0.3, 0, 0],
      title: "Crop Recommendation",
      description:
        "Receive crop recommendations based on soil data. Our system analyzes soil to suggest the best crops. Enhance your agricultural yield with tailored advice. Ensure optimal crop selection for your soil type.",
    },
    {
      to: "/plants",
      path: "/models/tropical_plant_2/scene.gltf",
      img: "/src/assets/imgs/heart.png",
      position: [0, -2, 0],
      rotation: [0.3, 0, 0],
      scale: 3,
      title: "Plant Disease Prediction",
      description:
        "Identify plant diseases from leaf images accurately. Our technology helps in early disease detection. Protect your crops with timely intervention. Ensure healthy plant growth with precise diagnostics.",
    },
    {
      to: "/plants",
      path: "/models/pplant/scene.gltf",
      img: "/src/assets/imgs/animalcell.png",
      position: [0, -3, 0],
      rotation: [0.3, 0, 0],
      scale: 6,
      title: "Plant Identification",
      description:
        "Identify plants and predict diseases from symptoms. Our model provides accurate plant identification. Understand plant health and potential issues. Improve plant care with our diagnostic tools.",
    },
  ];

  return (
    <div className="container-fluid d-flex flex-column gap-3">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3 className="poppins-semibold w-maxcontent px-3 rounded-5 mx-auto bg-dark-subtle text-center ">
            Human Prognosis
          </h3>
        </Grid>
        {humanitems.map((model, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card className="row shadow-none shadow">
              <CardMedia className="col-md-6 col-12 ">
                <ModelLoad
                  path={model.path}
                  scale={model.scale}
                  position={model.position}
                  imagepath={model.img}
                  scene={true}
                  animation={model.animation}
                  rotation={model.rotation}
                  env={true}
                />
              </CardMedia>
              <CardContent className="col-md-6 col-12  d-flex flex-column justify-content-between ">
                <div>
                  <p className="poppins-bold mb-0 fs-4 text-gradient-3">
                    {model.title}
                  </p>
                  <Typography variant="body2" color="text.secondary">
                    {model.description}
                  </Typography>
                </div>
                <Link
                  to={model.to}
                  className="w-maxcontent px-2 bg-grad-3 text-decoration-none text-gradient-3 poppins-regular text-start border-0 "
                >
                  Get prognosis
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h3 className="poppins-semibold w-maxcontent px-3 rounded-5 mx-auto bg-dark-subtle text-center ">
            Plant prognosis
          </h3>
        </Grid>
        {plantitems.map((model, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card className="row shadow-none shadow ">
              <CardMedia className=" col-md-6 col-12">
                <ModelLoad
                  path={model.path}
                  scale={model.scale}
                  position={model.position}
                  imagepath={model.img}
                  scene={true}
                  env={false}
                  animation={model.animation}
                  rotation={model.rotation}
                />
              </CardMedia>
              <CardContent className=" col-md-6 col-12 d-flex flex-column justify-content-between gap-2">
                <div>
                  <p className="poppins-bold mb-0 fs-4 text-gradient-2">
                    {model.title}
                  </p>
                  <Typography variant="body2" color="text.secondary">
                    {model.description}
                  </Typography>
                </div>
                <Link
                  to={model.to}
                  className=" text-gradient-2 w-maxcontent bg-grad-1 text-decoration-none  poppins-regular text-start border-0 "
                >
                  Get prognosis
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Home;
