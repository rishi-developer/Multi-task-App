import { StyleSheet,  Dimensions} from "react-native";
const height = Dimensions.get("window").height;

export const eventDropDownStyles = StyleSheet.create({
    guestDropControl: {
      borderWidth: 1,
      top: -18,
      borderColor: "#ECEDF1CC",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      padding: 8,
      elevation: 2,
    },
    dropDownCntr: {
      borderWidth: 1,
      top: -18,
      borderColor: "#ECEDF1CC",
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      padding: 8,
      elevation: 2,
    },
    contentHolder: {
      borderColor: "#498BEA",
      shadowColor: "rgba(0,0,0,0.1)",
      shadowRadius: 22,
      shadowOffset: { width: 12, height: 4 },
      shadowOpacity: 0.2,
      height: height / 30,
    },
    dropDownText: {
      paddingLeft: 8,
    },
    checkboxHolder: {
      paddingBottom: 5,
    },
  });
  