import { StyleSheet,Dimensions } from "react-native";
const { height } = Dimensions.get("screen");

export const detailScreenFilesStyles = StyleSheet.create({
    body: {
      width: "86%",
    },
    darkThemeCardShadow: {
      shadowColor: "rgba(0, 0, 0, 0.6)",
    },
    lightThemeCardShadow: {
      shadowColor: "rgba(20, 20, 20, 0.02)",
    },
    mainContainer: {
      shadowRadius: 10,
      shadowOffset: { width: 1, height: 4 },
    },
    container: {
      width: "100%",
      marginTop: 13,
      elevation: 4,
      height: 59,
      borderRadius: 10,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      borderWidth: 1,
      borderColor: "#E0E6EF",
    },
    cardimg: {
      width: "15%",
      paddingLeft: 9,
    },
    cardinfo: {
      paddingLeft: 10,
      width: "74%",
    },
    circle: {
      width: 34,
      height: 34,
      borderRadius: 10,
    },
    cardTitle: {
      fontStyle: "normal",
    },
    resultNotFound: {
      marginBottom: height / 50.235,
      height: height / 1.45,
    },
    noResultFoundText: {
      fontWeight: "500",
    },
  });
  