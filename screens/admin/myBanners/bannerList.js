import React from "react";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { etStorage, ref, deleteObject } from "firebase/storage";
import { storage, auth, db } from "../../../config/firebase";
import Card from "../../../shared/card";
import { globalStyles } from "../../../styles/globalStyle";
import Color from "../../../styles/colorStyle";
import Button from "../../../shared/button";

export default function BannerList({ route }) {
  const [bannerList, setBannerList] = useState();

  useEffect(() => {
    const banners = onSnapshot(collection(db, "banner"), (snapshot) => {
      let banner = [];
      snapshot.docs.forEach((doc) => {
        banner.push({ ...doc.data(), id: doc.id });
      });
      setBannerList(banner);
    });
    return () => {
      banners();
    };
  }, []);

  //   to delele from fire store

  const deleteMethod = async (id) => {
    try {
      await deleteDoc(doc(db, "banner", id));
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBanner = () => {
    Alert.alert(
      "Are You Sure?",
      "This will delete post permanently!",
      [
        {
          text: "Delete",
          onPress: deleteMethod,
        },
        {
          text: "No Thanks",
          onPress: () => {},
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View style={{ marginBottom: 80 }}>
      <FlatList
        data={bannerList}
        renderItem={({ item }) => (
          <View style={{ paddingLeft: 20, paddingRight: 20 }}>
            <View>
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => deleteMethod(item.id)}
              >
                <Text style={styles.bgTxt}>Delete</Text>
              </TouchableOpacity>

              <Card>
                <View
                  style={{
                    ...globalStyles.twoColum,
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    source={{ uri: item?.imageUri }}
                    style={{
                      width: 100,
                      height: 100,
                      resizeMode: "cover",
                    }}
                  />

                  <View>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        color: Color.blue,
                        fontFamily: "roboto-regular",
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.lightBlack,
                        fontFamily: "roboto-regular",
                        overflow: "hidden",
                      }}
                    >
                      {item.body}
                    </Text>
                  </View>
                </View>
              </Card>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  updateBtn: {
    backgroundColor: Color.orange,
    borderBottomRightRadius: 5,
    borderTopLeftRadius: 5,
    width: "25%",
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    right: 4,
  },
  bgTxt: {
    fontWeight: "bold",
    fontSize: 14,
    color: Color.white,
    textAlign: "center",
    padding: 3,
  },
});
