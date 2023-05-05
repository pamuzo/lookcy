import {
  StyleSheet,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";

import * as yup from "yup";
import {
  addDoc,
  doc,
  serverTimestamp,
  setDoc,
  collection,
} from "firebase/firestore";
import { Timestamp } from "@firebase/firestore";
import moment from "moment/moment";
import { colRef, db, auth } from "../../config/firebase";
import Input from "../../shared/input";
import Card from "../../shared/card";
import Button from "../../shared/button";
import DateSelector from "../../shared/dateSelector";
import ImageSelector from "../../shared/imageSelector";
import { globalStyles } from "../../styles/globalStyle";
import Color from "../../styles/colorStyle";
import RadioBtn from "../../shared/radioBtn";

// creating the job schma for yup
let addJobSchma = yup.object({
  customerName: yup.string().required(),
  deadLineDate: yup.date().nullable(),
});

export default function JobModal({
  visible,
  onClose,
  onSubmit,
  mesurement,
  isEdith,
}) {
  const [loading, setLoading] = useState(false);
  const [ismale, setIsmale] = useState(true);
  const [text, setText] = useState(
    isEdith ? new Date(mesurement.deadLineDate.seconds * 1000) : new Date()
  );
  const [imageUri, setImageUri] = useState(isEdith ? mesurement.image : "");
  const [count, setCount] = useState(isEdith ? Number(mesurement.paires) : 1);

  // .......................initial values .............................................
  const newMeasurement = {
    customerName: isEdith ? mesurement.customerName : "",
    phoneNumber: isEdith ? mesurement.phoneNumber : "",
    paires: isEdith ? mesurement.paires : "",
    topLenght: isEdith ? mesurement.topLenght : "",
    showlder: isEdith ? mesurement.showlder : "",
    chest: isEdith ? mesurement.chest : "",
    sleeve: isEdith ? mesurement.sleeve : "",
    tummy: isEdith ? mesurement.tummy : "",
    neck: isEdith ? mesurement.neck : "",
    roundSleve: isEdith ? mesurement.roundSleve : "",
    bottomLenght: isEdith ? mesurement.bottomLenght : "",
    waist: isEdith ? mesurement.waist : "",
    laps: isEdith ? mesurement.laps : "",
    knee: isEdith ? mesurement.knee : "",
    seat: isEdith ? mesurement.seat : "",
    flap: isEdith ? mesurement.flap : "",
    bottom: isEdith ? mesurement.bottom : "",
    addMessage: isEdith ? mesurement.addMessage : "",
    deadLineDate: isEdith ? new Date(mesurement.deadLineDate * 1000) : "",
    bookedDate: isEdith ? new Date(mesurement.bookedDate * 1000) : "",
    image: isEdith ? mesurement.image : "",
  };
  //...................for increment ................................
  const increament = () => {
    setCount(count + 1);
  };
  //..........................for decrement .............................
  const decreament = () => {
    setCount(count - 1);
  };

  //.........................to handle the submit button.............................
  const handleSubmit = async (values, actions) => {
    onSubmit(values);
    setLoading(true);

    // for updating data in firbase
    if (isEdith) {
      await setDoc(
        doc(db, "user", auth.currentUser.uid, "customerInfor", mesurement.id),
        {
          customerName: values.customerName,
          phoneNumber: values.phoneNumber,
          paires: count,
          topLenght: values.topLenght,
          showlder: values.showlder,
          chest: values.chest,
          sleeve: values.sleeve,
          tummy: values.tummy,
          neck: values.neck,
          roundSleve: values.roundSleve,
          bottomLenght: values.bottomLenght,
          waist: values.waist,
          laps: values.laps,
          knee: values.knee,
          seat: values.seat,
          flap: values.flap,
          bottom: values.bottom,
          deadLineDate: values.deadLineDate,
          addMessage: values.addMessage,
          deadLineDate: Timestamp.fromDate(text),
          bookedDate: new Date(mesurement.bookedDate.seconds * 1000),
          image: imageUri,
        }
      )
        .then(() => {
          setLoading(false);
          actions.resetForm();
          setText(new Date());
          setImageUri("");
          onClose();
        })
        .catch((e) => {
          setLoading(false);
          console.log(e.mesage);
        });
    } else {
      //adding new data to firestore
      if (moment(text).isBefore(new Date())) {
        Alert.alert("Please enter a future date");
        return setLoading(false);
      }
      await addDoc(
        collection(db, "user", auth.currentUser.uid, "customerInfor"),
        {
          customerName: values.customerName,
          phoneNumber: values.phoneNumber,
          paires: count,
          topLenght: values.topLenght,
          showlder: values.showlder,
          chest: values.chest,
          sleeve: values.sleeve,
          tummy: values.tummy,
          neck: values.neck,
          roundSleve: values.roundSleve,
          bottomLenght: values.bottomLenght,
          waist: values.waist,
          laps: values.laps,
          knee: values.knee,
          seat: values.seat,
          flap: values.flap,
          bottom: values.bottom,
          addMessage: values.addMessage,
          bookedDate: serverTimestamp(),
          deadLineDate: Timestamp.fromDate(text),
          image: imageUri,
        }
        //console.log(mesurement)
      )
        .then(() => {
          setLoading(false);
          actions.resetForm();
          setText(new Date());
          setImageUri("");
          onClose();
        })
        .catch((e) => {
          setLoading(false);
          console.log(e.mesage);
        });
    }
  };

  // to close the modal
  const closeModal = () => {
    setText(new Date());
    onClose();
  };

  return (
    <>
      {/* .........................page heading................................... */}
      <Modal visible={visible} animationType={"fade"}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              color: Color.blue,
              fontSize: 22,
              paddingLeft: 24,
              marginBottom: 5,
            }}
          >
            {isEdith ? "Update Detalies" : "Add a new Job"}
          </Text>

          <MaterialIcons
            name="close"
            style={{ ...globalStyles.btnSmall, ...styles.modalTcolse }}
            size={18}
            color={Color.blue}
            onPress={closeModal}
          />
        </View>

        {/* ...............................................page Body................................. */}
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={newMeasurement}
              enableReinitialize
              validationSchema={addJobSchma}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={{ ...globalStyles.container, paddingTop: 10 }}>
                  <Text style={styles.lebal}>Customer Information</Text>

                  <Card>
                    <Input
                      onChangeText={handleChange("customerName")}
                      value={values.customerName}
                      outLine
                      placeholder="Customer Name"
                    />
                    <Input
                      onChangeText={handleChange("phoneNumber")}
                      value={values.phoneNumber}
                      outLine
                      placeholder="Phone Number"
                      keyboardType="numeric"
                    />

                    <View style={{ flexDirection: "row" }}>
                      <RadioBtn male={setIsmale} />
                    </View>
                    <View style={ismale ? { display: "none" } : ""}>
                      <Text style={{ color: "red", fontSize: 12 }}>
                        Female input are yet to be added....
                      </Text>
                    </View>
                  </Card>

                  {/* ........................................PAIRES............................. */}
                  <Card>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        // flexWrap: "wrap",
                      }}
                    >
                      <Text style={styles.lebal}>Paires:</Text>
                      <MaterialIcons
                        name="remove"
                        style={[
                          globalStyles.btnSmall,
                          count === 1 ? { opacity: 0.5 } : { opacity: 1 },
                        ]}
                        size={16}
                        color={Color.blue}
                        onPress={decreament}
                        disabled={count === 1 ? true : false}
                      />
                      <Input
                        onChangeText={handleChange("paires")}
                        value={count.toString()}
                        editable={false}
                        outLine
                        style={{
                          paddingHorizontal: 7,
                          fontSize: 24,
                        }}
                        keyboardType="numeric"
                      />
                      <MaterialIcons
                        name="add"
                        style={{
                          ...globalStyles.btnSmall,
                        }}
                        size={16}
                        color={Color.blue}
                        onPress={increament}
                      />
                    </View>
                  </Card>

                  {/* ...................Take Measurement ..................................................... */}
                  <Text style={styles.lebal}>Take Measurement</Text>

                  <Card>
                    <View style={styles.twoColum}>
                      <View style={styles.colContent}>
                        <Text style={styles.lebal}>Top</Text>
                        <Input
                          onChangeText={handleChange("topLenght")}
                          value={values.topLenght}
                          keyboardType="numeric"
                          outLine
                          placeholder="Lenght"
                        />
                        <Input
                          onChangeText={handleChange("showlder")}
                          value={values.showlder}
                          keyboardType="numeric"
                          outLine
                          placeholder="Showlder"
                        />
                        <Input
                          onChangeText={handleChange("chest")}
                          value={values.chest}
                          keyboardType="numeric"
                          outLine
                          placeholder="Chest"
                        />
                        <Input
                          onChangeText={handleChange("sleeve")}
                          value={values.sleeve}
                          keyboardType="numeric"
                          outLine
                          placeholder="Sleeve"
                        />
                        <Input
                          onChangeText={handleChange("tummy")}
                          value={values.tummy}
                          keyboardType="numeric"
                          outLine
                          placeholder="Fit or Tummy"
                        />
                        <Input
                          onChangeText={handleChange("neck")}
                          value={values.neck}
                          keyboardType="numeric"
                          outLine
                          placeholder="Neck"
                        />
                        <Input
                          onChangeText={handleChange("roundSleve")}
                          value={values.roundSleve}
                          keyboardType="numeric"
                          outLine
                          placeholder="round Sleve"
                        />
                      </View>

                      <View style={styles.colContent}>
                        {/* ...........................................Bottom Measurement ........................................ */}
                        <Text style={styles.lebal}>Trouser/Bottom</Text>
                        <Input
                          onChangeText={handleChange("bottomLenght")}
                          value={values.bottomLenght}
                          keyboardType="numeric"
                          outLine
                          placeholder="Length"
                        />
                        <Input
                          onChangeText={handleChange("waist")}
                          value={values.waist}
                          keyboardType="numeric"
                          outLine
                          placeholder="Waist"
                        />
                        <Input
                          onChangeText={handleChange("laps")}
                          value={values.laps}
                          keyboardType="numeric"
                          outLine
                          placeholder="laps"
                        />
                        <Input
                          onChangeText={handleChange("knee")}
                          value={values.knee}
                          keyboardType="numeric"
                          outLine
                          placeholder="Knee"
                        />
                        <Input
                          onChangeText={handleChange("seat")}
                          value={values.seat}
                          keyboardType="numeric"
                          outLine
                          placeholder="Seat"
                        />

                        <Input
                          onChangeText={handleChange("flap")}
                          value={values.flap}
                          keyboardType="numeric"
                          outLine
                          placeholder="Flap"
                        />
                        <Input
                          onChangeText={handleChange("bottom")}
                          value={values.bottom}
                          keyboardType="numeric"
                          outLine
                          placeholder="Bottom"
                        />
                      </View>
                    </View>
                  </Card>
                  {/* ........................Dealindate........................................... */}
                  <Text style={styles.lebal}>Deadline</Text>
                  <Card>
                    <DateSelector dateValue={text} onChange={setText} />
                  </Card>

                  {/* .......................................Image Selector  */}
                  <Card>
                    <ImageSelector
                      value={imageUri}
                      size={24}
                      color="red"
                      type={!isEdith ? "blue" : ""}
                      imageValue={setImageUri}
                      onChangeText={handleChange("")}
                    >
                      Add Picture
                    </ImageSelector>
                  </Card>
                  {/* ..............................Additional Messages............................................ */}
                  <Text style={styles.lebal}>Additional Message</Text>
                  <Card>
                    <Input
                      onChangeText={handleChange("addMessage")}
                      value={values.addMessage}
                      multiline
                      outLine
                      placeholder="Add a message"
                    />
                  </Card>

                  {loading ? (
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ActivityIndicator size="large" />
                    </View>
                  ) : (
                    <Button
                      onPress={handleSubmit}
                      title="Submit"
                      type={isEdith ? "orange" : "blue"}
                    >
                      {isEdith ? "Update" : "Submit"}
                    </Button>
                  )}
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 15,
    marginRight: 24,
    marginBottom: 8,
  },
  modalContent: {
    flex: 1,
  },
  twoColum: {
    flex: 2,
    flexDirection: "row",
    gap: 8,
  },
  colContent: {
    flexGrow: 1,
  },
  lebal: {
    fontSize: 16,
    fontFamily: "roboto-regular",
    paddingRight: 10,
  },
});
