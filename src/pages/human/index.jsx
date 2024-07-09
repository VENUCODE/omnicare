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
import DiseasePred from "../../components/DiseasePrediction";
import BrainTumorForm from "../../components/BrainTumor";
import DiabeticPrediction from "../../components/DiabeticPrediction";
import HeartRisk from "../../components/HeartRisk";
import Pneumonia from "../../components/Pneumonia";

const Human = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const humanitems = [
    {
      to: "/human",
      path: "/models/human_brain/scene.gltf",
      img: "/imgs/brain.png",
      scale: 5,
      position: [0, -1, 0],
      title: "Brain Tumor Detection",
      description:
        "Get results from MRI images for accurate brain tumor detection. Our advanced technology analyzes MRI scans to identify and diagnose brain tumors. Experience a new level of precision and reliability in medical imaging.",
    },
    {
      to: "/human",
      path: "/models/realistic_human_heart/scene.gltf",
      img: "/imgs/heart.png",
      position: [0, -0.5, 0],
      scale: 4,
      title: "Heart Risk Prediction",
      description:
        "Predict your heart risk with our advanced tools. Understand potential heart risks with our predictive analysis. Our system evaluates your data to offer insights into your heart health. Stay ahead with preventive measures.",
    },
    {
      to: "/human",
      path: "/models/animal_cell/scene.gltf",
      img: "/imgs/animalcell.png",
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
      img: "/imgs/lung.png",
      scale: 0.03,
      position: [0, -5, 0],
      animation: false,
      title: "Pneumonia Prediction",
      description:
        "Predict pneumonia from symptoms with our tool. Our model helps in early detection and diagnosis. Get accurate results to start timely treatment. Protect your respiratory health with advanced technology.",
    },
    {
      to: "/human",
      path: "/models/diabetic/scene.gltf",
      scale: 8,
      position: [0, 0, 0],
      animation: true,
      title: "diabetic Prediction",
      description:
        "Assess your risk of diabetes with our tool. Our model evaluates key parameters to help in early detection and diagnosis. Get accurate results to start timely preventive measures. Protect your health with advanced technology.",
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
    <div className="container">
      <Grid container spacing={3}>
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
              Human Prognosis
            </h2>
          </div>
        </Grid>
        {humanitems.map((model, index) => (
          <Grid item xs={12} md={6} key={index} className="bg-transparent">
            <Card className="row shadow-none shadow bg-transparent p-0 m-0">
              <CardMedia className=" col-md-6 col-12 ">
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
                    className="poppins-bold mb-0 fs-4 text-gradient-2 text-capitalize"
                    data-aos="zoom-in"
                  >
                    {model.title}
                  </p>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    data-aos="zoom-in"
                    className=""
                  >
                    {model.description}
                  </Typography>
                </div>
                <Button
                  className="  px-2 py-1 rounded-0 bg-grad-2 w-maxcontent text-white bg-grad-1 text-decoration-none  poppins-regular text-start border-0 "
                  onClick={() => {
                    handleOpenModal(model);
                  }}
                >
                  Get Prognosis
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
            {selectedItem.title === "Brain Tumor Detection" && (
              <BrainTumorForm />
            )}
            {selectedItem.title === "diabetic Prediction" && (
              <DiabeticPrediction />
            )}
            {selectedItem.title === "Disease Prediction" && (
              <div className="contianer">
                <DiseasePred />
              </div>
            )}
            {selectedItem.title === "Heart Risk Prediction" && <HeartRisk />}
            {selectedItem.title === "Pneumonia Prediction" && <Pneumonia />}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Human;
