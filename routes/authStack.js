import { createStackNavigator } from "@react-navigation/stack";

import Onboarding from "../screens/auth/onBoarding";
import SignIn from "../screens/auth/signIn";
import SignUp from "../screens/auth/signUp";
import ForgotPassWord from "../screens/auth/forgetPassword";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Onboarding}>
      <Stack.Screen
        name="onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ForgotPassWord"
        component={ForgotPassWord}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
