import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment/moment";

import Color from "../styles/colorStyle";

export default function DateSelector({
  setFieldValue,
  dateValue,
  onChange,
  ...props
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  //const [text, setText] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date = { dateValue }) => {
    hideDatePicker();
    onChange(date);
    //setFieldValue(dateValue);
  };

  //  console.log(dateValue);
  return (
    <>
      <TouchableOpacity onPress={showDatePicker} style={styles.outLined}>
        <MaterialIcons name="calendar-today" size={24} color={Color.gray} />
        <Text style={styles.text}>{moment(dateValue).format("ll")}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}

const styles = StyleSheet.create({
  outLined: {
    borderColor: Color.midGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 14,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: Color.gray,
    fontSize: 18,
  },
});
