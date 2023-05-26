import React from "react";
import { Text, StyleSheet, View, Linking } from "react-native";
import BackBtn from "../../shared/backBtn";
import { FontAwesome5, Ionicons, Entypo } from "@expo/vector-icons";

import Color from "../../styles/colorStyle";

export default function FeedBack() {
  const year = new Date().getFullYear();
  return (
    <View style={styles.container}>
      <BackBtn title={"FeedBack"} />
      <View style={styles.feedBack}>
        <Text>You can get to us on...</Text>

        <View style={{ flexDirection: "row", gap: 6, marginVertical: 10 }}>
          <Entypo name="instagram-with-circle" size={32} color={Color.blue} />
          {/* <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            instagram
          </Text> */}
          <Text
            style={styles.feedBackTxt}
            onPress={() =>
              Linking.openURL("https://www.instagram.com/look4every/")
            }
          >
            @look4every
          </Text>
        </View>

        <View style={{ flexDirection: "row", gap: 6, marginVertical: 10 }}>
          <FontAwesome5 name="facebook" size={32} color={Color.blue} />
          {/* <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            instagram
          </Text> */}
          <Text style={styles.feedBackTxt}>@look4every</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 6, marginVertical: 10 }}>
          <Entypo name="mail-with-circle" size={32} color={Color.blue} />
          {/* <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            instagram
          </Text> */}
          <Text style={styles.feedBackTxt}>@look4every</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 6, marginVertical: 10 }}>
          <FontAwesome5 name="whatsapp" size={32} color={Color.blue} />
          {/* <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            instagram
          </Text> */}
          <Text style={styles.feedBackTxt}>+234 7057034392</Text>
        </View>

        <View style={{ flexDirection: "row", gap: 6, marginVertical: 10 }}>
          <Ionicons name="md-globe-outline" size={32} color={Color.blue} />
          {/* <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            instagram
          </Text> */}
          <Text
            style={styles.feedBackTxt}
            onPress={() => Linking.openURL("https://lawancy.com/")}
          >
            www.lawancy.com
          </Text>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.profileTxt}>
            You Can Tell us how you feel about this app, what improvment should
            be made, what you would like to see in the next upgrade..
          </Text>
          <Text style={styles.profileTxt}>
            Please do not forget to rate the app.
          </Text>
        </View>

        {/* <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text style={{ ...styles.profileTxt, ...styles.aboutHead }}>
            Powered by:
          </Text>
          <Text style={styles.profileTxt}>MD Lawancy Limited</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(52, 52, 52, 0.05)",
  },
  feedBack: {
    padding: 24,
  },
  feedBackTxt: {
    fontSize: 16,
    fontFamily: "roboto-regular",
    paddingTop: 2,
    color: Color.lightBlack,
    justifyContent: "flex-end",
  },
  aboutHead: {
    // fontSize: 14,
    fontWeight: "bold",
  },
});
