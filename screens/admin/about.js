import React from "react";
import { Text, StyleSheet, View } from "react-native";
import BackBtn from "../../shared/backBtn";
import { FontAwesome5 } from "@expo/vector-icons";
import Color from "../../styles/colorStyle";
import { Entypo } from "@expo/vector-icons";

export default function About() {
  const year = new Date().getFullYear();
  return (
    <View style={styles.container}>
      <BackBtn title={"About"} />
      <View style={styles.about}>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            Application version
          </Text>
          <Text style={styles.profileTxt}>Look 1.0.0</Text>
        </View>

        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            Web Site
          </Text>
          <Text style={styles.profileTxt}>www.lawancy.com</Text>
        </View>

        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            Legal information
          </Text>
          <Text style={styles.profileTxt}>
            Copyright {year} MD Lawancy Tech. All rights reserved
          </Text>
        </View>

        <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
          Follow us on
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <FontAwesome5 name="facebook" size={32} color={Color.blue} />
          <Entypo name="instagram-with-circle" size={32} color={Color.blue} />
          <Entypo name="mail-with-circle" size={32} color={Color.blue} />
        </View>

        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            Powered by:
          </Text>
          <Text style={styles.profileTxt}>MD Lawancy Limited</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.05)",
  },
  about: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 90,
  },
  profileTxt: {
    fontSize: 12,
    fontFamily: "roboto-regular",
    paddingTop: 2,
    color: Color.lightBlack,
  },
  aboutHead: {
    // fontSize: 14,
    fontWeight: "bold",
  },
});
