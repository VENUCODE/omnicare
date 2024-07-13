import React, { useRef, useState } from "react";
import { Button, Form, Input, message, Typography } from "antd";
import { Container } from "@mui/material";
import { endpoints, prediction } from "../endpoints";
import CustomInput from "./CustomInput";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useUser } from "../context/useUser";

const markUpdata = [
  {
    label: "Nitrogen",
    name: "N",
    placeholder: "Nitrogen",
    tooltip: "Required (0-140)",
    type: "number",
    precision: 0, // No decimal precision needed
  },
  {
    label: "Phosphorus",
    name: "P",
    placeholder: "Phosphorus",
    tooltip: "Required (5-145)",
    type: "number",
    precision: 0, // No decimal precision needed
  },
  {
    label: "Potassium",
    name: "K",
    placeholder: "Potassium",
    tooltip: "Required (5-205)",
    type: "number",
    precision: 0, // No decimal precision needed
  },
  {
    label: "Temperature",
    name: "temperature",
    placeholder: "Temperature (°C)",
    tooltip: "Required (8.83-43.68°C)",
    type: "number",
    precision: 3, // Decimal precision needed
  },
  {
    label: "Humidity",
    name: "humidity",
    placeholder: "Humidity (%)",
    tooltip: "Required (14.26-99.98%)",
    type: "number",
    precision: 3, // Decimal precision needed
  },
  {
    label: "pH Level",
    name: "ph",
    placeholder: "pH Level",
    tooltip: "Required (3.50-9.94)",
    type: "number",
    precision: 3, // Decimal precision needed
  },
  {
    label: "Rainfall",
    name: "rainfall",
    placeholder: "Rainfall",
    tooltip: "Required (20.21-298.56 cm)",
    type: "number",
    precision: 3, // Decimal precision needed
  },
];

const INITIAL_FORM = {
  N: "",
  P: "",
  K: "",
  temperature: "",
  humidity: "",
  ph: "",
  rainfall: "",
};

const CropRec = () => {
  const formRef = useRef(null);
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const { savePrediction } = useUser();
  const getCropRecommendation = async (inputValues) => {
    setLoading(true);
    console.log(inputValues);
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
    const changedKey = Object.keys(changedValues);
    const changedValue = changedValues[changedKey];

    setFormValue((prevFormValue) => {
      const updatedFormValue = { ...prevFormValue };
      updatedFormValue[changedKey] = changedValue;
      return updatedFormValue;
    });
  };

  const onSubmit = async (e) => {
    try {
      const updatedValues = Object.values(formValue).map((i) => parseFloat(i));
      getCropRecommendation(updatedValues);
    } catch (error) {
      message.error("Form is invalid");
    }
  };

  const handleClear = () => {
    setPredictionResult(null);
    setFormValue(INITIAL_FORM);
  };

  const handleSave = async () => {
    const res = await savePrediction({
      input: formValue,
      category: "Crop recommendition",
      prediction: predictionResult,
    });
    if (res.success) {
      message.success(res.message);
    } else {
      message.error(res.message);
    }
    handleClear();
  };
  return (
    <Container>
      {predictionResult && (
        <div className="container mt-4">
          <div className="card shadow-lg">
            <div className="card-body">
              <h3 className="text-capitalize text-gradient-1 mb-3 poppins-medium">
                {predictionResult}
              </h3>
              <span className="poppins-regular fs-5 text-gradient-3">
                is recommended to grow
              </span>
              <br />
              <Typography.Link
                href={`https://en.wikipedia.org/wiki/${predictionResult}`}
                target="_blank"
                rel="noopener noreferrer"
                className="poppins-regular"
                style={{ fontSize: "14px" }}
              >
                Learn more about{" "}
                <span className="text-capitalize text-small">
                  {predictionResult}
                </span>
                <FaExternalLinkAlt
                  style={{ fontSize: "12px", marginLeft: "4px" }}
                />{" "}
              </Typography.Link>
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
                type={item.type}
                step={
                  item.precision > 0
                    ? `0.${"0".repeat(item.precision - 1)}1`
                    : "1"
                }
                placeholder={item.label}
              />
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              danger
              htmlType="submit"
              block
              disabled={loading}
              loading={loading}
            >
              Get Recommendation
            </Button>
          </Form.Item>
        </Form>
      )}
    </Container>
  );
};

export default CropRec;
