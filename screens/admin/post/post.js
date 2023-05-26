import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  //Video,
  ResizeMode,
  Button,
} from "react-native";
import Video from "react-native-video";
//import { Video, ResizeMode } from "expo-av";

export default function Post() {
  // const video = React.useRef(null);
  // const [status, setStatus] = React.useState({});

  //const video = React.useRef(null);
  //const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <Video
        //ref={video}
        // style={styles.video}
        source={{
          uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        }}
        // useNativeControls
        // resizeMode="contain"
        // isLooping
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      {/* <View style={styles.buttons}>
        <Button
          title={status.isPlaying ? "Pause" : "Play"}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        />
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
  buttons: {
    margin: 16,
  },
});
