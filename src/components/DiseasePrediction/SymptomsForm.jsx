import React, { useState } from "react";
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
const SymptomsForm = ({ getPrediction }) => {
  // State variables
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [currentSymp, setCurrentSymp] = useState(null);
  const [loading, setLoading] = useState(false);

  const removeSymptom = (symp) => {
    setSelectedSymptoms((prevSymptoms) =>
      prevSymptoms.filter((value, i) => value.value !== symp)
    );
  };

  // const handlePrediction = async () => {
  //   try {
  //     setLoading(true);
  //     setTimeout(() => {}, 1000);
  //     // await getPrediction(selectedSymptoms.map((symptom) => symptom.value));
  //   } catch (err) {
  //     console.log("error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handlePrediction = async () => {
    try {
      setLoading(true);

      // Simulate a delay with a Promise
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Perform the prediction (uncomment in actual use)
      // await getPrediction(selectedSymptoms.map((symptom) => symptom.value));
    } catch (err) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-3">
      <div className="d-flex">
        <AutoComplete
          options={formattedSymptoms}
          value={currentSymp}
          size="large"
          onSelect={(value, option) => {
            console.log({ value, option });
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
            className="rounded-0 "
            onPressEnter={() => setCurrentSymp(null)}
          />
        </AutoComplete>
        <Button
          type="primary"
          className="rounded-0"
          onClick={handlePrediction}
          loading={loading}
          disabled={!selectedSymptoms.length || loading}
        >
          Get prognosis
        </Button>
      </div>
      {loading && <Skeleton.Input active={true} block />}
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
      {selectedSymptoms.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
};

export default SymptomsForm;
