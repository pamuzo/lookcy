import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import {
  Text,
  FlatList,
  ScrollView,
  StyleSheet,
  View,
  Animated,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";

import { colRef, auth, db } from "../config/firebase";
import { onSnapshot } from "firebase/firestore";
import Color from "../styles/colorStyle";

export default function BannerSlider() {
  const [banner, setbanner] = useState([]);
  const [index, setIndex] = useState(0);
  const [readMore, setReadMore] = useState(true);

  const scrollX = useRef(new Animated.Value(0)).current;
  let { width: windowWidth, height: windowHeight } = useWindowDimensions();
  windowHeight = windowHeight - 300;

  useEffect(() => {
    const getJoblist = onSnapshot(collection(db, "banner"), (snapshot) => {
      let bannerDetails = [];
      snapshot.docs.forEach((doc) => {
        bannerDetails.push({ ...doc.data(), id: doc.id });
      });
      setbanner(bannerDetails.sort((a, b) => 0.5 - Math.random()));
    });

    return () => {
      getJoblist();
    };
  }, []);

  const data = banner;

  const handleReadMore = () => {
    setReadMore(!readMore);
  };
  const numberOfLines = () => {};

  const moreText = (item) => {
    item.body.slice(0, 10);
  };

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
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
            <Animated.View style={{ width: windowWidth }}>
              <Text style={styles.mediumTxt}>{item.title}</Text>
              <View style={{ width: "100%", height: 340 }}>
                <Image
                  source={item.imageUri !== "" ? { uri: item.imageUri } : null}
                  style={{
                    flex: 1,
                    width: windowWidth,
                    height: 340,
                    resizeMode: "cover",
                  }}
                />
              </View>
              <Text
                numberOfLines={readMore ? 3 : 1000}
                ellipsizeMode="tail"
                style={styles.smallTxt}
              >
                {item.body}
              </Text>
              <TouchableOpacity
                style={
                  item.body.length >= 150
                    ? { display: "flex" }
                    : { display: "none" }
                }
                onPress={handleReadMore}
              >
                <Text style={styles.smallTxt}>
                  {readMore ? "Read More...." : "Less!"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="fast"
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        // onMomentumScrollEnd={(event) => {
        //   const index = Math.round(
        //     event.nativeEvent.contentOffset.x /
        //       event.nativeEvent.layoutMeasurement.width
        //   );
        // flatListRef.current?.scrollIndex = index;
        // }}
      />

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
            <View key={item?.uid}>
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
    top: 375,
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
    color: Color.black,
    fontFamily: "roboto-regular",
  },
  smallTxt: {
    fontSize: 14,
    paddingLeft: 20,
    paddingRight: 7,
    // paddingBottom: 7,
    paddingHorizontal: 7,
    color: Color.lightBlack,
    fontFamily: "roboto-light",
    marginTop: 10,
  },
});
