import { Button } from "@mui/material";
import { Image } from "antd";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const MyPredictions = () => {
  // Sample predictions data (replace with actual data)
  const predictions = [
    {
      id: 1,
      category: "Health",
      date: "2024-07-12",
      image: "https://picsum.photos/200/300?random=4",
      prediction: "Heart Risk prediction",
      inputs: [
        { name: "Age", value: "45" },
        { name: "Blood Pressure", value: "120/80" },
        // Add more inputs as needed
      ],
    },
    {
      id: 2,
      category: "Finance",
      date: "2024-07-11",
      image: "https://picsum.photos/200/300?random=5",
      prediction: "Negative",
      inputs: [
        { name: "Investment Amount", value: "$10,000" },
        { name: "Stocks", value: "Apple, Google" },
        // Add more inputs as needed
      ],
    },
    // Add more prediction objects as needed
  ];

  return (
    <Container className="py-4">
      {predictions.map((prediction) => (
        <Row key={prediction.id} className="mb-3">
          <Col xs={12}>
            <div className=" text-light p-3 rounded shadow rgrad-pale d-flex align-items-center justify-content-between">
              <div className="d-flex gap-1 align-items-center">
                {prediction.image && (
                  <div className="me-3">
                    <Image
                      src={prediction.image}
                      alt="Prediction"
                      className="rounded-3"
                      style={{
                        MaxWidth: "400px",
                        width: "200px",
                        minWidth: "150px",
                        height: "150px",
                        maxHeight: "300px",
                        minHeight: "150px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                )}
                <div className="poppins-light text-capitalize ">
                  <h5 className="mb-2"> {prediction.category}</h5>
                  <h6 className="mb-3">{prediction.result || "Safe"}</h6>
                  <small className="mb-2">15 mins ago </small>
                </div>
              </div>
              <div className="d-flex gap-1 flex-column w-25">
                <Button
                  variant="outlined"
                  style={{
                    fontSize: "clamp(0.7rem,0.8rem,0.9rem)",
                    fontFamily: "poppins",
                  }}
                  className="bg-glass rgrad-1 border-0 text-light rounded-0  p-1 px-2  "
                >
                  View
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    fontSize: "clamp(0.7rem,0.8rem,0.9rem)",
                    fontFamily: "poppins",
                  }}
                  className="bg-glass rgrad-22 border-0 text-light rounded-0 p-1 px-2"
                >
                  Delete
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default MyPredictions;
