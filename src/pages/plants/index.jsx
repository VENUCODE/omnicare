import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import ModelLoad from "../../components/ModelLoad";
import Modal from "../../components/Modal";

const Plants = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const plantitems = [
    {
      to: "/plants",
      path: "/models/land/scene.gltf",
      img: "/src/assets/imgs/crop.jpg",
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
      img: "/src/assets/imgs/pdis.jpg",
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
      img: "/src/assets/imgs/cropid.jpg",
      position: [0, -3, 0],
      rotation: [0.3, 0, 0],
      scale: 6,
      title: "Plant Identification",
      description:
        "Identify plants and predict diseases from symptoms. Our model provides accurate plant identification. Understand plant health and potential issues. Improve plant care with our diagnostic tools.",
    },
  ];

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container my-4">
      <Grid container spacing={4} className="bg-transparent">
        <Grid item xs={12}>
          <div
            className=" bg-white shadow-sm py-1  rounded-5 w-100"
            data-aos="fade-right"
          >
            <h2
              className="poppins-bold  rounded-5 mx-auto  text-gradient-2  text-center "
              data-aos="flip-down"
              data-aos-delay="1250"
            >
              Plant Prognosis
            </h2>
          </div>
        </Grid>
        {plantitems.map((model, index) => (
          <Grid item xs={12} md={6} key={index} className="bg-transparent">
            <Card className="row shadow-none shadow bg-transparent p-0 m-0 ">
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
              <CardContent className="bg-white col-md-6 col-12 d-flex flex-column justify-content-between gap-2">
                <div>
                  <p
                    className="poppins-bold mb-0 fs-4 text-gradient-2"
                    data-aos="zoom-in"
                  >
                    {model.title}
                  </p>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    data-aos="zoom-in"
                  >
                    {model.description}
                  </Typography>
                </div>
                <Button
                  className="  px-2 py-1 rounded-0 w-maxcontent bg-grad-2 text-white   poppins-regular text-start border-0 "
                  onClick={() => handleOpenModal(model)}
                >
                  Get prognosis
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        title={selectedItem?.title}
      >
        {selectedItem && (
          <div>
            {selectedItem.title === "Crop Recommendation" && (
              <input type="text" placeholder="Enter soil data" />
            )}
            {selectedItem.title === "Plant Disease Prediction" && (
              <input type="text" placeholder="Enter leaf image data" />
            )}
            {selectedItem.title === "Plant Identification" && (
              <input type="text" placeholder="Enter plant symptoms" />
            )}
            <Button
              variant="contained"
              color="primary"
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Plants;
