import { Button } from "@mui/material";
import { Image } from "antd";
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpoints, userUrl } from "../../endpoints";
import { useUser } from "../../context/useUser";

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
