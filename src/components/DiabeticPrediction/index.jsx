import React from "react";
import DiabeticSymptomForm from "./DiabeticSymptomForm";
import { Alert, AlertTitle } from "@mui/material";
import { message } from "antd";

const DiabeticPrediction = () => {
  const getDiabeticPredict = (inputValues) => {
    fetch("http://127.0.0.1:5000/diabeticPredict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValues }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message, 2);
      });
  };

  return (
    <div>
      <DiabeticSymptomForm getDiabeticPredict={getDiabeticPredict} />
    </div>
  );
};

export default DiabeticPrediction;
