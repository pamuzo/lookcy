import { createStackNavigator } from "@react-navigation/stack";
import GroupChat from "../screens/app/chat/groupChart";
import AppScreeen from "./tabStack";

const Stack = createStackNavigator();

export default function MyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="appScreen" component={AppScreeen} />
      <Stack.Screen name="groupChat" component={GroupChat} />
    </Stack.Navigator>
  );
}
