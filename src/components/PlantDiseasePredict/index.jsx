import { Button, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import UploadImage from "../UploadImage";
import { endpoints, prediction } from "../../endpoints";
import { LinearProgress } from "@mui/material";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useUser } from "../../context/useUser";

const PlantDisease = ({ reset }) => {
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
      const result = await fetch(prediction + endpoints.plantDisease, {
        method: "POST",
        body: formData,
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();
      console.log(data);
      setResponse(data.predictions.replace("__", " ").replace("_", " "));
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
    formData.append("category", "Plant disease prediction");
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
              </div>
              <Typography.Link
                href={`https://en.wikipedia.org/w/index.php?fulltext=1&search=${response.replace("_", "+")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="poppins-regular"
                style={{ fontSize: "14px" }} // Adjust font size here
              >
                Learn more about{" "}
                <span className="text-capitalize text-small">
                  {response.replace("_", " ")}
                </span>
                <FaExternalLinkAlt
                  style={{ fontSize: "12px", marginLeft: "4px" }}
                />{" "}
                {/* Adjust icon size and margin */}
              </Typography.Link>
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

export default PlantDisease;
