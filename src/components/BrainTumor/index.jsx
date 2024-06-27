import React, { useState } from "react";
import { Button, Alert, Icon } from "rsuite";

import axios from "axios";

const BrainTumorForm = () => {
  const acceptTypes = ["image/png", "image/jpeg", "image/pjpeg"];
  const fileInputTypes = ".png, .jpg, .jpeg";
  const [image, setImage] = useState(null);
  const validFile = (filetype) => {
    return acceptTypes.includes(filetype);
  };
  const getPrediction = () => {
    console.log("Came to predict");
    if (!image) {
      Alert.info("Select image");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    fetch("http://127.0.0.1:5000/brainTumor", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      })
      .catch(function (error) {
        console.log(error);
        Alert.error(error.message, 2000);
      });
  };
  const handleFileChange = (e) => {
    const currentFile = e.target.files;
    if (currentFile.length === 1) {
      const file = currentFile[0];
      console.log(file.type);
      if (validFile(file.type)) {
        setImage(file);
        console.log(image);
      } else {
        Alert.warning(`Wrong file type ${file.type}`, 3000);
      }
    }
  };
  return (
    <div className="flex justify-center align-items-center gap-1 py-1 px-1">
      <Button>
        <label className="tracking-wide uppercase  cursor-pointer  d-grid text-white rounded-full h-[20px] w-[20px]  ">
          <Icon icon={"camera"} className="text-gray-900" />
          <input
            type="file"
            className="hidden"
            accept={fileInputTypes}
            onChange={handleFileChange}
          />
        </label>
      </Button>
      {
        <Button
          className="bg-teal-300 h-auto"
          onClick={getPrediction}
          disabled={!image}
        >
          Get prediction
        </Button>
      }
    </div>
  );
};

export default BrainTumorForm;
