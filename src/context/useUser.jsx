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
      const response = await axios.post(userUrl + endpoints.signup, formData);
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
        login,
        signup,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};