import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import InitialScreen from "./components/InitialScreen";
import AuthScreen from "./components/AuthScreen";
import { useCallback, useEffect } from "react";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    WorkSans: require("./assets/fonts/WorkSans-Medium.ttf"),
    WorkSansLight: require("./assets/fonts/WorkSans-Regular.ttf"),
    PlayWrite: require("./assets/fonts/PlaywriteHRLijeva-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="InitialScreen"
      >
        <Stack.Screen name="InitialScreen" component={InitialScreen} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
