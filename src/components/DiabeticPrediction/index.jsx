import React from "react";
import DiabeticSymptomForm from "./DiabeticSymptomForm";
import { Alert } from "rsuite";
const DiabeticPrediction = () => {
  const getDiabeticPredict = (inputValues) => {
    fetch("http://127.0.0.1:5000/diabeticPredict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValues }),
    })
      .then(function (response) {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
        Alert.error(error.message, 2000);
      });
  };
  return (
    <div>
      <DiabeticSymptomForm getDiabeticPredict={getDiabeticPredict} />
    </div>
  );
};

export default DiabeticPrediction;
