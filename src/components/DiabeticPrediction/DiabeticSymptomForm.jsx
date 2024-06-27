import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
  Schema,
  Alert,
} from "rsuite";
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
  const { NumberType } = Schema.Types;
  const formSchema = {
    Pregnancies: NumberType().isRequired("Pregnancies should be a number"),
    Glucose: NumberType().isRequired("Glucose should be a number"),
    BloodPressure: NumberType().isRequired("Blood Pressure should be a number"),
    SkinThickness: NumberType().isRequired("Skin Thickness should be a number"),
    Insulin: NumberType()
      .isRequired("Insulin should be a number")
      .range(0, 880, "Insulin should be between 0 and 880"),
    BodyMassIndex: NumberType().isRequired(
      "Body Mass Index should be a number"
    ),
    DiabetesPedigreeFunction: NumberType()
      .isRequired("Diabetes Pedigree Function should be a number")
      .range(0, 3, "Diabetes Pedigree Function should be between 0 and 3"),
    Age: NumberType()
      .isRequired("Age should be a number")
      .range(0, 200, "Age should be between 0 and 200"),
  };
  const userModel = Schema.Model(formSchema);
  const formRef = useRef();
  const onSubmit = async (schemaCheck, event) => {
    if (!formRef.current.check()) {
      return Alert.info("Form is invalid", 2000);
    } else {
      await getDiabeticPredict(
        Object.values(formValue).map((value, index) =>
          index === 6 ? parseFloat(value) : parseInt(value, 10)
        )
      );
    }
  };
  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const handleFormValueChagne = (value) => {
    setFormValue({
      ...formValue,
      ...value,
    });
  };

  return (
    <div className="p-4">
      <Form model={userModel} ref={formRef} onChange={handleFormValueChagne}>
        {markUpdata.map((item, index) => (
          <FormGroup key={index}>
            <ControlLabel>{item.label}</ControlLabel>
            <FormControl name={item.name} placeholder={item.placeholder} />
            <HelpBlock tooltip>{item.tooltip}</HelpBlock>
          </FormGroup>
        ))}
        <FormGroup>
          <Button
            appearance="default"
            type="submit"
            onClick={onSubmit}
            color="red"
            placeholder="Get Prognosis"
          >
            Get Prognosis
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default DiabeticSymptomForm;
