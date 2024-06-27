import React from "react";
import SymptomsForm from "./SymptomsForm";
import { Alert } from "rsuite";

const DiseasePred = () => {
  const getPrediction = (symptoms) => {
    fetch("http://127.0.0.1:5000/diseasePredict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", 
      },
      body: JSON.stringify({ symptoms }),
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
      <SymptomsForm getPrediction={getPrediction} />
    </div>
  );
};

export default DiseasePred;
