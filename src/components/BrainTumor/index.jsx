import { Button, message } from "antd";
import React, { useState } from "react";
import UploadImage from "../UploadImage";

const BrainTumorForm = ({ reset }) => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPrediction = () => {
    console.log("Came to predict");
    if (!fileList.length === 0) {
      message.info("Select image");
      return;
    }

    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);
    console.log(formData.get("image"));
    fetch("http://127.0.0.1:5000/brainTumor", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
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
    <div className="container flex justify-center align-items-center gap-1 py-1 px-1">
      <UploadImage fileList={fileList} setFileList={setFileList} />
      <div className="d-flex justify-content-end">
        <Button
          type="text"
          danger
          loading={loading}
          onClick={getPrediction}
          disabled={fileList.length === 0}
        >
          Get Prediction
        </Button>
      </div>
    </div>
  );
};

export default BrainTumorForm;
