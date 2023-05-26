import {
  StyleSheet,
  View,
  Text,
  Alert,
  Dimensions,
  ScrollView,
  ImageBackground,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { auth } from "../../config/firebase";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Button from "../../shared/button";
import Input from "../../shared/input";
import Title from "../../shared/title";
import Color from "../../styles/colorStyle";

const bgImage = require("../../assets/auth.png");

export default function ForgotPassWord({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const ForgotPassWord = () => {
    setDisabled(true);
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert("Password reset email sent!");
        navigation.navigate("SignIn");
      })
      .catch((error) => {
        setDisabled(false);
        if (error.code === "auth/invalid-email") {
          Alert.alert("That email address is invalid!");
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ImageBackground style={styles.images} source={bgImage} />

      <ScrollView>
        <View style={{ padding: 24, marginTop: 100 }}>
          <Title>Forgot Password</Title>
          <Text style={styles.txtSubTitle}>
            Please enter Your email to reset your password.
          </Text>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />

          <Button
            onPress={ForgotPassWord}
            type={disabled === true ? "disabled" : ""}
            disabled={disabled}
          >
            Send Email
          </Button>
          <View
            style={{
              flexDirection: "row",
              gap: 4,
              marginTop: 30,
              justifyContent: "center",
            }}
          >
            <Text
              onPress={() => navigation.navigate("SignIn")}
              style={styles.footerLink}
            >
              Log in
            </Text>
            <Text style={styles.footerLink}>/</Text>
            <Text
              onPress={() => navigation.navigate("SignUp")}
              style={styles.footerLink}
            >
              Sign up
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerView: {
    alignItems: "center",
    marginTop: 80,
  },
  txtSubTitle: {
    color: Color.blue,
    fontSize: 15,
    fontFamily: "roboto-regular",
    marginVertical: 4,
  },

  images: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "cover",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: Color.blue,
    fontWeight: "bold",
    fontSize: 18,
  },
});
