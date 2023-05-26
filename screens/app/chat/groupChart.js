import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { auth, db } from "../../../config/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import BackBtn from "../../../shared/backBtn";
import { current } from "@reduxjs/toolkit";
import { useLayoutEffect } from "react";
import Color from "../../../styles/colorStyle";
import { useRef } from "react";

export default function GroupChat() {
  const [messages, setMessages] = useState([]);
  const ref = useRef(null);
  const bgImage = require("../../../assets/chatbg.jpg");

  useLayoutEffect(() => {
    const chatlist = onSnapshot(
      query(collection(db, "chat"), orderBy("createdAt", "desc")),

      (snapshot) => {
        let chatMessage = [];
        snapshot.docs.forEach((doc) => {
          chatMessage.push({
            ...doc.data(),
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
          });
        });
        setMessages(chatMessage);
      }
    );
    return chatlist;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chat"), { _id, createdAt, text, user });
    // console.log(createdAt);
  }, []);

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: Color.lightGray,
          borderTopColor: "#E8E8E8",
          marginHorizontal: 10,

          borderRadius: 15,
          borderTopWidth: 1,
        }}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <ImageBackground style={styles.images} source={bgImage} /> */}

      <BackBtn title={"Chat Room"} />
      {/* <Pressable onPress={() => ref.focusTextInput()} style={{ flex: 1 }}> */}
      <GiftedChat
        ref={ref}
        renderInputToolbar={(props) => customtInputToolbar(props)}
        messages={messages}
        renderUsernameOnMessage={true}
        showAvatarForEveryMessage={true}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser.email,
          name: auth?.currentUser.displayName,
          avatar: auth?.currentUser.photoURL,
        }}
      />
      {/* {Platform.OS === "android" && <KeyboardAvoidingView behavior="padding" />} */}
      {/* </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  images: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    opacity: 0.1,
    resizeMode: "cover",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    top: 0,
  },
});
