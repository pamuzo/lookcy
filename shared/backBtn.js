import { StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, CommonActions } from "@react-navigation/native";
import Color from "../styles/colorStyle";

export default function BackBtn({ title, resetInput }) {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="arrow-back-ios"
        size={28}
        onPress={goBack}
        color={Color.blue}
        style={styles.icon}
      />
      <View>
        <Text style={styles.txtHeader}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingButtom: 5,
    backgroundColor: Color.white,
    borderBottomWidth: 1,
    borderBottomColor: Color.midGray,
  },
  txtHeader: {
    fontFamily: "roboto-regular",
    fontWeight: "bold",
    fontSize: 20,
    color: Color.blue,
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 10,
  },
});
