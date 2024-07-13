// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { MdEmail, MdPerson } from "react-icons/md";
import { FaChartLine } from "react-icons/fa";
import img from "../../assets/blood.jpg";
import { useUser } from "../../context/useUser";
const Profile = () => {
  const { userData } = useUser();
  const [user, setUser] = useState(userData);
  useEffect(() => {
    setUser(userData);
  }, [userData]);
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="rgrad-1 p-4 rounded-0 text-center">
            <img
              src={img}
              alt="Profile"
              className="rounded-circle mb-3 bg-glass rgrad-1 border border-3 object-fit-cover "
              style={{ width: "240px", height: "240px", objectFit: "cover" }}
            />
            <h3 className="mb-3 text-light poppins-medium">{user.username}</h3>

            <div className="d-flex  flex-column mt-2 text-light">
              <p className="text-center poppins-regular">
                <MdEmail style={{ fontSize: "20px", marginRight: "8px" }} />
                <span>{user.email}</span>
              </p>
            </div>
            <p className="p-2 rounded-5 bg-glass  rgrad-1 text-light poppins-bold">
              <FaChartLine className="me-2 text-light fs-2" />
              {user.predictionsCount}
              <span className="poppins-regular"> predicitons made</span>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
