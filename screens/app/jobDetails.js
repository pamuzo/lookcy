import {
  StyleSheet,
  Text,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useState } from "react";
import { colRef, db, auth } from "../../config/firebase";
import { doc, deleteDoc, collection } from "firebase/firestore";
import moment from "moment/moment";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import BackBtn from "../../shared/backBtn";
import Card from "../../shared/card";
import Color from "../../styles/colorStyle";
import JobModal from "./jobModal";
import { globalStyles } from "../../styles/globalStyle";

export default function JobDetails({ route, navigation }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { measuremnt } = route.params;

  //to delete the measurements
  const deleteMethod = async () => {
    try {
      await deleteDoc(
        doc(
          collection(db, "user", auth.currentUser.uid, "customerInfor"),
          route.params.measuremnt.id
        )
      ).then(() => {
        navigation.navigate("Joblist");
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMesurement = () => {
    Alert.alert(
      "Are You Sure?",
      "This will delete your Job permanently!",
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

  const handleUpdate = () => {};
  const handleClose = () => {
    setModalOpen(false);
  };

  // const edithMeadurment = () => {
  //   //setIsEdith(true);
  //   setModalOpen(true);
  // };

  // console.log(measuremnt);
  return (
    <View style={styles.container}>
      <BackBtn title={"Customer Details"} />
      <ScrollView style={{ paddingRight: 20, paddingLeft: 20 }}>
        <Card>
          <Text style={styles.bookDate}>{`Booked Date: ${moment(
            measuremnt.bookedDate.toDate()
          ).format("ll")}`}</Text>
          <Text
            style={{
              marginTop: 6,
              fontSize: 20,
              fontWeight: "bold",
              color: Color.blue,
              textAlign: "center",
            }}
          >
            {measuremnt.customerName}
          </Text>
          <View style={globalStyles.hrLine} />
          <View style={globalStyles.twoColum}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: Color.blue }}
            >
              {measuremnt.phoneNumber}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <MaterialIcons
                title="calll"
                style={globalStyles.btnSmall}
                name="call"
                size={16}
                color={Color.blue}
              />
              <FontAwesome
                style={globalStyles.btnSmall}
                name="envelope-o"
                size={16}
                color={Color.blue}
              />
            </View>
          </View>

          <View style={globalStyles.hrLine} />

          <View style={globalStyles.twoColum}>
            <Text style={styles.txtValue}> Paires </Text>
            <Text style={styles.txtValue}>{measuremnt.paires} </Text>
          </View>

          <View style={globalStyles.hrLine} />

          <View style={globalStyles.twoColum}>
            <View style={styles.colContent}>
              <Text style={styles.txtHeading}> Top </Text>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Lenght:</Text>
                <Text style={styles.txtValue}>{measuremnt.topLenght} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Showlder:</Text>
                <Text style={styles.txtValue}>{measuremnt.showlder} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Chest:</Text>
                <Text style={styles.txtValue}>{measuremnt.chest} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Sleeve:</Text>
                <Text style={styles.txtValue}>{measuremnt.sleeve} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Tummy:</Text>
                <Text style={styles.txtValue}>{measuremnt.tummy} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Neck:</Text>
                <Text style={styles.txtValue}>{measuremnt.neck} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>R. Sleve:</Text>
                <Text style={styles.txtValue}>{measuremnt.roundSleve} </Text>
              </View>
            </View>

            <View style={styles.colContent}>
              <Text style={styles.txtHeading}> Trouser/Botton</Text>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Lenght:</Text>
                <Text style={styles.txtValue}>{measuremnt.bottomLenght} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Waist:</Text>
                <Text style={styles.txtValue}>{measuremnt.waist} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Laps:</Text>
                <Text style={styles.txtValue}>{measuremnt.laps} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Knee:</Text>
                <Text style={styles.txtValue}>{measuremnt.knee} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Seat:</Text>
                <Text style={styles.txtValue}>{measuremnt.seat} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Flap:</Text>
                <Text style={styles.txtValue}>{measuremnt.flap} </Text>
              </View>
              <View style={globalStyles.twoColum}>
                <Text style={styles.txtUnit}>Bottom: </Text>
                <Text style={styles.txtValue}>{measuremnt.bottom} </Text>
              </View>
            </View>
          </View>

          <View style={globalStyles.hrLine} />
          <Text>{`DeadLine Date: ${moment(
            measuremnt.deadLineDate.toDate()
          ).format("ll")}`}</Text>
          <View style={globalStyles.hrLine} />

          <Image
            source={
              !measuremnt.image
                ? require("../../assets/noImage.png")
                : { uri: measuremnt.image }
            }
            style={{
              width: "100%",
              height: 150,
              resizeMode: "cover",
              marginBottom: 15,
            }}
          />
          <Text>Additional Message: </Text>
          <View style={globalStyles.hrLine} />
          <View style={globalStyles.twoColum}>
            <Text style={styles.txtValue}>{measuremnt.addMessage} </Text>
          </View>

          <View style={globalStyles.twoColum}>
            <TouchableOpacity
              style={globalStyles.btnTextIcon}
              onPress={deleteMesurement}
            >
              <MaterialIcons name="delete" color="#fff" size={18} />
              <Text style={{ fontSize: 16, color: Color.white }}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...globalStyles.btnTextIcon,
                backgroundColor: Color.orange,
              }}
              onPress={"Save Details"}
            >
              <MaterialIcons name="save" color="#fff" size={18} />
              <Text style={{ fontSize: 16, color: Color.white }}>Save</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
            style={{ ...globalStyles.btnTextIcon, backgroundColor: Color.blue }}
            onPress={"update"}
          >
            <MaterialIcons name="save" color="#fff" size={18} />
            <Text style={{ fontSize: 16, color: Color.white }}>Update</Text>
          </TouchableOpacity> */}
          </View>

          {/* <MaterialIcons name="note" size={24} onPress={edithMeadurment} /> */}
          {/* <TouchableOpacity onPress={setOpenModal(true)}>
          <Text style={{ color: "green" }}>Update infor</Text>
        </TouchableOpacity> */}
        </Card>

        {/* <JobModal
          visible={modalOpen}
          onClose={handleClose}
          onSubmit={handleUpdate}
          // isEdith={isEdith}
          // measuremnt={measuremnt}
        /> */}
        <View style={{ marginBottom: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookDate: {
    textAlign: "right",
    fontSize: 12,
    color: Color.orange,
  },
  txtUnit: {
    fontSize: 16,
    paddingBottom: 10,
    color: Color.gray,
  },
  txtValue: {
    color: Color.blue,
    textAlign: "right",
    paddingBottom: 10,
    paddingRight: 8,
    fontSize: 16,
  },
  colContent: {
    flexGrow: 1,
  },
  txtHeading: {
    fontSize: 16,
    fontWeight: "bold",
    paddingBottom: 10,
    paddingTop: 10,
  },
});
