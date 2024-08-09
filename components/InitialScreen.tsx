import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import {
  accentColor,
  backgroundColor,
  primaryColor,
  textColor,
} from "../ui/colors";

export default function ({ navigation }) {
  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const translateInAnim = useRef(new Animated.Value(-30)).current;
  const translateRightAnim = useRef(new Animated.Value(-30)).current;
  const fadeRightAnim = useRef(new Animated.Value(0)).current;

  const [letterAnim, setLetterAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    animateElements();
    animateLetters();
  }, []);

  const animateElements = () => {
    fadeIn();
    translateIn();
    translateRight();
    fadeRight();
  };

  const animateLetters = () => {
    Animated.timing(letterAnim, {
      toValue: 1,
      duration: 500,
      delay: 1000,
      useNativeDriver: false,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 500,
      delay: 250,
      useNativeDriver: true,
    }).start();
  };

  const translateIn = () => {
    Animated.timing(translateInAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const translateRight = () => {
    Animated.timing(translateRightAnim, {
      toValue: 0,
      duration: 300,
      delay: 500,
      useNativeDriver: true,
    }).start();
  };

  const fadeRight = () => {
    Animated.timing(fadeRightAnim, {
      toValue: 1,
      duration: 300,
      delay: 500,
      useNativeDriver: true,
    }).start();
  };

  // Create animated styles for each letter
  const animatedLetterStyle = (anim) => ({
    color: anim.interpolate({
      inputRange: [0, 1],
      outputRange: [textColor, primaryColor],
    }),
  });

  return (
    <>
      <SafeAreaView style={styles.Container}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Animated.Image
            source={require("../assets/images/MessyDoodle.png")}
            style={[
              styles.Image,
              { transform: [{ translateY: translateInAnim }] },
            ]}
          />
          <Animated.Text style={[styles.Text, { opacity: fadeInAnim }]}>
            TON
            <Animated.Text style={animatedLetterStyle(letterAnim)}>
              E
            </Animated.Text>
          </Animated.Text>
        </View>

        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Animated.View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
              transform: [{ translateX: translateRightAnim }],
              opacity: fadeRightAnim,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate("AuthScreen");
              }}
            >
              <Animated.View
                style={[
                  styles.Button,
                  {
                    transform: [{ translateX: translateRightAnim }],
                    opacity: fadeRightAnim,
                  },
                ]}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/icons/arrow_right_alt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.png")}
                />
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
          <Animated.Text style={[styles.quoteText, { opacity: fadeInAnim }]}>
            Your thoughts, written in every
            <Animated.Text style={animatedLetterStyle(letterAnim)}>
              {" "}
              note
            </Animated.Text>
          </Animated.Text>
        </View>
      </SafeAreaView>

      <ExpoStatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    position: "relative",
    backgroundColor: backgroundColor,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Text: {
    color: textColor,
    fontFamily: "RaleWayBold",
    fontSize: 55,
    flexDirection: "row", // Ensures letters are aligned in a row
  },
  quoteText: {
    color: textColor,
    fontFamily: "WorkSans",
    fontSize: 15,
    marginTop: 40,
  },
  Image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  Button: {
    width: "70%",
    height: "auto",
    padding: 10,
    shadowColor: accentColor,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: primaryColor,

    borderRadius: 100,
  },
  ButtonText: {
    fontFamily: "WorkSans",
    fontSize: 20,
    color: "#fff",
  },
});
