import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import UploadImage from "../UploadImage";
import { endpoints, prediction } from "../../endpoints";
import { Skeleton } from "antd";
import { LinearProgress } from "@mui/material";
import { useUser } from "../../context/useUser";

const BrainTumorForm = ({ reset }) => {
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
      const result = await fetch(prediction + endpoints.brainTumor, {
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
  const handleClear = () => {
    setFileList([]);
    setResponse(null);
  };
  const { savePrediction } = useUser();
  const handleSave = async () => {
    const formData = new FormData();
    formData.append("image", fileList[0].originFileObj);
    formData.append("prediction", response);
    formData.append("category", "Brain Tumor detection");
    const res = await savePrediction(formData, true);
    if (res.success) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
    handleClear();
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
                <div className="d-flex flex-row justify-content-between gap-1 p-1">
                  <button
                    className="bg-danger-subtle flex-grow-1 btn poppins-medium text-danger rounded-1"
                    onClick={handleClear}
                  >
                    Clear
                  </button>
                  <button
                    className="bg-success-subtle flex-grow-1 btn poppins-medium text-success rounded-1"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </div>
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

export default BrainTumorForm;
