import React, { useRef, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Container, Typography } from "@mui/material";
import { endpoints, prediction } from "../endpoints";

const markUpdata = [
  {
    label: "Nitrogen",
    name: "N",
    placeholder: "Nitrogen",
    tooltip: "Required (0-100)",
  },
  {
    label: "Phosphorus",
    name: "P",
    placeholder: "Phosphorus",
    tooltip: "Required (0-100)",
  },
  {
    label: "Potassium",
    name: "k",
    placeholder: "Potassium",
    tooltip: "Required (0-100)",
  },
  {
    label: "Temperature",
    name: "temperature",
    placeholder: "Temperature (°C)",
    tooltip: "Required (°C)",
  },
  {
    label: "Humidity",
    name: "humidity",
    placeholder: "Humidity (%)",
    tooltip: "Required (%)",
  },
  {
    label: "pH Level",
    name: "ph",
    placeholder: "pH Level",
    tooltip: "Required (0-14)",
  },
];

const INITIAL_FORM = {
  N: "",
  P: "",
  k: "",
  temperature: "",
  humidity: "",
  ph: "",
};

const CropRec = () => {
  const formRef = useRef(null);
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCropRecommendation = (inputValues) => {
    setLoading(true);
    fetch(prediction + endpoints.cropRecommend, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValues }),
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPredictionResult(data.prediction);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.message, 2);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFormValueChange = (changedValues, allValues) => {
    const [changedKey] = Object.keys(changedValues);
    const changedValue = changedValues[changedKey];

    setFormValue((prevFormValue) => {
      const updatedFormValue = { ...prevFormValue };
      updatedFormValue[changedKey] = changedValue;
      return updatedFormValue;
    });
  };

  const onSubmit = async (e) => {
    try {
      const updatedValues = Object.values(formValue).map((value) =>
        parseFloat(value)
      );
      getCropRecommendation(updatedValues);
    } catch (error) {
      message.error("Form is invalid");
    }
  };

  const handleClear = () => {
    setPredictionResult(null);
    setFormValue(INITIAL_FORM);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        <span className="poppins-medium text-gradient-2">
          Crop Recommendation Form
        </span>
      </Typography>
      {predictionResult && (
        <div className="container mt-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="text-capitalize text-gradient-1 mb-3 poppins-medium">
                {predictionResult}
              </h3>
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
        <Form
          ref={formRef}
          onFinish={onSubmit}
          initialValues={INITIAL_FORM}
          onValuesChange={handleFormValueChange}
        >
          {markUpdata.map((item, index) => (
            <Form.Item
              key={index}
              name={item.name}
              required
              rules={[{ required: true, message: item.tooltip }]}
              label={<span className="poppins-regular">{item.label}</span>}
              tooltip={<span className="shake">{item.tooltip}</span>}
            >
              <Input
                placeholder={item.placeholder}
                value={formValue[item.name]}
              />
            </Form.Item>
          ))}
          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Get Recommendation
            </Button>
          </Form.Item>
        </Form>
      )}
    </Container>
  );
};

export default CropRec;
