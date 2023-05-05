import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import {
  addDoc,
  doc,
  serverTimestamp,
  setDoc,
  collection,
} from "firebase/firestore";

import { colRef, db, auth } from "../config/firebase";
import AuthStack from "./authStack";
import DrawerStack from "./drawerStack";

export default function AppRoute() {
  const [user, setUser] = useState({});
  const [loading, setLodaing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authenticatedUser) => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLodaing(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <DrawerStack user={user} /> : <AuthStack />}
    </NavigationContainer>
  );
}
