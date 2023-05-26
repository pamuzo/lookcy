import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { doc, onSnapshot, collection } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

import BackBtn from "../../shared/backBtn";
import { FlatList } from "react-native";
import Card from "../../shared/card";
import Button from "../../shared/button";
import HomeBanner from "./myBanners/homeBanner";

export default function Admin({ navigation }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getJoblist = onSnapshot(collection(db, "user"), (snapshot) => {
      let user = [];
      snapshot.docs.forEach((doc) => {
        user.push({ ...doc.data(), id: doc.id });
      });
      setUsers(user);
    });
    return () => {
      getJoblist();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BackBtn title={"Admin"} />

      <View
        style={{
          flexDirection: "row",
          gap: 4,
          // flexWrap: "wrap",
          // flexGrow: 1,
          paddingHorizontal: 10,
        }}
      >
        <Button onPress={() => navigation.navigate("HomeBanner")}>
          Home Banner
        </Button>
        <Button>Add Admin</Button>
      </View>
      <Text style={{ paddingHorizontal: 10 }}>
        Total numbers of User {users.length}
      </Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        ListFooterComponent={<View style={{ height: 120 }} />}
        renderItem={({ item }) => {
          return (
            <View style={{ paddingHorizontal: 10 }}>
              <Card>
                <Text>{item.fullName}</Text>
                <Text>{item.phoneNumber}</Text>
                <Text>{item.email}</Text>
                <Text>{item.brandName}</Text>
              </Card>
            </View>
          );
        }}
      />
    </View>
  );
}
