import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";

import { db, auth } from "../config/firebase";
import AppScreeen from "./tabStack";
import JobDetails from "../screens/app/jobDetails";
import Profile from "../screens/app/profile/profile";
import DrawerContent from "../shared/drawer";
import Joblist from "../screens/app/joblist";

import Color from "../styles/colorStyle";
import HomeBanner from "../screens/app/myBanners/homeBanner";
import { StyleSheet } from "react-native-web";

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const disName = async () => {
      const displayName = await auth.currentUser?.displayName;
      setDisplayName(displayName);
      console.log(typeof auth.currentUser?.email);
    };
    disName();
  }, []);

  return (
    <Drawer.Navigator
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-filled";
          } else if (route.name === "Account") {
            iconName = focused ? "account-circle" : "person";
          } else if (route.name === "Joblist") {
            iconName = focused ? "view-list" : "list";
          } else if (route.name === "Customer List") {
            iconName = focused ? "people-alt" : "people";
          } else if (route.name === "About Us") {
            iconName = focused ? "info" : "info-outline";
          } else if (route.name === "FeedBack") {
            iconName = focused ? "feedback" : "message";
          }
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        activeTintColor: "red",
        drawerActiveBackgroundColor: Color.orange,
        drawerActiveTintColor: Color.white,
        drawerInactiveTintColor: Color.blue,
        drawerLabelStyle: {
          marginLeft: -22,
          fontFamily: "roboto-regular",
          fontWeight: "bold",
          marginTop: -5,
        },
        headerShown: false,
        drawerStyle: {
          width: 240,
        },
      })}
      drawerContent={(props) => <DrawerContent {...props} />}
      defaultScreenOptions={AppScreeen}
    >
      <Drawer.Screen name="Home" component={AppScreeen} />
      <Drawer.Screen
        name="JobDetail"
        options={{ drawerItemStyle: { display: "none" } }}
        component={JobDetails}
      />
      <Drawer.Screen name="Account" component={Profile} />
      <Drawer.Screen name="Joblist" component={Joblist} />
      <Drawer.Screen name="Customer List" component={Profile} />
      <Drawer.Screen name="About Us" component={Profile} />
      <Drawer.Screen name="FeedBack" component={Profile} />
      <Drawer.Screen
        name="HomeBanner"
        options={{
          drawerItemStyle: [
            auth.currentUser?.email !== "md@md.com" ? styles.display : {},
          ],
        }}
        component={HomeBanner}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  display: {
    display: "none",
  },
});
