import { createDrawerNavigator } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import Color from "../styles/colorStyle";
import { StyleSheet } from "react-native";
import { EMAIL } from "@env";

import JobDetails from "../screens/app/jobDetails";
import Profile from "../screens/app/profile/profile";
import DrawerContent from "../shared/drawer";
import Joblist from "../screens/app/joblist";

import MyStack from "./Stack";
import AdminStack from "./adminStack";
import About from "../screens/admin/about";
import FeedBack from "../screens/admin/feedBack";

const Drawer = createDrawerNavigator();

export default function DrawerStack() {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const disName = async () => {
      const displayName = await auth.currentUser?.displayName;
      setDisplayName(displayName);
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
      defaultScreenOptions={MyStack}
    >
      <Drawer.Screen name="Home" component={MyStack} />
      <Drawer.Screen
        name="JobDetail"
        options={{ drawerItemStyle: { display: "none" } }}
        component={JobDetails}
      />
      <Drawer.Screen name="Account" component={Profile} />
      <Drawer.Screen name="Joblist" component={Joblist} />
      <Drawer.Screen
        name="Customer List"
        options={{ drawerItemStyle: { display: "none" } }}
        component={Profile}
      />
      <Drawer.Screen name="About Us" component={About} />
      <Drawer.Screen name="FeedBack" component={FeedBack} />
      <Drawer.Screen
        name="Admin section"
        options={{
          drawerItemStyle: [
            auth.currentUser?.email !== EMAIL ? styles.display : {},
          ],
        }}
        component={AdminStack}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  display: {
    display: "none",
  },
});
