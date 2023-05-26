import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";
import { db, auth } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { StyleSheet, Text, View, Image } from "react-native";
import Color from "../styles/colorStyle";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyle";

export default function DrawerContent(props) {
  const [profileImage, setProfileImage] = useState();
  const { navigation } = props;

  useEffect(() => {
    const docRef = doc(db, "user", auth.currentUser.uid);
    onSnapshot(docRef, (doc) => {
      setProfileImage(doc.data()?.profileImage);
    });
  }, []);

  //logout functionality
  const logOut = () => {
    auth.signOut().then(() => console.log("User signed out!"));
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: Color.orange, padding: 0 }}
      >
        <View style={styles.top}>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={
                !profileImage
                  ? require("../assets/noImage.png")
                  : { uri: profileImage }
              }
              style={{
                width: 120,
                height: 120,
                resizeMode: "cover",
                borderRadius: 100,
                marginLeft: 40,
                margin: 5,
              }}
            />
            {/* <View style={{ flexDirection: "row", alignItems: "flex-end"}}>
              <MaterialIcons name="person" size={24} color="black" />
              <Text>{auth.currentUser?.displayName}</Text>
            </View> */}
          </View>
        </View>

        <View style={{ backgroundColor: Color.white }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
      >
        <MaterialIcons name="logout" size={24} color={Color.blue} />
        <Text style={styles.link} onPress={logOut}>
          Log Out
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: Color.lightBlack,
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "roboto-regular",
    margin: 8,
  },
  top: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    //width: "100%",

    backgroundColor: Color.orange,
  },
});
