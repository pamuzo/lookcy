import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "expo-dev-client";
import { Provider } from "react-redux";

import AppRoute from "./routes/appRoutes";
import { store } from "./redux/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    "roboto-bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto-light": require("./assets/fonts/Roboto-Light.ttf"),
    "roboto-regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "roboto-thin": require("./assets/fonts/Roboto-Thin.ttf"),
  });

  let sc = SplashScreen.preventAutoHideAsync();
  useEffect(() => {
    async function prepare() {
      await sc;
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return undefined;
  } else {
    SplashScreen.hideAsync();
  }
  return <AppRoute />;
}
