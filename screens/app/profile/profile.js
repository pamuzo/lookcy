import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  Modal,
  TouchableOpacity,
} from "react-native";
import { doc, onSnapshot, updateProfile } from "firebase/firestore";
import { colRef, db, auth, updatRef } from "../../../config/firebase";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";

import { globalStyles } from "../../../styles/globalStyle";
import Input from "../../../shared/input";
import BackBtn from "../../../shared/backBtn";
import Color from "../../../styles/colorStyle";
import ImageSelector from "../../../shared/imageSelector";

export default function Profile() {
  const [phoneNumber, setPhoneNumber] = useState();
  const [fullName, setFullName] = useState();
  const [brandName, setBrandName] = useState();
  const [bio, setBio] = useState();
  const [dob, setDbo] = useState();
  const [createdAt, setCreatedAt] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const docRef = doc(db, "user", auth.currentUser.uid);
    onSnapshot(docRef, (doc) => {
      setPhoneNumber(doc.data()?.phoneNumber);
      setFullName(doc.data()?.fullName);
      setBrandName(doc.data()?.brandName);
      setBio(doc.data()?.bio);
      setCreatedAt(doc.data()?.createdAt);
    });
  }, []);

  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      phoneNumber,
    })
      .then(() => {
        setModalOpen(false);
        console.log(auth.currentUser.phoneNumber);
        // Profile updated!
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <BackBtn title={"My Profile"} />
      <ScrollView style={styles.container}>
        <View />
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: 130, height: 130 }}>
              <View
                style={{
                  position: "absolute",
                  zIndex: 1,
                  right: 2,
                  bottom: 3,
                }}
              >
                <ImageSelector type={"blue"} size={18} />
              </View>
              <Image
                source={
                  !auth.currentUser?.photoURL
                    ? require("../../../assets/noImage.png")
                    : { uri: auth.currentUser?.photoURL }
                }
                style={{
                  width: 120,
                  height: 120,
                  resizeMode: "cover",
                  borderRadius: 100,
                  margin: 10,
                }}
              />
            </View>
            <Text> {auth.currentUser?.displayName}</Text>
          </View>
          <View style={{ ...globalStyles.hrLine, borderColor: Color.black }} />

          <View style={{ ...styles.profileContent }}>
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Email:
            </Text>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text style={styles.profileTxt}>{auth?.currentUser?.email}</Text>
              <View style={{ ...globalStyles.hrLine }} />
            </View>
          </View>

          <View style={{ ...styles.profileContent }}>
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              PhoneNumber:
            </Text>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text style={styles.profileTxt}> {phoneNumber}</Text>
              <View style={{ ...globalStyles.hrLine }} />
            </View>
          </View>

          <View style={{ ...styles.profileContent }}>
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Full Name:
            </Text>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text style={styles.profileTxt}> {fullName}</Text>
              <View style={{ ...globalStyles.hrLine }} />
            </View>
          </View>

          <View style={{ ...styles.profileContent }}>
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Bio:
            </Text>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text style={styles.profileTxt}> {bio}</Text>
              <View style={{ ...globalStyles.hrLine }} />
            </View>
          </View>

          <View style={{ ...styles.profileContent }}>
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Birthday:
            </Text>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text style={styles.profileTxt}>
                {`${moment(new Date(createdAt * 1000)).format("LL")}`}
              </Text>
            </View>
          </View>

          <View style={{ ...globalStyles.hrLine, borderColor: Color.black }} />

          <View style={{ ...styles.profileContent }}>
            <Text style={{ ...styles.profileTxt, ...styles.profileTxtBold }}>
              Brand Name:
            </Text>
            <View style={{ width: "100%", marginBottom: 10 }}>
              <Text style={styles.profileTxt}> {brandName}</Text>
              <View style={{ ...globalStyles.hrLine }} />
            </View>
          </View>
        </View>

        {/* ........to Edith the profile Button ............*/}
        <TouchableOpacity onPress={() => setModalOpen(true)}>
          <Text>Edith Profile</Text>
        </TouchableOpacity>

        {/*......................... to Open the modal for edithing....................  */}
        <Modal visible={modalOpen} animationType={"fade"}>
          <View>
            <View style={{ ...styles.modalTcolse }}>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
                <Text>Cancle</Text>
              </TouchableOpacity>

              <Text> Profile Edith</Text>
              <MaterialIcons
                name="check"
                size={24}
                color={Color.blue}
                onPress={handleUpdate}
              />
            </View>
            <Input
              placeholder="Phone Number"
              autoCapitalize="none"
              autoFocus={false}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <Input
              placeholder="Bio"
              autoCapitalize="none"
              autoFocus={false}
              value={bio}
              onChangeText={(text) => setBio(text)}
            />
            <Input
              placeholder="Brand Name"
              autoCapitalize="none"
              autoFocus={false}
              value={brandName}
              onChangeText={(text) => setBrandName(text)}
            />
          </View>
        </Modal>

        <View style={{ marginBottom: 40 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileTxt: {
    fontSize: 18,
    fontFamily: "roboto-regular",
    paddingTop: 2,
  },
  profileTxtBold: {
    fontFamily: "roboto-light",
    fontSize: 12,
    color: Color.gray,
  },
  profileContent: {
    justifyContent: "flex-start",
    paddingHorizontal: 15,
  },
  modalTcolse: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 15,
    marginBottom: 0,
  },
});
