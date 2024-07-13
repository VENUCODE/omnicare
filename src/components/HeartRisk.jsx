import React, { useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { Button, message } from "antd";
import { endpoints, prediction } from "../endpoints";
import { useUser } from "../context/useUser";

const HeartRisk = () => {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    chestPainType: "",
    restingBloodPressure: "",
    cholesterol: "",
    fastingBloodSugar: "",
    restingECG: "",
    maxHeartRateAchieved: "",
    exerciseInducedAngina: "",
    oldpeak: "",
    slope: "",
    numberOfMajorVessels: "",
    thalassemia: "",
  });

  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const input_data = [
        [
          parseInt(formData.age),
          parseInt(formData.sex),
          parseInt(formData.chestPainType),
          parseInt(formData.restingBloodPressure),
          parseInt(formData.cholesterol),
          parseInt(formData.fastingBloodSugar),
          parseInt(formData.restingECG),
          parseInt(formData.maxHeartRateAchieved),
          parseInt(formData.exerciseInducedAngina),
          parseFloat(formData.oldpeak),
          parseInt(formData.slope),
          parseInt(formData.numberOfMajorVessels),
          parseInt(formData.thalassemia),
        ],
      ];
      const response = await axios.get(prediction + endpoints.heartPredict, {
        params: { input_data: JSON.stringify(input_data) },
      });
      setPredictionResult(response.data.prediction);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      age: "",
      sex: "",
      chestPainType: "",
      restingBloodPressure: "",
      cholesterol: "",
      fastingBloodSugar: "",
      restingECG: "",
      maxHeartRateAchieved: "",
      exerciseInducedAngina: "",
      oldpeak: "",
      slope: "",
      numberOfMajorVessels: "",
      thalassemia: "",
    });
    setPredictionResult(null);
  };
  const { savePrediction } = useUser();
  const handleSave = async () => {
    const res = await savePrediction({
      input: { ...formData },
      category: "Heart Risk prediciton",
      prediction: predictionResult,
    });
    if (res.success) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
    setPredictionResult(null);
    handleClear();
  };

  return (
    <Container className="mt-4">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {!predictionResult &&
            [
              {
                label: "Age",
                name: "age",
                tooltip: "Age in years ",
              },
              { label: "Gender", name: "sex", tooltip: "0: Female, 1: Male" },
              {
                label: "Chest Pain Type",
                name: "chestPainType",
                tooltip:
                  "0-3 (0: Typical angina, 1: Atypical angina, 2: Non-anginal pain, 3: Asymptomatic)",
              },
              {
                label: "Resting Blood Pressure",
                name: "restingBloodPressure",
                tooltip: "Resting blood pressure in mm Hg (e.g., 94-200)",
              },
              {
                label: "Cholesterol",
                name: "cholesterol",
                tooltip: "Serum cholesterol in mg/dl (e.g., 126-564)",
              },
              {
                label: "Fasting Blood Sugar",
                name: "fastingBloodSugar",
                tooltip: "1 if fasting blood sugar > 120 mg/dl, 0 otherwise",
              },
              {
                label: "Resting ECG",
                name: "restingECG",
                tooltip:
                  "0-2 (0: Normal, 1: ST-T wave abnormality, 2: Showing left ventricular hypertrophy)",
              },
              {
                label: "Max Heart Rate Achieved",
                name: "maxHeartRateAchieved",
                tooltip: "Maximum heart rate achieved (e.g., 71-202)",
              },
              {
                label: "Exercise Induced Angina",
                name: "exerciseInducedAngina",
                tooltip: "1: Yes, 0: No",
              },
              {
                label: "Oldpeak",
                name: "oldpeak",
                tooltip:
                  "ST depression induced by exercise relative to rest (e.g., 0.0-6.2)",
              },
              {
                label: "Slope",
                name: "slope",
                tooltip: "0-2 (0: Upsloping, 1: Flat, 2: Downsloping)",
              },
              {
                label: "Number of Major Vessels",
                name: "numberOfMajorVessels",
                tooltip: "Number of major vessels colored by fluoroscopy (0-3)",
              },
              {
                label: "Thalassemia",
                name: "thalassemia",
                tooltip:
                  "1-3 (1: Normal, 2: Fixed defect, 3: Reversible defect)",
              },
            ].map((field) => (
              <Grid item xs={12} key={field.name}>
                <Tooltip title={field.tooltip} arrow>
                  <TextField
                    fullWidth
                    required
                    size="small"
                    label={field.label}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </Tooltip>
              </Grid>
            ))}
          {loading && (
            <Grid item xs={12}>
              <LinearProgress color="primary" />
            </Grid>
          )}
          {!predictionResult && (
            <Grid item xs={12}>
              <Button type="dashed" htmlType="submit" danger block>
                Get prediction
              </Button>
            </Grid>
          )}
          {predictionResult && (
            <Grid item xs={12}>
              <Container>
                <h3 className="poppins-bold text-gradient-2 mb-4">
                  Our Prediction
                </h3>
                <div className="contianer rounded-2 shadow p-2 d-flex justify-content-center align-items-center my-2">
                  <h5 className="poppins-mediu ">
                    {predictionResult === 1 ? (
                      <span className="text-gradient-3">
                        You are vulnerable to Heart risk
                      </span>
                    ) : (
                      <span className="text-gradient-1">
                        You health is safe
                      </span>
                    )}
                  </h5>
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
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </Container>
            </Grid>
          )}
        </Grid>
      </form>
    </Container>
  );
};

export default HeartRisk;
