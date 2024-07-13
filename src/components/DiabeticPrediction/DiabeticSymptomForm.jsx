import React, { useRef, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Container, Typography } from "@mui/material";
import { endpoints, prediction } from "../../endpoints";
import { useUser } from "../../context/useUser";

const markUpdata = [
  {
    label: "Pregnancies",
    name: "Pregnancies",
    placeholder: "Pregnancies",
    tooltip: "0 or more",
  },
  {
    label: "Glucose",
    name: "Glucose",
    placeholder: "Glucose 0-199",
    tooltip: "Required (milligrams per deciliter (mg/dL))",
  },
  {
    label: "Blood Pressure",
    name: "BloodPressure",
    placeholder: "Blood Pressure(80/120)",
    tooltip: "Required (millimeters of mercury (mm Hg))",
  },
  {
    label: "Skin Thickness",
    name: "SkinThickness",
    placeholder: "Skin Thickness (0-99)",
    tooltip: "Required (in millimeters (mm))",
  },
  {
    label: "Insulin",
    name: "Insulin",
    placeholder: "Insulin (0-850)",
    tooltip:
      "Required (micro International Units per milliliter (µIU/mL) (0-880))",
  },
  {
    label: "Body Mass Index",
    name: "BodyMassIndex",
    placeholder: "Body Mass Index (mass/height)",
    tooltip: "Required (Kg/m²)",
  },
  {
    label: "Age",
    name: "Age",
    placeholder: "Age",
    tooltip: "Required (in years)",
  },
  {
    label: "Diabetes Pedigree Function",
    name: "DiabetesPedigreeFunction",
    placeholder: "Diabetes Pedigree Function(0.0 to 3.0)",
    tooltip: "Required (0-3)",
  },
];

const INITIAL_FORM = {
  Pregnancies: "",
  Glucose: "",
  BloodPressure: "",
  SkinThickness: "",
  Insulin: "",
  BodyMassIndex: "",
  DiabetesPedigreeFunction: "",
  Age: "",
};

const DiabeticSymptomForm = () => {
  const formRef = useRef(null);
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [predictionResult, setPredictionResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const getDiabeticPredict = (inputValues) => {
    setLoading(true);
    fetch(prediction + endpoints.diabeticPredict, {
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
      const updatedValues = Object.entries(formValue).map(
        ([key, value], index) => {
          if (key === "DiabetesPedigreeFunction") {
            return parseFloat(value);
          } else {
            return parseInt(value, 10);
          }
        }
      );
      getDiabeticPredict(updatedValues);
    } catch (error) {
      message.error("Form is invalid");
    }
  };
  const handleClear = () => {
    setPredictionResult(null);
    setFormValue(INITIAL_FORM);
  };

  const { savePrediction } = useUser();
  const handleSave = async () => {
    const res = await savePrediction({
      input: { ...formValue },
      category: "Diabetic Risk prediction",
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
                placeholder={item.placeholder}
                value={formValue[item.name]}
              />
            </Form.Item>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              danger
              htmlType="submit"
              block
              loading={loading}
            >
              Get Prognosis
            </Button>
          </Form.Item>
        </Form>
      )}
    </Container>
  );
};

export default DiabeticSymptomForm;
