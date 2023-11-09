import { StyleSheet, Dimensions, Platform } from "react-native";


export const attendeesListStyles = StyleSheet.create({
    attContainer: {
      marginTop: 3,
      width: "93%",
      height: 65,
      marginRight: 10,
      elevation: 6,
      borderRadius: 10,
      marginBottom: 12,
      marginLeft: 2,
    },
    attCardHolder: {
      padding: 10,
      borderRadius: 10,
      borderColor: Platform.OS === "ios" ? "rgba(0,0,0,0.1)" : "#498BEA",
      borderWidth: Platform.OS === "ios" ? 0.2 : 0,
      shadowColor: "rgba(0,0,0,0.1)",
      shadowRadius: Platform.OS === "ios" ? 5 : 10,
      shadowOffset:
        Platform.OS === "ios" ? { width: 2, height: 4 } : { width: 0, height: 4 },
      shadowOpacity: Platform.OS === "ios" ? 1 : 0,
      flexDirection: "row",
    },
    imgContainer: {
      height: 41,
      width: 41,
      padding: 5,
    },
    attImage: {
      height: 35,
      width: 35,
      borderRadius: 30,
    },
    attContent: {
      marginLeft: "5%",
    },
    attTitleContainer: {
      padding: 2,
    },
    attTitleText: {
      fontSize: 11,
      lineHeight: 17,
    },
    desigText: {
      color: "#979797",
      fontSize: 10,
      lineHeight: 17,
    },
    renderLoader: {
      paddingBottom: 50,
    },
  });
  