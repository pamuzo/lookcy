import { StyleSheet, Text } from "react-native";
import Color from "../styles/colorStyle";

export default function Title({ children, type }) {
  return (
    <Text style={[styles.title, type === "thin" ? styles.thin : {}]}>
      {children}
    </Text>
  );
}
const styles = StyleSheet.create({
  title: {
    color: Color.black,
    fontSize: 28,
    fontWeight: "bold",
    // marginVertical: 40,
  },
  thin: {
    color: Color.gray,
    fontFamily: "roboto-light",
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 30,
  },
});
