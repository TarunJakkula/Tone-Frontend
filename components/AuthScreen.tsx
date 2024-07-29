import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { signIn } from "../util/auth";
import { storeToken } from "../util/secureStore";
import {
  accentColor,
  backgroundColor,
  primaryColor,
  secondaryColor,
  textColor,
} from "../ui/colors";

export default function AuthScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<null | string>(null);

  const handleLogin = async () => {
    try {
      const token = await signIn(email, password);
      if (token === "Error") throw Error("Error");
      await storeToken(JSON.stringify(token));
      // Navigate to the home screen or handle login success
      // navigation.navigate('Home');
      setEmail("");
      setPassword("");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.backButton}
        >
          <Image
            style={styles.backIcon}
            source={require("../assets/icons/arrow_back_24dp_000000_FILL0_wght400_GRAD0_opsz24.png")}
          />
        </TouchableOpacity>
        <Image
          style={styles.headerImage}
          source={require("../assets/images/ReadingSideDoodle.png")}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.quoteText}>
          Log-<Text style={{ color: primaryColor }}>I</Text>n
        </Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              style={styles.emailInput}
              cursorColor={secondaryColor}
              value={email}
              onChangeText={setEmail}
              placeholder="Your email id"
              placeholderTextColor={textColor + "88"}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              style={styles.emailInput}
              cursorColor={secondaryColor}
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
              placeholder="Your password"
              placeholderTextColor={textColor + "88"}
            />
          </View>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogin}
          style={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: backgroundColor,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  header: {
    height: "25%",
    width: "100%",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "7%",
    alignItems: "flex-end",
    flexDirection: "row",
  },
  backButton: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  backIcon: {
    width: 30,
    height: 30,
  },
  headerImage: {
    width: 200,
    height: 150,
    objectFit: "contain",
  },
  formContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    width: "100%",
    height: "75%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: "10%",
    paddingVertical: "7%",
    gap: 60,
    shadowColor: secondaryColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  quoteText: {
    fontFamily: "PlayWrite",
    color: textColor,
    fontSize: 40,
  },
  inputContainer: {
    width: "100%",
    gap: 40,
  },
  inputWrapper: {
    width: "100%",
    gap: 0,
  },
  labelText: {
    fontFamily: "WorkSans",
    color: textColor,
    fontSize: 22,
  },
  emailInput: {
    backgroundColor: "#00000000",
    borderBottomWidth: 2,
    borderBottomColor: textColor + "bb",
    width: "100%",
    paddingHorizontal: 0,
    paddingVertical: 10,
    fontSize: 15,
    fontFamily: "WorkSans",
  },
  loginButton: {
    backgroundColor: primaryColor,
    borderRadius: 100,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    shadowColor: primaryColor,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    fontFamily: "WorkSans",
    fontSize: 20,
    color: "#fefefe",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
