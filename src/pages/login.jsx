import React, { useState } from "react";
import {
  Button,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Typography,
} from "antd";
import { useUser } from "../context/useUser";
import { Container, Box } from "@mui/material";
import { TinyColor } from "@ctrl/tinycolor";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, signup } = useUser();

  const handleSubmit = async (values) => {
    setLoading(true);
    setError("");
    try {
      const response = isLogin ? await login(values) : await signup(values);
      setLoading(false);
      if (!response.success) {
        setError(response.message);
        message.error(response.message, 1);
      } else {
        if (!isLogin) {
          setIsLogin(true);
        }
        message.success(response.message, 3);
        console.log(response.message);
      }
    } catch (error) {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const colors3 = ["#40e495", "#30dd8a", "#2bb673"];
  const getHoverColors = (colors) =>
    colors.map((color) => new TinyColor(color).lighten(5).toString());
  const getActiveColors = (colors) =>
    colors.map((color) => new TinyColor(color).darken(5).toString());

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="bg-white bg-glass py-3 mt-4 mainContent-body"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          <span className="poppins-medium text-capitalize">
            {isLogin ? "Sign in" : "Sign up"}
          </span>
        </Typography>
        {error && (
          <Typography color="error" className="poppins-light">
            {error}
          </Typography>
        )}
        <Form
          name="authForm"
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
          onFinishFailed={handleFinishFailed}
          style={{ width: "100%", marginTop: 16 }}
        >
          {!isLogin && (
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                size="large"
                placeholder="Username"
                className="poppins-light"
              />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input
              size="large"
              type="email"
              placeholder="Email Address"
              className=""
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              size="large"
              placeholder="Password"
              className="poppins-light"
            />
          </Form.Item>

          {!isLogin && (
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please confirm your password!" },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm Password"
                className="poppins-light"
              />
            </Form.Item>
          )}

          <Form.Item>
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(116deg,  ${colors3.join(", ")})`,
                    colorPrimaryHover: `linear-gradient(116deg, ${getHoverColors(colors3).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(116deg, ${getActiveColors(colors3).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                block
                loading={loading}
                className="rounded-0 mt-2 poppins-medium"
              >
                {isLogin ? "Login" : "Sign up"}
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
        <Divider
          orientationMargin={0}
          orientation="center"
          className="text-muted mt-0"
        >
          or
        </Divider>
        <Button className="poppins-light w-100 text-end" onClick={toggleMode}>
          {isLogin ? "Create account" : "Already have an account? Sign in"}
        </Button>
      </Box>
    </Container>
  );
}
