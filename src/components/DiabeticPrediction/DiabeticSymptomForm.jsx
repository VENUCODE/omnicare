import React, { useRef, useState } from "react";
import { Button, Form, Input, message } from "antd";
import { Container, Typography } from "@mui/material";

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
  Pregnancies: 0,
  Glucose: 0,
  BloodPressure: 0,
  SkinThickness: 0,
  Insulin: 0,
  BodyMassIndex: 0,
  DiabetesPedigreeFunction: 0,
  Age: 0,
};

const DiabeticSymptomForm = ({ getDiabeticPredict }) => {
  const formRef = useRef(null);
  const [formValue, setFormValue] = useState(INITIAL_FORM);

  const handleFormValueChange = (changedValues, allValues) => {
    setFormValue(allValues);
  };

  const onSubmit = async (e) => {
    try {
      const values = await formRef.current.validateFields();
      if (Object.values(values)) {
        message.info("Enter valid values");
        return;
      }
      console.log(values);
      // await getDiabeticPredict(
      //   Object.values(values).map((value, index) =>
      //     index === 6 ? parseFloat(value) : parseInt(value, 10)
      //   )
      // );
    } catch (error) {
      message.error("Form is invalid");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Diabetic Symptom Form
      </Typography>
      <Form
        ref={formRef}
        onSubmit={onSubmit}
        initialValues={INITIAL_FORM}
        onValuesChange={handleFormValueChange}
      >
        {markUpdata.map((item, index) => (
          <Form.Item
            key={index}
            name={item.name}
            required
            rules={[{ required: true, message: item.tooltip }]}
            label={item.label}
            tooltip={item.tooltip}
          >
            <Input placeholder={item.placeholder} />
          </Form.Item>
        ))}
        <Form.Item>
          <Button type="primary" block>
            Get Prognosis
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
};

export default DiabeticSymptomForm;
