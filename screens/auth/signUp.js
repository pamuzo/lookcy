import {
  StyleSheet,
  Alert,
  View,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
  StatusBar,
} from "react-native";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth } from "../../config/firebase";
import { colRef, db } from "../../config/firebase";
import Input from "../../shared/input";
import Button from "../../shared/button";
import Title from "../../shared/title";
import CheckedBox from "../../shared/checkedBod";
import Color from "../../styles/colorStyle";

const bgImage = require("../../assets/auth.png");

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [disabled, setDisabled] = useState(false);

  const [agreed, setAgreed] = useState(false);

  // to check if checked box is checked
  const onChecked = () => {
    setAgreed((value) => !value);
  };

  const onCreate = () => {
    setDisabled(true);
    //to check if password match
    if (password !== confirmPassword) {
      Alert.alert("Password do not match");
      setDisabled(false);
      return;
    }
    //to make sure first and last names are not empty
    if (!firstName || !lastName) {
      Alert.alert("Please enter First Name and Last Name");
      setDisabled(false);
      return;
    }
    //to see if terms and condition was checked
    if (!agreed) {
      setDisabled(false);
      Alert.alert("You should agree to the terms and condition");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        updateProfile(auth.currentUser, {
          displayName: firstName,
        });
        return setDoc(doc(db, "user", userCredentials.user.uid), {
          fullName: `${firstName} ${lastName}`,
          email,
          createdAt: new Date(),
          bio: "I Love to Sew",
          brandName: "Look",
          phoneNumber: "",
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          setDisabled(false);
          Alert.alert("That email address is already in use!");
        } else if (error.code === "auth/invalid-email") {
          setDisabled(false);
          Alert.alert("The email address is invalid!");
        } else {
          setDisabled(false);
          Alert.alert("Invalid  credentials. Check the email");
        }
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.images} source={bgImage} />
      <StatusBar hidden={true} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 24, marginTop: 40 }}>
          <Title>Create Account</Title>
          <Text style={styles.txtSubTitle}>Sign up to Join the Hub.</Text>
          <Input
            placeholder="First Name"
            autoCapitalize="none"
            autoFocus={true}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <Input
            placeholder="Last Name"
            autoCapitalize="none"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />

          <Input
            placeholder="Enter Email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={(text) => setpassword(text)}
          />
          <Input
            placeholder="Confirm Password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />

          <View style={styles.row}>
            <CheckedBox checked={agreed} onPress={onChecked} />
            <Text style={styles.txtAgree}>
              I agree to
              <Text style={styles.txtAgreeLink}>Terms and Conditions </Text>
              and
              <Text style={styles.txtAgreeLink}> Privacy Policy</Text>
            </Text>
          </View>
          <Button
            onPress={onCreate}
            type={disabled === true ? "disabled" : ""}
            disabled={disabled}
          >
            Create new account
          </Button>
          <View style={styles.footerView}>
            <Text style={styles.footerText}>
              Already registered{" "}
              <Text
                onPress={() => navigation.navigate("SignIn")}
                style={styles.footerLink}
              >
                Log in
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
    marginTop: 40,
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
  txtSubTitle: {
    color: Color.black,
    fontSize: 15,
    fontFamily: "roboto-regular",
    marginVertical: 4,
  },

  row: {
    flexDirection: "row",
    alignSelf: "center",
    marginVertical: 10,
  },
  txtAgreeLink: {
    textDecorationLine: "underline",
  },
  txtAgree: {
    color: Color.gray,
    fontSize: 12,
    marginLeft: 8,
  },
});
