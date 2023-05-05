import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
} from "react-native";

import { colRef, auth, db } from "../config/firebase";
import { onSnapshot } from "firebase/firestore";
import Color from "../styles/colorStyle";

export default function BannerSlider() {
  const [banner, setbanner] = useState([]);
  const [index, setIndex] = useState(0);

  const scrollViewRef = useRef(null);

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const nextIndex = index + 1;
  //     if (scrollViewRef.current) {
  //       scrollViewRef.current.scrollTo({
  //         y: nextIndex * 100,
  //         animated: true,
  //       });
  //       setIndex(nextIndex);
  //     }
  //   }, 2000);
  //scrollResponderGetScrollableNode();
  //   return () => clearInterval(intervalId);
  // }, [index]);
  const scrollX = useRef(new Animated.Value(0)).current;
  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight - 300;

  useEffect(() => {
    const interval = setInterval(() => {
      const y = index + 80;
      scrollViewRef?.current?.scrollTo({
        y,
        animated: true,
      });
      // setIndex(index + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getJoblist = onSnapshot(collection(db, "banner"), (snapshot) => {
      let bannerDetails = [];
      snapshot.docs.forEach((doc) => {
        bannerDetails.push({ ...doc.data(), id: doc.id });
      });
      setbanner(bannerDetails);
      //console.log(bannerDetails);
    });
    return () => {
      getJoblist();
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 20,
      }}
    >
      <ScrollView
        horizontal={true}
        ref={scrollViewRef}
        //contentContainerStyle={{ width: `${100 * intervals}%` }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="fast"
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {banner.map((item) => {
          return (
            <View key={item.uid}>
              <Animated.View style={{ width: windowWidth }}>
                <Text style={styles.mediumTxt}>{item.title}</Text>
                <View style={{ width: "100%", height: 300 }}>
                  <Image
                    source={{ uri: item.imageUri }}
                    style={{
                      flex: 1,
                      width: windowWidth,
                      height: 200,
                      resizeMode: "cover",
                    }}
                  />
                  <Text style={styles.smallTxt}>{item.body}</Text>
                </View>
              </Animated.View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.indicatorContainer}>
        {banner.map((item, itemIndex) => {
          const width = scrollX.interpolate({
            inputRange: [
              windowWidth * (itemIndex - 1),
              windowWidth * itemIndex,
              windowWidth * (itemIndex + 1),
            ],
            outputRange: [4, 8, 4],
            extrapolate: "clamp",
          });
          return (
            <View key={item.uid}>
              <Animated.View
                style={[
                  styles.normalDots,
                  { width },
                  { backgroundColor: Color.blue },
                ]}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 18,
  },
  normalDots: {
    width: 4,
    height: 4,
    borderRadius: 50,
    marginHorizontal: 4,
  },
  mediumTxt: {
    fontSize: 16,
    paddingLeft: 20,
    paddingBottom: 7,
    //fontWeight: "bold",
    color: Color.black,
    fontFamily: "roboto-regular",
  },
  smallTxt: {
    fontSize: 14,
    paddingLeft: 20,
    paddingBottom: 7,
    color: Color.black,
    fontFamily: "roboto-light",
  },
});
