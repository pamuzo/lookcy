import { StyleSheet, TextInput } from "react-native";
import Color from "../styles/colorStyle";

export default function Input({ outLine, ...props }) {
  return (
    <TextInput
      pleaceholderTextColor={Color.midGray}
      style={[styles.input, outLine ? styles.outLined : {}]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Color.midGray,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 6,
    marginVertical: 5,
  },
  outLined: {
    borderColor: Color.midGray,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    marginVertical: 5,
    //width: "100%",
    //marginHorizontal: 10,
  },
});
