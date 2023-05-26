import { createStackNavigator } from "@react-navigation/stack";

import HomeBanner from "../screens/admin/myBanners/homeBanner";
import Admin from "../screens/admin/admin";

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Admin" component={Admin} />
      <Stack.Screen name="HomeBanner" component={HomeBanner} />
    </Stack.Navigator>
  );
}
