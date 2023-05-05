import React, { useState, useCallback, useEffect } from "react";
import { View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { auth, db } from "../../../config/firebase";
import { collection, addDoc, onSnapshot, orderBy } from "firebase/firestore";

import BackBtn from "../../../shared/backBtn";
import { current } from "@reduxjs/toolkit";
import { useLayoutEffect } from "react";
export default function GroupChat() {
  const [messages, setMessages] = useState([]);

  //   useEffect(() => {
  //     setMessages([
  //       {
  //         _id: 1,
  //         text: "Fashionista",
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: "React Native",
  //           avatar: "https://placeimg.com/140/140/any",
  //         },
  //       },
  //     ]);
  //   }, []);

  useLayoutEffect(() => {
    const chatlist = onSnapshot(
      collection(db, "chat"),
      orderBy("createdAt", "desc"),
      //.orderBy("createdAt", "desc"),
      //     .onSnapshot((snapshot) =>
      //       setMessages(
      //         snapshot.docs.map((doc) => ({
      //           _id: doc.data()._id,
      //           createdAt: doc.data().createdAt.toDate(),
      //           text: doc.data().text,
      //           user: doc.data().user,
      //         }))
      //       )
      //     )

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
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BackBtn title={"Chat Room"} />

      <GiftedChat
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
    </View>
  );
}
