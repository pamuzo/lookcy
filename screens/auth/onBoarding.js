import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import Button from "../../shared/button";
import Color from "../../styles/colorStyle";

const bgImage = require("../../assets/onboarding.png");

export default function Onboarding({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.content}>
        <Image style={styles.images} source={bgImage} />
      </View>

      <View style={styles.whiteSheet}>
        <Text style={styles.txtTitle}>Best Fashion App</Text>
        <Text style={styles.txtSubTitle}>
          Keep Your Fahion Business in one place
        </Text>
        <Button onPress={() => navigation.navigate("SignIn")}>Log in</Button>
        <Button onPress={() => navigation.navigate("SignUp")} type={"orange"}>
          Get Started
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  images: {
    width: "80%",
    height: 440,
    position: "absolute",
    bottom: 170,
    resizeMode: "center",
  },
  whiteSheet: {
    width: "100%",
    height: 240,
    position: "absolute",
    bottom: 0,
    padding: 30,
    backgroundColor: Color.lightGray,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  txtTitle: {
    color: Color.black,
    textAlign: "center",
    fontSize: 22,
    fontFamily: "roboto-bold",
  },
  txtSubTitle: {
    color: Color.black,
    textAlign: "center",
    fontSize: 15,
    fontFamily: "roboto-light",
    marginVertical: 4,
  },
});
