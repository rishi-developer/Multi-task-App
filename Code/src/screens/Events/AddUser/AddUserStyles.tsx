import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");

export const addUserStyles = StyleSheet.create({
    darkBackgroundList: {
      borderWidth: 0,
    },
    guestFormHeading: {
      zIndex: 1,
      flex: 0.7,
    },
    backArrow: {
      paddingLeft: 25,
    },
    BoxConatiner: {
      flex: 8,
    },
    guestFormHeadingText: {
      padding: 15,
      fontSize: height / 50,
      width: width,
    },
    textInputStyling: {
      height: Platform.OS == "android" ? 35 : 40,
      borderRadius: 5,
      padding: 10,
      fontSize: height / 60,
      marginHorizontal: 15,
    },
    content: {
      fontSize: height / 60,
      marginBottom: 10,
      paddingTop: 10,
      paddingLeft: 15,
    },
    eventSEarchBarBox: {
      marginTop: 10,
    },
    selectAllBtn: {
      padding: 10,
      marginRight: 10,
    },
    selectAllBtnText: {
      color: "#007AFF",
      marginHorizontal: 7,
    },
    selectAllBtnCheckBox: {
      height: height / 70,
      width: height / 70,
      borderWidth: 1,
      borderColor: "grey",
      marginTop: 4,
    },
    content2: {
      marginBottom: 0,
    },
    error: {
      marginBottom: 0,
      paddingTop: 0,
      color: "red",
    },
    btnContainer: {
      flex: 1.4,
    },
    btnCntr: {
      width: width / 1.3,
      height: 29,
      borderRadius: 6,
      margin: 10,
    },
    arrowDown: {
      right: height / 40,
      padding: 10,
      height: 15,
      width: 15,
      margin: 7,
    },
    filterEventCntr: {
      padding: 15,
      marginTop: 10,
    },
    filterEventItem: {
      width: "29%",
      height: 26,
      borderRadius: 6,
      shadowColor: "rgba(0, 0, 0, 0.3);",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 10,
      elevation: 5,
      shadowRadius: 10,
    },
    filterEventName: {
      fontSize: 10,
    },
    lightText: {
      color: "rgba(0, 0, 0, 0.6)",
    },
    darkText: {
      color: "rgba(209, 208, 208, 0.8)",
    },
    EventContainer: {
      height: 96,
      marginBottom: 21,
      borderRadius: 10,
      width: "90%",
      elevation: 2,
      shadowColor: "rgba(166, 163, 163, 0.3);",
      shadowOpacity: 10,
      shadowOffset: { width: 4, height: 10 },
      shadowRadius: 16,
      borderColor: "#F4F4F4",
      borderWidth: 1,
    },
    CardTextCntr: {
      width: "74%",
    },
    cardTimeCntr: {
      width: "85%",
    },
    venueText: {
      fontSize: 11,
      lineHeight: 14.3,
      marginLeft: 6.75,
    },
    eventName: {
      fontSize: 13,
      marginVertical: 7,
    },
    chkBoxConatiner: {
      width: "25%",
    },
    checkedChkBOxEvent: {
      height: height / 30,
      width: height / 30,
      marginVertical: height / 30,
      borderWidth: 0,
      right: 10,
      borderRadius: 5,
    },
    chkBoxStyle: {
      height: "70%",
      width: "70%",
    },
    chkBoxStyleNotChecked: {
      borderWidth: 0,
    },
    chkBoxEvent: {
      height: height / 30,
      width: height / 30,
      marginVertical: height / 30,
      right: 10,
      justifyContent: "center",
      borderRadius: 5,
    },
    chkBoxEventDark: {
      backgroundColor: "#979798",
    },
    chkBoxEventlight: {
      backgroundColor: "#F0F1F4",
    },
    detailModal: {
      minHeight: height / 3,
      width: width / 1.05,
    },
    topHeadingModal: {
      padding: 15,
      backgroundColor: "#E2FFDA",
    },
    topWarningModal: {
      backgroundColor: "#F4E0E2",
    },
    warningICon: { marginTop: 3 },
    TickBtn: {
      height: height / 20,
      width: height / 20,
    },
    guestAddedModalHeading: {
      width: "70%",
      fontSize: height / 33,
      color: "#02BC7D",
      padding: 3,
    },
    warnigHeadingText: {
      color: "#FF6174",
    },
    cancelBtnModal: {
      padding: 3,
    },
    userNameModal: {
      fontSize: height / 40,
      padding: 15,
    },
    infoAlreadyPresent: {
      fontSize: height / 48,
    },
    userEmailModalBox: {
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    userNameHeading: {
      fontSize: height / 60,
      color: "black",
    },
    userDetailsModal: {
      fontSize: height / 65,
    },
    userEmailText: {
      fontSize: height / 60,
      paddingVertical: 5,
    },
    copyBar: {
      padding: 15,
    },
    copyBarBtn: {
      margin: 10,
    },
    answerBoxModal: {
      padding: 20,
      marginTop: 10,
    },
    btnToConfirm: {
      marginHorizontal: 10,
      backgroundColor: "#007AFF",
      borderRadius: 8,
      padding: 10,
    },
    btnToCancel: {
      marginHorizontal: 10,
      borderRadius: 8,
      padding: 10,
      borderWidth: 1,
      borderColor: "#F63958",
    },
    CancelText: {
      color: "#F63958",
    },
    loaderStyle: {
      height: height,
      width: width,
      backgroundColor: "grey",
    },
    activityIndicator:{
      alignSelf: "center", 
      top: height / 2
    }
  });
  