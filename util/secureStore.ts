import * as SecureStore from "expo-secure-store";

// Function to save the token securely
export const storeToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync("userToken", token);
  } catch (e) {
    console.error("Failed to save the token to secure storage", e);
  }
};

// Function to get the token securely
export const getToken = async () => {
  try {
    return await SecureStore.getItemAsync("userToken");
  } catch (e) {
    console.error("Failed to get the token from secure storage", e);
  }
};

// Function to delete the token securely
export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync("userToken");
  } catch (e) {
    console.error("Failed to delete the token from secure storage", e);
  }
};
