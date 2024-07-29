import axios from "axios";
import Constants from "expo-constants";

const { extra } = Constants.expoConfig;

const API_URL = extra.apiUrl;

export const signIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data.accessToken;
  } catch (error) {
    return "Error";
  }
};
