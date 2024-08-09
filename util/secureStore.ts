import * as SecureStore from "expo-secure-store";
import { refreshAccessTokenBackend } from "./auth";

const USER_TOKEN_KEY = "userToken";
const REFRESH_TOKEN_KEY = "refreshToken";

/* ACCESS TOKEN */

// login and refreshing the access token
export const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync(USER_TOKEN_KEY, token);
  } catch (e) {
    console.error("Failed to save the token to secure storage", e);
  }
};

// check token validity
export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(USER_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to get the token from secure storage", e);
  }
};

// logout
export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to delete the token from secure storage", e);
  }
};

// Function to refresh the access token
export const refreshToken = async () => {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token found");
    }
    const newAccessToken = await refreshAccessTokenBackend(refreshToken);
    await storeToken(newAccessToken);
  } catch (e) {
    console.error("Failed to refresh the access token", e);
    throw e;
  }
};

/* ------------------------------------------------------------------------- */

/* REFRESH TOKEN */

// Login
export const storeRefreshToken = async (refreshToken: string) => {
  try {
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
  } catch (e) {
    console.error("Failed to save the refresh token to secure storage", e);
  }
};

// refresh accessToken
export const getRefreshToken = async () => {
  try {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to get the refresh token from secure storage", e);
    return null;
  }
};

// logout
export const deleteRefreshToken = async () => {
  try {
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  } catch (e) {
    console.error("Failed to delete the refresh token from secure storage", e);
  }
};

/* ------------------------------------------------------------------------- */

/* USER DATA */

export const storeUser = async (user: string) => {
  try {
    await SecureStore.setItemAsync("USER", user);
  } catch (e) {
    console.error("Failed to save the token to secure storage", e);
  }
};

export const getUser = async () => {
  try {
    return await SecureStore.getItemAsync("USER");
  } catch (e) {
    console.error("Failed to get the token from secure storage", e);
  }
};

export const deleteUser = async () => {
  try {
    await SecureStore.deleteItemAsync("USER");
  } catch (e) {
    console.error("Failed to delete the token from secure storage", e);
  }
};

/* ------------------------------------------------------------------------- */
