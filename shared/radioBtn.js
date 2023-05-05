import React, { useState } from "react";
import RadioGroup from "react-native-radio-buttons-group";
import { color } from "react-native-reanimated";
import Color from "../styles/colorStyle";

export default function RadioBtn({ male }) {
  const [radioButtons, setRadioButtons] = useState([
    {
      id: "1", // acts as primary key, should be unique and non-empty string
      label: "Male",
      value: "male",
      selected: true,
      borderSize: 1,
      color: Color.blue,
      size: 20,
    },
    {
      id: "2",
      label: "Female",
      value: "female",
      borderSize: 1,
      color: Color.blue,
      size: 20,
    },
  ]);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
    // console.log(radioButtons[0].selected);
    male(radioButtons[0].selected);
  }

  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={onPressRadioButton}
      layout="row"
    />
  );
}
