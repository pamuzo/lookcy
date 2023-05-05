import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Color from "../styles/colorStyle";
import { useState } from "react";

export default function Button({ onPress, children, type, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        type === "orange" ? styles.orangeBG : {},
        type === "display" ? styles.display : {},
        type === "disabled" ? styles.disabled : {},
      ]}
      disabled={disabled}
    >
      <Text style={styles.btnText}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    backgroundColor: Color.blue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: 13,
  },
  btnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orangeBG: {
    backgroundColor: Color.orange,
  },
  disabled: {
    opacity: 0.5,
  },
  display: {
    display: "none",
  },
});
