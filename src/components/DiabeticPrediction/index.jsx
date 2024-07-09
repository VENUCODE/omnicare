import React, { useState } from "react";
import DiabeticSymptomForm from "./DiabeticSymptomForm";
import { message } from "antd";
import { endpoints, prediction } from "../../endpoints";

const DiabeticPrediction = () => {
  return (
    <div>
      <DiabeticSymptomForm />
    </div>
  );
};

export default DiabeticPrediction;
