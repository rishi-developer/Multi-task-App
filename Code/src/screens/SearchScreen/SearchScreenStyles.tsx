import { StyleSheet, Dimensions  } from "react-native";
const { height, width } = Dimensions.get("window");

export const searchScreenStyles = StyleSheet.create({
    container: {
      height: height,
      paddingTop: height / 15,
    },
    showhistory: {
      width: "90%",
      borderBottomWidth: 1,
      height: 35,
      left:"1%",
    },
    darkThemeShowHistory: {
      borderBottomColor: "#1B1F23",
    },
    lightThemeShowHistory: {
      backgroundColor: "rgba(237, 237, 237, 0.3)",
      borderBottomColor: "#EBEEF2",
    },
    name: {
      left: 20,
    },
    resultsview: {
      height: "90%",
    },
    text: {
      height: "90%",
    },
    pageInfo: {
      height: 29,
      lineHeight: 22,
      fontSize: width / 22,
    },
  });