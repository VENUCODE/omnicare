// src/components/Profile.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "react-bootstrap";
import { MdEmail, MdPerson } from "react-icons/md";
import { FaChartLine, FaSignOutAlt } from "react-icons/fa";

import TimeAgo from "react-timeago";
import { useUser } from "../../context/useUser";
import { Button, Image } from "antd";
import { userUrl } from "../../endpoints";
const Profile = () => {
  const { userData, logout } = useUser();
  const [user, setUser] = useState(userData);
  useEffect(() => {
    setUser(userData);
  }, [userData]);
  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <div className="rgrad-1 p-4 rounded-0 text-center ">
            <img
              src={`${userUrl}/${user.image}`}
              alt="Profile"
              className="rounded-circle mb-3 bg-glass rgrad-1 border border-3 object-fit-cover "
              style={{ width: "240px", height: "240px", objectFit: "cover" }}
            />
            <p
              className="poppins-light text-light"
              style={{ fontSize: "0.8rem" }}
            >
              Created on:{new Date(user.createdAt).toLocaleDateString()} <br />
              <TimeAgo date={user.createdAt} />
            </p>
            <h3 className="mb-3 text-light poppins-medium">{user.username}</h3>

            <div className="d-flex  flex-column mt-2 text-light">
              <p className="text-center poppins-regular">
                <MdEmail style={{ fontSize: "20px", marginRight: "8px" }} />
                <span>{user.email}</span>
              </p>
            </div>
            <div className=" rounded-5 d-flex flex-column-reverse justify-content-between align-items-center  text-light poppins-bold">
              <Button
                danger
                type="dashed"
                onClick={() => {
                  logout();
                }}
              >
                <FaSignOutAlt /> Logout
              </Button>
              <p className=" rounded-2 bg-glass text-dark px-2 py-1">
                <FaChartLine className="me-2 text-dark fs-2" />
                {user.predictionsCount}
                <span className="poppins-regular"> predicitons made</span>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
