import "react-native-gesture-handler";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";

//expo
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

//screens
import InitialScreen from "./components/InitialScreen";
import HomeScreen from "./components/HomeScreen";
import AuthScreen from "./components/AuthScreen";
import { printSecureScore } from "./util/viewSecureSore";
import { getToken } from "./util/secureStore";
import { backgroundColor } from "./ui/colors";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

const MyDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: backgroundColor, // Set your dark mode background color here
  },
};

export default function App() {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      try {
        setAccessToken(await getToken());
      } catch (error) {
        console.error("Error loading token:", error);
      }
    };
    loadToken();
  }, []);

  /* loading the fonts */
  const [fontsLoaded] = useFonts({
    WorkSansBold: require("./assets/fonts/WorkSans-Bold.ttf"),
    WorkSans: require("./assets/fonts/WorkSans-Medium.ttf"),
    WorkSansLight: require("./assets/fonts/WorkSans-Regular.ttf"),
    RaleWay: require("./assets/fonts/Raleway-Medium.ttf"),
    RaleWayBold: require("./assets/fonts/Raleway-SemiBold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
      // await printSecureScore("on load");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer theme={MyDarkTheme} onReady={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor },
        }}
        initialRouteName={accessToken ? "HomeScreen" : "InitialScreen"}
      >
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
