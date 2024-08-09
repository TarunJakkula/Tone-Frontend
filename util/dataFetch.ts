import axios from "axios";
import Constants from "expo-constants";

const { extra } = Constants.expoConfig;

const API_URL = extra.apiUrl;

export const fetchData = async (token: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/home/notes`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Example of another header you might include
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
