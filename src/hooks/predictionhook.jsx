// src/hooks/usePredictions.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { endpoints, userUrl } from "../endpoints";

const fetchPredictions = async (authToken) => {
  if (!authToken) {
    throw new Error("No auth token");
  }
  const response = await axios.get(userUrl + endpoints.mypredictions, {
    headers: {
      authorization: authToken,
    },
  });
  return response.data;
};

export const usePredictions = (authToken) => {
  return useQuery(["predictions"], () => fetchPredictions(authToken), {
    enabled: !!authToken,
  });
};
