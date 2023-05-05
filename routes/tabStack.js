import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import Joblist from "../screens/app/joblist";
//import HomeScreen from "../screens/app/Home";
import Color from "../styles/colorStyle";
import Home from "../screens/app/home";
import GroupChat from "../screens/app/chat/groupChart";

const Tab = createBottomTabNavigator();

export default function AppScreeen() {
  return (
    <Tab.Navigator
      defaultScreenOptions={Home}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "home") {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === "Joblist") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "groupChat") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Color.blue,
        tabBarInacttiveTintColor: "#ff0000",
      })}
    >
      <Tab.Screen name="home" component={Home} />
      <Tab.Screen name="groupChat" component={GroupChat} />
      <Tab.Screen name="Joblist" component={Joblist} />
    </Tab.Navigator>
  );
}
<Ionicons name="chatbubble-ellipses" size={24} color="black" />;
