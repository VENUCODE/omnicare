import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Input,
  Button,
  message,
  Divider,
  Tag,
  Skeleton,
} from "antd";
import { symptoms } from "../../data/DiseaseData";
import { endpoints, prediction } from "../../endpoints";
import { formatDiseaseName } from "../webscrap";
import { FaExternalLinkAlt } from "react-icons/fa";
const formattedSymptoms = symptoms.map((symptom) => ({
  label: symptom.replace(/_/g, " ").toUpperCase(),
  value: symptom,
}));

const getRandomPaleColor = () => {
  const colors = [
    "#f8f0e3",
    "#f0f8e3",
    "#e3f8f0",
    "#e3e8f8",
    "#f8e3f0",
    "#f5f5dc",
    "#faf0e6",
    "#ffe4e1",
    "#f0e68c",
    "#e6e6fa",
    "#fafad2",
    "#e0ffff",
    "#f0fff0",
    "#f0ffff",
    "#fff0f5",
    "#faebd7",
    "#f5f5f5",
    "#fffacd",
    "#f8f8ff",
    "#e0f7fa",
    "#fff8dc",
    "#fff5ee",
    "#f0f8ff",
    "#e8e8e8",
    "#f7f7f7",
    "#f9f9f9",
    "#fffafa",
    "#f5fffa",
    "#ffebcd",
    "#fefefe",
    "#f0f0f0",
    "#f5fafd",
    "#f2f3f4",
    "#fcf6f5",
    "#e6f2f2",
    "#f3f3f3",
    "#fafafa",
    "#f9f9f9",
    "#fbfbfb",
    "#fcfcfc",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
};

const SymptomsForm = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [currentSymp, setCurrentSymp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const removeSymptom = (symp) => {
    setSelectedSymptoms((prevSymptoms) =>
      prevSymptoms.filter((value) => value.value !== symp)
    );
  };

  const getPrediction = async () => {
    try {
      setLoading(true);
      console.log(selectedSymptoms.map((symptom) => symptom.value));
      const response = await fetch(prediction + endpoints.diseasePredH, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: selectedSymptoms.map((symptom) => symptom.value),
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      setPredictionResult(data.prediction);
    } catch (error) {
      console.error("Error getting prediction:", error);
      message.error(error.message, 1);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPredictionResult(null);
    setSelectedSymptoms([]);
  };

  return (
    <div className="bg-white p-3">
      {predictionResult && (
        <div className="container mt-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <span className="poppins-regular">You seem to have</span>
              <h1 className="text-capitalize mb-3 poppins-medium">
                {predictionResult?.replace("_", " ")}
              </h1>
              <a
                href={`https://en.wikipedia.org/wiki/${formatDiseaseName(predictionResult)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-link poppins-regular "
              >
                Learn more on about{" "}
                <span className="text-capitalize  text-small">
                  {predictionResult}
                </span>
                <FaExternalLinkAlt />
              </a>
            </div>
            <div className="d-flex flex-row justify-content-between gap-1 p-1">
              <button
                className="bg-danger-subtle flex-grow-1 btn poppins-medium text-danger rounded-1"
                onClick={handleClear}
              >
                Clear
              </button>
              <button
                className="bg-success-subtle flex-grow-1 btn poppins-medium text-success rounded-1"
                onClick={handleClear}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      {!predictionResult && (
        <div className="d-flex">
          <AutoComplete
            options={formattedSymptoms}
            value={currentSymp}
            size="large"
            onSelect={(value, option) => {
              if (
                !selectedSymptoms.some(
                  (symptom) => symptom.value === option.value
                )
              ) {
                setSelectedSymptoms((prev) => [option, ...prev]);
              } else {
                message.info(`${option.label} already selected`, 1);
              }
              setCurrentSymp(null);
            }}
            onChange={(value) => setCurrentSymp(value)}
            style={{ flex: 1 }}
          >
            <Input
              placeholder="Select Symptom"
              className="rounded-0"
              onPressEnter={() => setCurrentSymp(null)}
            />
          </AutoComplete>
          <Button
            type="primary"
            className="rounded-0"
            onClick={getPrediction}
            loading={loading}
            disabled={!selectedSymptoms.length || loading}
          >
            Get Prognosis
          </Button>
        </div>
      )}
      {loading && <Skeleton.Input active={true} block />}
      {!predictionResult && (
        <Divider className="my-3" orientation="left" orientationMargin={0}>
          {selectedSymptoms.length > 0 ? (
            <span className="poppins-medium text-gradient-1">
              Your selected Symptoms
            </span>
          ) : (
            <span className="poppins-medium text-gradient-3">
              Select symptoms
            </span>
          )}
        </Divider>
      )}
      {!predictionResult && selectedSymptoms.length > 0 && (
        <div className="d-flex flex-wrap">
          {selectedSymptoms.map((item, index) => (
            <Tag
              closable
              key={index}
              size="large"
              onClose={() => removeSymptom(item.value)}
              style={{ backgroundColor: getRandomPaleColor() }}
              className="m-1 poppins-medium text-capitalize"
            >
              {item.label}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
};

export default SymptomsForm;
