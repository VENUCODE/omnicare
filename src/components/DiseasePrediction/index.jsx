import React from "react";
import SymptomsForm from "./SymptomsForm";
import { message } from "antd";
import { endpoints, prediction } from "../../endpoints";

const DiseasePred = () => {
  const getPrediction = (symptoms) => {
    fetch(prediction + endpoints.diseasePredH, {
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
        message.error(error.message, 2000);
      });
  };
  return (
    <div>
      <SymptomsForm />
    </div>
  );
};

export default DiseasePred;
