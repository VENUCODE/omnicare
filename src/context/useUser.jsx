import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { endpoints, userUrl } from "../endpoints";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  const saveAuthToken = (token, user) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("userData", JSON.stringify(user));
    setAuthToken(token);
    setUserData(user);
    setIsAuthenticated(true);
  };

  const clearAuthToken = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setAuthToken(null);
    setUserData(null);
    setIsAuthenticated(false);
  };

  const login = async (formData) => {
    try {
      const response = await axios.post(userUrl + endpoints.login, formData);
      const { token, user } = response.data;
      saveAuthToken(token, user);
      return { success: true, message: "Login successful" };
    } catch (error) {
      console.log("Login failed:", error);
      return {
        success: false,
        message: "Login failed. Please check your credentials.",
      };
    }
  };

  const signup = async (formData) => {
    try {
      const response = await axios.post(userUrl + endpoints.signup, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      if (response) {
        return { success: true, message: "Signup successful" };
      }
    } catch (error) {
      console.log("Signup failed:", error);
      return {
        success: false,
        message: "Signup failed. Please try again later.",
      };
    }
  };

  const savePrediction = async (payload, formData = false) => {
    try {
      const headers = {
        authorization: authToken,
      };

      if (!formData) {
        headers["Content-Type"] = "application/json";
      }

      const response = await axios.post(
        `${userUrl}${endpoints.savePrediction}`,
        payload,
        { headers }
      );

      if (response.status === 201) {
        return { success: true, message: "Saved successfully" };
      } else {
        return {
          success: false,
          message: "Failed to save. Please try again later.",
        };
      }
    } catch (error) {
      console.error("Failed to save prediction", error);
      return {
        success: false,
        message: "Failed to save. Please try again later.",
      };
    }
  };
  const deletePrediction = async (predictionId) => {
    try {
      const response = await fetch(`${userUrl}${endpoints.deletePredcition}`, {
        method: "DELETE",
        headers: {
          Authorization: authToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ predictionId }),
      });

      if (response.ok) {
        return { success: true, message: "Deleted successfully" };
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete prediction");
      }
    } catch (error) {
      console.error("Failed to delete prediction", error);
      return {
        success: false,
        message: "Failed to delete. Please try again later.",
      };
    }
  };

  const logout = () => {
    clearAuthToken();
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    const storedAuthToken = localStorage.getItem("authToken");
    if (storedAuthToken) {
      setAuthToken(storedAuthToken);
      setIsAuthenticated(true);
    }
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        isAuthenticated,
        authToken,
        deletePrediction,
        savePrediction,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
