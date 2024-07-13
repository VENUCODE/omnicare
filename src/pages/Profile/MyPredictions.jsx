import React, { useState } from "react";
import { Button } from "@mui/material";
import { Image, Modal as AntdModal, Typography } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query"; // Adjust based on your actual import for React Query
import axios from "axios";
import { endpoints, userUrl } from "../../endpoints";
import { useUser } from "../../context/useUser";
import Modal from "../../components/Modal";

const { Title } = Typography;

const MyPredictions = () => {
  const { authToken } = useUser();
  const {
    data: predictions = [],
    isLoading,
    isError,
    refetch: refetchPredictions,
  } = useQuery({
    queryKey: ["predictions", authToken],
    queryFn: async () => {
      const response = await axios.get(`${userUrl}${endpoints.mypredictions}`, {
        headers: {
          Authorization: authToken,
        },
      });
      return response.data;
    },
    onError: (error) => {
      console.log("Error fetching predictions:", error);
    },
  });

  const [selectedPrediction, setSelectedPrediction] = useState(null);

  const handleViewPrediction = (prediction) => {
    setSelectedPrediction(prediction);
  };

  const handleCloseModal = () => {
    setSelectedPrediction(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching predictions</p>;

  return (
    <Container className="py-4">
      {predictions.map((prediction) => (
        <Row key={prediction.createdAt} className="mb-3">
          <Col xs={12}>
            <div className="text-light p-3 rounded shadow rgrad-pale d-flex align-items-center justify-content-between">
              <div className="d-flex gap-1 align-items-center">
                {prediction.image && (
                  <div className="me-3">
                    <Image
                      src={prediction.image}
                      alt="Prediction"
                      className="rounded-3"
                      style={{
                        maxWidth: "400px",
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
                <div className="poppins-light text-capitalize">
                  <h5 className="mb-2">{prediction.category}</h5>
                  <h6 className="mb-3">{prediction.result || "Safe"}</h6>
                  <small className="mb-2">15 mins ago</small>
                </div>
              </div>
              <div className="d-flex gap-1 flex-column w-25">
                <Button
                  variant="outlined"
                  style={{
                    fontSize: "clamp(0.7rem,0.8rem,0.9rem)",
                    fontFamily: "poppins",
                  }}
                  className="bg-glass rgrad-1 border-0 text-light rounded-0 p-1 px-2"
                  onClick={() => handleViewPrediction(prediction)}
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

      <Modal
        open={selectedPrediction !== null}
        onClose={handleCloseModal}
        title={selectedPrediction?.category || ""}
      >
        <div className="text-light">
          {Object.entries(selectedPrediction || {}).map(([key, value]) => {
            switch (key) {
              case "category":
                return (
                  <div key={key}>
                    <h5 className="mb-2">{value}</h5>
                  </div>
                );
              case "image":
                return (
                  <div key={key}>
                    <Image
                      src={value}
                      alt="Prediction"
                      className="rounded-3"
                      style={{
                        maxWidth: "400px",
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                );
              case "inputs":
              case "prediction":
                return (
                  <div key={key}>
                    <h6 className="mb-2">{key}</h6>
                    <p>{value}</p>
                  </div>
                );
              case "createdAt":
                return (
                  <div key={key}>
                    <small className="mb-2">{`${value} ago`}</small>
                  </div>
                );
              default:
                return null; // Handle other keys as needed
            }
          })}
        </div>
      </Modal>
    </Container>
  );
};

export default MyPredictions;
