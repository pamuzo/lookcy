import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
import Color from "../styles/colorStyle";

export default function ImageSelector({
  imageValue,
  children,
  size,
  imageSelector,
  type,
}) {
  // The path of the picked image
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [imageName, setImageName] = useState("");

  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      //allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      var filename = result.assets[0].uri.substring(
        result.assets[0].uri.lastIndexOf("/") + 1,
        result.assets[0].uri.length
      );
      setImageName(filename.toString());
      // console.log(result.assets[0].uri);
      imageValue(result.assets[0].uri);
      //setFieldValue({ uri: pickedImagePath });
    }
  };
  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0.2,
      aspect: [1, 1.5],
    });
    if (!result.canceled) {
      setPickedImagePath(result.assets[0].uri);
      //console.log(result.assets[0].uri);
      imageValue(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.screen}>
      {/* <Button onPress={showImagePicker} title="Select an image" /> */}
      <TouchableOpacity
        style={[
          styles.buttonContainer,
          type === "blue" ? styles.blueBG : {},
          type === "disabled" ? styles.disabled : {},
        ]}
        onPress={imageSelector ? showImagePicker : openCamera}
      >
        <Feather name="camera" size={size} color={"#fff"} />
        <Text style={{ fontSize: 16, color: Color.white }}>{children}</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {pickedImagePath !== "" && (
          <Image source={{ uri: pickedImagePath }} style={styles.image} />
        )}
      </View>
    </View>
  );
}

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({
  screen: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    borderRadius: 6,
    padding: 6,
    gap: 2,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: Color.orange,
    marginBottom: 5,
  },
  imageContainer: {
    //padding: 30,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
  },
  blueBG: {
    backgroundColor: Color.blue,
    borderRadius: 5,
  },
  disabled: {
    opacity: 0.4,
  },
});
