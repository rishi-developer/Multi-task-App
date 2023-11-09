import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("screen");

export const eventFieldsStyles = StyleSheet.create({
    content: {
      fontSize: 13,
      marginBottom: 17,
    },
    darkThemeBackground: {
      backgroundColor: "#D1D0D0",
    },
    required: {
      color: "red",
    },
    textInputStyling: {
      height: height / 22,
      borderWidth: 1,
      marginBottom: 15,
      borderColor: "lightgrey",
      borderRadius: 5,
      padding: 10,
      justifyContent: "center",
      color: "black",
      backgroundColor: "rgba(236, 237, 241, 0.8);",
    },
    errBox: {
      borderColor: "#FF2828",
      marginBottom: 6,
    },
    dropIconContainerLight: {
      backgroundColor: "rgba(236, 237, 241, 1);",
    },
    dropIconContainer: {
      top: "4%",
      width: "19%",
      paddingTop: 7,
      paddingLeft: 26,
      left: "81%",
      zIndex: 3,
      height: 32,
      borderRadius: 2,
      opacity: 1,
    },
    calendarPos: {
      left: -20,
      marginTop: 11,
    },
    fieldButton: {
      height: height / 22,
      width: 40,
      left: "88.5%",
      borderTopRightRadius: 5,
      borderBottomRightRadius: 5,
      paddingLeft: 13,
      paddingTop: height / 22 / 2.7,
    },
    errText: {
      fontSize: 14,
      color: "#FF2828",
      marginBottom: 15,
    },
    onDescChange: {
      height: 110,
      borderWidth: 1,
      marginBottom: 18,
      borderColor: "lightgrey",
      borderRadius: 5,
      fontSize: 14,
      textAlignVertical: "top",
      padding: 10,
      backgroundColor: "rgba(236, 237, 241, 0.8);",
    },
    dateStyle: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignContent: "center",
    },
  });
  