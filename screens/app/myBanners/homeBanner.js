import React from "react";
import { View, TouchableOpacity, Text, Modal, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";
//import { firebase } from "firebase/firestore";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { colRef, db, storage } from "../../../config/firebase";
import Input from "../../../shared/input";
import ImageSelector from "../../../shared/imageSelector";
import Card from "../../../shared/card";
import BackBtn from "../../../shared/backBtn";
import Button from "../../../shared/button";
import { globalStyles } from "../../../styles/globalStyle";
import Color from "../../../styles/colorStyle";

export default function HomeBanner() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [link, setLink] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [image, setImage] = useState("");
  const [imageSelector, setImageSlector] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [per, setPer] = useState(null);

  useEffect(() => {
    const uploadImage = async () => {
      let res = await fetch(imageUri);
      let blob = await res.blob();
      let filename = imageUri.substring(imageUri.lastIndexOf("/") + 1);
      let file = new File([blob], `${new Date().getMinutes()}` + filename, {
        type: blob.type,
      });
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPer(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
            console.log("File available at", downloadURL);
          });
        }
      );
    };
    imageUri && uploadImage();
  }, [imageUri]);

  const handleSubmit = async () => {
    await addDoc(collection(db, "banner"), {
      title,
      body,
      link,
      imageUri: image,
    }).then(() => {
      setTitle("");
      setBody("");
      setLink("");
      setImage("");
      setModalOpen(false);
    });

    //to save
  };

  return (
    <View style={globalStyles.container}>
      <BackBtn />
      {/*........................... to open banner modal .................................................... */}
      <TouchableOpacity
        style={{ ...globalStyles.btnTextIcon, backgroundColor: Color.blue }}
        onPress={() => setModalOpen(true)}
      >
        <MaterialIcons name="save" color="#fff" size={18} />
        <Text style={{ fontSize: 16, color: Color.white }}>add Banner</Text>
      </TouchableOpacity>

      {/*........................... to add banner.................................................... */}
      <Modal visible={modalOpen} animationType={"fade"}>
        <View>
          <MaterialIcons
            name="close"
            style={{ ...globalStyles.btnSmall, ...styles.modalTcolse }}
            size={18}
            color={Color.blue}
            onPress={() => setModalOpen(false)}
          />
          <Card>
            <Input
              placeholder="title"
              autoCapitalize="none"
              autoFocus={false}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />
            <Input
              placeholder="Body"
              autoCapitalize="none"
              autoFocus={false}
              value={body}
              onChangeText={(text) => setBody(text)}
            />
            <Input
              placeholder="uri"
              autoCapitalize="none"
              autoFocus={false}
              value={link}
              onChangeText={(text) => setLink(text)}
            />
            <ImageSelector
              imageSelector={imageSelector}
              imageValue={setImageUri}
              size={24}
            />
            <Button
              type={per !== null && per < 100 ? "display" : ""}
              onPress={handleSubmit}
            >
              Submit
            </Button>
          </Card>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 24,
  },
  modalToggle: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2d2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
  },
  modalTcolse: {
    alignSelf: "flex-end",
    marginTop: 20,
    marginRight: 24,
    marginBottom: 0,
  },
});
