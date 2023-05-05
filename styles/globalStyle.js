import { StyleSheet } from "react-native";
import Color from "./colorStyle";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  twoColum: {
    flex: 2,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  hrLine: {
    borderBottomWidth: 0.5,
    borderColor: Color.gray,
    marginBottom: 5,
    marginTop: 5,
  },
  txtHeading: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "roboto-regular",
    paddingBottom: 10,
    paddingTop: 10,
  },
  btnSmall: {
    marginBottom: 3,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Color.blue,
    padding: 6,
    borderRadius: 7,
    alignSelf: "flex-end",
    //alignSelf: "center",
  },
  btnTextIcon: {
    //width: "30%",
    borderRadius: 6,
    padding: 6,
    gap: 2,
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "row",
    backgroundColor: Color.red,
    marginBottom: 10,
  },
});
