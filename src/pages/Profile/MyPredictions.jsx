import React, { useEffect, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import { Divider, Image, message, Typography } from "antd";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query"; // Adjust based on your actual import for React Query
import axios from "axios";
import { endpoints, userUrl } from "../../endpoints";
import { useUser } from "../../context/useUser";
import Modal from "../../components/Modal";
import TimeAgo from "react-timeago";

const { Title } = Typography;

const MyPredictions = () => {
  const { authToken } = useUser();
  const { deletePrediction } = useUser();
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [delLoad, setDelLoad] = useState(false);
  const handleViewPrediction = (prediction) => {
    setSelectedPrediction(prediction);
  };

  const handleCloseModal = () => {
    setSelectedPrediction(null);
  };
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
      console.log(response.data);
      return response.data;
    },
    onError: (error) => {
      console.log("Error fetching predictions:", error);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching predictions</p>;
  const handleDelte = async (predictionId) => {
    setDelLoad(true);
    const res = await deletePrediction(predictionId);
    if (res.success) {
      refetchPredictions();
      message.success(res.message);
    } else {
      message.error(res.message);
    }
    setDelLoad(false);
  };
  return (
    <Container className="py-4">
      {predictions.length === 0 && (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <img
            src="https://cdn3d.iconscout.com/3d/premium/thumb/girl-dont-know-gesture-6746892-5580514.png"
            alt="no predictions yet"
          />
          <h1 className="text-light position-absolute bg-glass overflow-hidden px-3 py-2 align-items-center rounded-5">
            No predictions yet
          </h1>
        </div>
      )}
      {predictions.map((prediction) => (
        <Row key={prediction.createdAt} className="mb-3">
          <Col xs={12}>
            <div className="text-light p-3 rounded shadow rgrad-pale d-flex align-items-center justify-content-between">
              <div className="d-flex gap-1 align-items-center">
                {prediction.image && (
                  <div className="me-3">
                    <Image
                      src={`${userUrl}/${prediction.image}`}
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
                  <h6 className="mb-3">{prediction.prediction}</h6>
                  <small className="mb-2">
                    <TimeAgo date={prediction.createdAt} />
                  </small>
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
                  onClick={() => {
                    handleDelte(prediction._id);
                  }}
                  className="bg-glass rgrad-22 border-0 text-light rounded-0 p-1 px-2"
                >
                  {delLoad ? <CircularProgress /> : "Delete"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      ))}
      <Modal
        open={selectedPrediction !== null}
        onClose={handleCloseModal}
        title={"🏆" + selectedPrediction?.category || ""}
      >
        <div className="text-light">
          {Object.entries(selectedPrediction || {}).map(([key, value]) => {
            switch (key) {
              case "image":
                return (
                  <div key={key}>
                    <Divider
                      orientation="left"
                      orientationMargin={0}
                      className=" poppins-medium"
                    >
                      Input image
                    </Divider>
                    <Image
                      src={userUrl + "/" + value}
                      alt="Prediction"
                      className="text-dark rounded-3"
                      style={{
                        maxWidth: "200px",
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                );
              case "input":
                return (
                  <div key={key}>
                    <Divider
                      orientation="left"
                      orientationMargin={0}
                      className=" poppins-medium"
                    >
                      🧐 Input parameters
                    </Divider>{" "}
                    {typeof value === "object" && !Array.isArray(value) ? (
                      <ul>
                        {Object.entries(value).map(([subKey, subValue]) => (
                          <li key={subKey} className="text-dark">
                            <strong className="poppins-medium text-capitalize">
                              {subKey}:
                            </strong>{" "}
                            {Array.isArray(subValue) ? (
                              <ul>
                                {subValue.map((item, index) => (
                                  <li
                                    className="poppins-medium text-capitalize"
                                    key={index}
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span>{subValue}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{value}</p>
                    )}
                  </div>
                );
              case "prediction":
                return (
                  <div key={key}>
                    <Divider
                      orientation="left"
                      orientationMargin={0}
                      className=" poppins-medium"
                    >
                      ✨ Prediction result
                    </Divider>
                    <h4 className="text-capitalize text-center  poppins-bold text-gradient-2 ">
                      {value}
                    </h4>
                  </div>
                );
              case "createdAt":
                return (
                  <div key={key} className="text-dark poppins-light">
                    <Divider
                      orientation="left"
                      orientationMargin={0}
                      className=" poppins-medium"
                    >
                      ⌚ Time
                    </Divider>
                    <small className="text-dark mb-2">
                      <TimeAgo date={value} />
                    </small>
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
