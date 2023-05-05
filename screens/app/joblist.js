import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { colRef, auth, db } from "../../config/firebase";

import moment from "moment";
//shered components

import JobModal from "./jobModal";
import BackBtn from "../../shared/backBtn";
import Card from "../../shared/card";
import Plusicon from "../../shared/plusicon";
import { globalStyles } from "../../styles/globalStyle";
import Color from "../../styles/colorStyle";

export default function Joblist({ navigation }) {
  const [jobList, setJobList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isEdith, setIsEdith] = useState(false);
  const [jobNum, setJobNum] = useState("");

  //collecting the data from firebase
  useEffect(() => {
    const getJoblist = onSnapshot(
      collection(db, "user", auth.currentUser.uid, "customerInfor"),
      (snapshot) => {
        let customerinfor = [];
        snapshot.docs.forEach((doc) => {
          customerinfor.push({ ...doc.data(), id: doc.id });
        });
        setJobList(customerinfor);
        setJobNum(customerinfor.length);
        setOpenModal(false);
      }
    );
    return () => {
      getJoblist();
    };
  }, []);

  //when the plus button is clicked..... to Add new job
  const newJob = () => {
    setOpenModal(true);
    setIsEdith(false);
  };

  // to handle the submited value
  const handleSubmit = (values) => {
    //console.log(values);
  };

  const daysLeft = (item) => {
    return Math.round(
      (item.deadLineDate.toDate() - new Date()) / (1000 * 60 * 60 * 24)
    );
  };

  // to handle the update input
  const passDataToModal = (item) => {
    setIsEdith(true);
    setModalData(item);
    setOpenModal(true);
  };

  const measuredDetails = (measuremnt) => {
    navigation.navigate("JobDetail", { measuremnt });
  };
  return (
    <View style={styles.container}>
      <BackBtn title={"Job List"} />
      <View
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          zIndex: 1,
        }}
      >
        <Plusicon onPress={newJob} />
      </View>

      <Text
        style={{
          paddingRight: 20,
          textAlign: "right",
          fontSize: 18,
          color: Color.blue,
        }}
      >
        Total Jobs <Text style={{ fontWeight: "bold" }}>{jobNum}</Text>
      </Text>

      <View style={{ flex: 1 }}>
        <FlatList
          data={jobList}
          renderItem={({ item }) => (
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
              <View>
                <TouchableOpacity
                  style={styles.updateBtn}
                  onPress={() => {
                    passDataToModal(item);
                  }}
                >
                  <Text style={styles.bgTxt}>Update</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    measuredDetails(item);
                  }}
                >
                  <Card>
                    <View
                      style={{
                        ...globalStyles.twoColum,
                        justifyContent: "flex-start",
                      }}
                    >
                      <Image
                        source={
                          !item.image
                            ? require("../../assets/noImage.png")
                            : { uri: item.image }
                        }
                        style={{
                          width: 100,
                          height: 100,
                          resizeMode: "cover",
                        }}
                      />

                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            color: Color.blue,
                            fontFamily: "roboto-regular",
                          }}
                        >
                          {item.customerName}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: Color.blue,
                            fontFamily: "roboto-regular",
                          }}
                        >
                          {item.phoneNumber}
                        </Text>

                        <View style={globalStyles.hrLine} />
                        <Text>{`${moment(item.deadLineDate?.toDate()).format(
                          "LL"
                        )}`}</Text>

                        <Text
                          style={
                            daysLeft(item) <= 0
                              ? { color: "red", fontWeight: "bold" }
                              : "" || daysLeft(item) <= 2
                              ? { color: "green", fontWeight: "bold" }
                              : ""
                          }
                        >{`${
                          daysLeft(item) <= 0 ? 0 : daysLeft(item)
                        } Days Left`}</Text>
                      </View>
                    </View>
                  </Card>
                </TouchableOpacity>
              </View>
            </View>
          )}
          ListFooterComponent={() => (
            <View>
              <JobModal
                visible={openModal}
                onClose={() => setOpenModal(false)}
                onSubmit={handleSubmit}
                mesurement={modalData}
                isEdith={isEdith}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
