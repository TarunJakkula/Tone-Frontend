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
    return {
      ...response.data,
    };
  } catch (error) {
    return "Error";
  }
};

export const refreshAccessTokenBackend = async (refreshToken: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/token`, {
      token: refreshToken,
    });
    if (response.status === 200) return response.data.accessToken;
    throw new Error(response.data);
  } catch (error) {
    console.error("Error connecting to server");
  }
};

export const logoutHandler = async (refreshToken: string) => {
  try {
    await axios.post(`${API_URL}/auth/logout`, {
      token: refreshToken,
    });
  } catch (error) {
    console.error("Error connecting to server:", error);
  }
};
