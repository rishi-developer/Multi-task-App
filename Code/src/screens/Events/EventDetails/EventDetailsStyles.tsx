import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");


export const eventDetailsStyles = StyleSheet.create({
    netWorkIssueText: {
      padding: 50,
      paddingVertical: height / 3,
    },
    headerContainer: {
      height: height / 4,
      width: "100%",
      top: height / 17.46,
    },
    headerGradient: {
      width: 165,
      height: 166,
      transform: [{ rotate: "90deg" }],
    },
    disableBtnColor: {
      backgroundColor: "grey",
    },
    backHolder: {
      top: "20%",
      left: "5%",
    },
    bodyContainer: {
      paddingTop: 21,
      paddingLeft: 24,
    },
    headingText: {
      fontSize: width / 24.2,
      lineHeight: 22,
      width: 300,
    },
    menuIconContainer: {
      marginRight: width / 15.2,
    },
    dropDownContainer: {
      zIndex: 5,
      width: Platform.OS === "ios" ? 100 : 112,
      height: Platform.OS === "ios" ? 60 : 89,
      borderRadius: 8,
      top: height / 14.5,
      right: width / 18.5,
      elevation: 2,
      paddingLeft: Platform.OS === "ios" ? 0 : 15,
      paddingTop: 21.5,
      paddingBottom: 21.5,
    },
    dropHolder: {
      paddingLeft: Platform.OS === "ios" ? 10 : 0,
      paddingTop: Platform.OS === "ios" ? 10 : 0,
      borderColor: "#498BEA",
      shadowColor: Platform.OS === "ios" ? "" : "rgba(0, 0, 0, 0.1)",
      shadowRadius: 22,
      shadowOffset: { width: 12, height: 4 },
      shadowOpacity: 0.2,
      borderRadius: Platform.OS === "ios" ? 8 : 0,
    },
    dropTextHolder: {
      height: 20,
      marginBottom: 5,
    },
    dropTextSecHolder: {
      height: 25,
      marginBottom: 5,
    },
    dropText: {
      fontWeight: "600",
      fontSize: 11,
      lineHeight: 15,
    },
    dropDeleteText: {
      fontWeight: "600",
      fontSize: 11,
      lineHeight: 15,
      color: "#E83A50",
    },
    eventTimeContainer: {
      paddingTop: 10,
    },
    eventText: {
      fontSize: 13,
      fontWeight: "400",
    },
    eventdescContainer: {
      paddingTop: 15,
      paddingRight: width / 12,
    },
    eventdescText: {
      fontSize: 11,
      color: "#4D5157",
    },
    seperator: {
      marginTop: 20,
      borderBottomColor: "rgba(0, 0, 0, 0.15)",
      borderBottomWidth: 0.8,
    },
    attendeesContainer: {
      paddingTop: 20,
      paddingLeft: 24,
      height: height / 2.3,
    },
    downloadAttendees: {
      width: 30,
      height: 30,
      borderRadius: 20,
      marginLeft: width / 44,
      borderWidth: 1,
      borderColor: "green",
      justifyContent: "center",
      alignItems: "center",
    },
    numberofattendees: {
      width: 30,
      height: 30,
      borderRadius: 20,
      marginLeft: width / 44,
      justifyContent: "center",
      alignItems: "center",
    },
    search: {
      width: 30,
      height: 30,
      right: width / 20,
      top: 2,
    },
    attendeeBody: {
      marginTop: 19,
      height: height / 2.5,
    },
    scanBtnHolder: {
      paddingHorizontal: 20,
      position: "absolute",
      bottom: Platform.OS === "android" ? height / 15 : height / 10,
      width: "100%",
    },
    scanBtn: {
      width: "100%",
      height: 29,
      padding: 5,
      borderRadius: 6,
    },
    scanBtnText: {
      fontSize: 14,
    },
    noResultsText: {
      marginTop: height / 5,
      paddingLeft: width / 3.2,
    },
    warning_modal: {
      width: "86%",
      height: height / 4.5,
      borderRadius: 7,
    },
    modal_heading: {
      overflow: "hidden",
      borderRadius: 7,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      height: "30%",
      paddingLeft: "5%",
    },
    modal_body: {
      margin: "5%",
    },
    text: {
      fontSize: width / 26,
      marginBottom: 15,
    },
    textheading: {
      fontSize: width / 18,
      marginLeft: "10%",
      bottom: "16%",
    },
    textYes: {
      fontSize: width / 22,
      margin: "5%",
      marginRight: 20,
      marginBottom: "0%",
      fontWeight: "bold",
      borderRadius: 4,
      height: height / 21.5,
      width: width / 5.8,
    },
    textNo: {
      fontSize: width / 22,
      marginTop: "7%",
      color: "grey",
      borderWidth: 2,
      borderColor: "#498BEA",
      height: height / 21.5,
      width: width / 5.8,
      fontWeight: "bold",
      borderRadius: 4,
    },
    exclamationMark: {
      top: "30%",
    },
  });
  