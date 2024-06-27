import React, { useState } from "react";
import {
  SelectPicker,
  TagGroup,
  Tag,
  Alert,
  Button,
  Icon,
  Divider,
} from "rsuite";
import { symptoms } from "../../data/DiseaseData";
const formattedSymptoms = symptoms.map((symptom) => ({
  label: symptom.replace(/_/g, " ").toUpperCase(),
  value: symptom,
}));
const SymptomsForm = ({ getPrediction }) => {
  //SECTION -State varaibles
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [currentSymp, setCurrentSymp] = useState(null);

  //SECTION -helper function to change labels
  const removeSymptom = (item) => {
    const updatedSymptoms = selectedSymptoms.filter(
      (symptom) => symptom !== item
    );
    setSelectedSymptoms(updatedSymptoms);
  };
  //SECTION - Event functions
  const handlePrediction = async () => {
    await getPrediction(selectedSymptoms);
  };

  return (
    <>
      <SelectPicker
        data={formattedSymptoms}
        style={{ width: 224 }}
        value={currentSymp}
        onChange={(value) => {
          setSelectedSymptoms((prev) => {
            if (!prev.includes(value)) {
              return [value, ...prev];
            } else {
              Alert.info(`${value} already selected`, 1000);
              return prev;
            }
          });
          setCurrentSymp(null);
        }}
      />
      {
        <Button
          disabled={!selectedSymptoms.length > 0}
          onClick={handlePrediction}
        >
          <Icon icon="user-md" />
          Get prognosis
        </Button>
      }
      {selectedSymptoms.length > 0 && <Divider> Your symptoms</Divider>}
      <TagGroup>
        {selectedSymptoms.map((item, index) => (
          <Tag
            key={index}
            closable
            onClose={() => {
              removeSymptom(item);
            }}
          >
            {item.replace(/_/g, " ").toUpperCase()}
          </Tag>
        ))}
      </TagGroup>
    </>
  );
};

export default SymptomsForm;
