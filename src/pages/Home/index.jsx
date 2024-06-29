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
      title: "Brain turmor detection",
      description: "Get result from the MRI image",
    },
    {
      to: "/human",
      path: "/models/realistic_human_heart/scene.gltf",
      img: "/src/assets/imgs/heart.png",
      position: [0, -0.5, 0],

      scale: 4,
      title: "Heart Risk prediction",
      description: "Get your heart risk predition ",
    },

    {
      to: "/human",
      path: "/models/animal_cell/scene.gltf",
      img: "/src/assets/imgs/animalcell.png",
      position: [0, 0.5, 0],

      scale: 1,
      title: "Disease prediction",
      description: "Disease prediction from symptoms",
      rotation: [45, 0, 0],
    },
    {
      to: "/human",
      path: "/models/lung/scene.gltf",
      img: "/src/assets/imgs/lung.png",
      scale: 0.03,
      position: [0, -5, 0],
      animation: false,
      title: "Pneumonia prediction",
      description: "Disease prediction from symptoms",
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
      title: "Crop recommendition",
      description: "crop recomendition based on soil prediction",
    },

    {
      to: "/plants",
      path: "/models/tropical_plant_2/scene.gltf",
      img: "/src/assets/imgs/heart.png",
      position: [0, -2, 0],
      rotation: [0.3, 0, 0],
      scale: 3,
      title: "Plant disease prediction",
      description: "Identify crop disease based on crop leaf image ",
    },

    {
      to: "/plants",
      path: "/models/pplant/scene.gltf",
      img: "/src/assets/imgs/animalcell.png",
      position: [0, -3, 0],
      rotation: [0.3, 0, 0],
      scale: 6,
      title: "Plant identification",
      description: "Disease prediction from symptoms",
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
            <Card className="d-flex flex-row">
              <CardMedia className="flex-grow-1">
                <ModelLoad
                  path={model.path}
                  scale={model.scale}
                  position={model.position}
                  imagepath={model.img}
                  scene={false}
                  animation={model.animation}
                  rotation={model.rotation}
                  env={true}
                />
              </CardMedia>
              <CardContent className="flex-grow-1 d-flex flex-column justify-content-center gap-2">
                <div>
                  <p className="poppins-bold mb-0 fs-4">{model.title}</p>
                  <Typography variant="body2" color="text.secondary">
                    {model.description}
                  </Typography>
                </div>
                <Link
                  to={model.to}
                  className="w-maxcontent text-decoration-none text-danger bg-transparent poppins-regular text-start border-0 "
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
            <Card className="d-flex flex-row">
              <CardMedia className="flex-grow-1">
                <ModelLoad
                  path={model.path}
                  scale={model.scale}
                  position={model.position}
                  imagepath={model.img}
                  scene={false}
                  env={false}
                  animation={model.animation}
                  rotation={model.rotation}
                />
              </CardMedia>
              <CardContent className="flex-grow-1 d-flex flex-column justify-content-center gap-2">
                <div>
                  <p className="poppins-bold mb-0 fs-4">{model.title}</p>
                  <Typography variant="body2" color="text.secondary">
                    {model.description}
                  </Typography>
                </div>
                <Link
                  to={model.to}
                  className="w-maxcontent text-decoration-none text-danger bg-transparent poppins-regular text-start border-0 "
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
