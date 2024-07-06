import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import UploadImage from "../UploadImage";
import { endpoints, prediction } from "../../endpoints";
import { LinearProgress } from "@mui/material";

const Pneumonia = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const getPrediction = async () => {
    console.log("Came to predict");

    if (!fileList.length) {
      message.info("Select image");
      return;
    }

    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);
    setLoading(true);

    try {
      const result = await fetch(prediction + endpoints.Pneumonia, {
        method: "POST",
        body: formData,
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();
      console.log(data);
      setResponse(data.predictions);
    } catch (error) {
      console.error(error);
      message.error(error.message, 2);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setResponse(null);
  }, [fileList]);
  return (
    <>
      {loading && <LinearProgress color="success" />}
      <div className="container flex justify-center align-items-center gap-1 py-1 px-1">
        {response ? (
          <div className="container mt-4">
            <div className="card shadow-lg">
              <div className="card-body">
                <h1 className="text-capitalize mb-3 poppins-medium">
                  {response?.replace("_", " ")}
                </h1>
              </div>
              <button
                className="bg-danger btn poppins-medium text-white rounded-0"
                onClick={() => {
                  setResponse(null);
                  setFileList([]);
                }}
              >
                Clear Response
              </button>
            </div>
          </div>
        ) : (
          <div className="d-flex  flex-column justify-content-start">
            <div className="p-1">
              <UploadImage fileList={fileList} setFileList={setFileList} />
            </div>
            <div className="p-1">
              <Button
                type="dashed"
                className="poppins-regular"
                block
                danger
                loading={loading}
                onClick={getPrediction}
                disabled={fileList.length === 0}
              >
                Get Prediction
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Pneumonia;
