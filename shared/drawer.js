import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet, Text, View, Image } from "react-native";
import Color from "../styles/colorStyle";
import { auth, signOut } from "../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyle";

export default function DrawerContent(props) {
  const { navigation } = props;

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
                !auth.currentUser?.photoURL
                  ? require("../assets/noImage.png")
                  : { uri: auth.currentUser?.photoURL }
              }
              style={{
                width: 100,
                height: 100,
                resizeMode: "cover",
                borderRadius: 100,
                margin: 10,
              }}
            />
            <Text>
              <MaterialIcons name="person" size={24} color="black" />{" "}
              {auth.currentUser?.displayName}
            </Text>
          </View>
        </View>

        <View style={{ backgroundColor: Color.white }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Text style={styles.link} onPress={logOut}>
        <MaterialIcons name="logout" size={24} color="black" /> Log Out
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  link: {
    color: Color.black,
    fontWeight: "500",
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
