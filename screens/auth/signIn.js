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
import { signInWithEmailAndPassword } from "firebase/auth";

import Button from "../../shared/button";
import Input from "../../shared/input";
import Title from "../../shared/title";
import Color from "../../styles/colorStyle";
import { set } from "react-native-reanimated";

const bgImage = require("../../assets/auth.png");

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [disabled, setDisabled] = useState(false);

  const logIn = () => {
    setDisabled(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("User signed in!");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          Alert.alert("That email address is already in use!");
          setDisabled(false);
        } else if (error.code === "auth/invalid-email") {
          setDisabled(false);
          Alert.alert("That email address is invalid!");
        } else {
          setDisabled(false);
          Alert.alert("Invalid log in credentials");
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
          <Title>Login....</Title>
          <Text style={styles.txtSubTitle}>Please Sign in to countinue.</Text>
          <Input
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />

          <Input
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setpassword(text)}
          />

          <Button
            onPress={logIn}
            type={disabled === true ? "disabled" : ""}
            disabled={disabled}
          >
            Log in
          </Button>

          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Text
                onPress={() => navigation.navigate("SignUp")}
                style={styles.footerLink}
              >
                Sign up
              </Text>
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
