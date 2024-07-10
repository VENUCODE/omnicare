import React from "react";
import SymptomsForm from "./SymptomsForm";
import { message } from "antd";
import { endpoints, prediction } from "../../endpoints";

const DiseasePred = () => {
  return (
    <div>
      <SymptomsForm />
    </div>
  );
};

export default DiseasePred;
