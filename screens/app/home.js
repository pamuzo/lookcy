import { StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import React from "react";
import "expo-dev-client";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, onSnapshot } from "firebase/firestore";
import { db, auth } from "../../config/firebase";
import Color from "../../styles/colorStyle";
import BannerSlider from "../../shared/bannerSlide";
import NewsList from "../../shared/newsList";
import {
  GAMBannerAd,
  BannerAd,
  BannerAdSize,
  TestIds,
  InterstitialAd,
  AdEventType,
  RewardedInterstitialAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";
import Post from "../admin/post/post";

export default function Home({ navigation }) {
  const [greet, setGreet] = useState();
  const [displayName, setDisplayName] = useState("");

  const greetTime = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Evening");
  };

  // const adUnitId = "ca-app-pub-5001839510508266/5899060212";
  // const adUnitId = "ca-app-pub-5001839510508266/5899060212";

  useEffect(() => {
    const docRef = doc(db, "user", auth.currentUser.uid);
    onSnapshot(docRef, (doc) => {
      setDisplayName(doc.data()?.displayName);
    });

    greetTime();
  }, []);

  const openChat = () => {
    navigation.navigate("groupChat");
  };

  const openMenu = () => {
    navigation.openDrawer();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name="menu"
          size={28}
          onPress={openMenu}
          color={Color.blue}
          style={styles.icon}
        />
        <Text style={styles.txtHeader}>Look</Text>
        <Text>{`${greet} ${displayName}`}</Text>
      </View>
      {/* <View
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 1,
        }}
      >
        <PlusIcon onPress={openChat}>
          <Ionicons
            name="chatbubble-ellipses"
            size={28}
            color={Color.white}
            style={styles.icon}
          />
        </PlusIcon>
      </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <BannerSlider />
        {/* <View
          style={{ ...globalStyles.hrLine, marginBottom: 24, marginTop: 0 }}
        /> */}
        {/* <Post /> */}
        <NewsList />
        <NewsList />
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.FULL_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
        <GAMBannerAd
          unitId={TestIds.BANNER}
          sizes={[BannerAdSize.FULL_BANNER]}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Color.midGray,
    paddingLeft: 40,
    paddingRight: 15,
    paddingBottom: 8,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  txtHeader: {
    //fontWeight: "bold",
    fontSize: 24,
    color: Color.blue,
    fontFamily: "roboto-light",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 6,
    bottom: 8,
  },
});
