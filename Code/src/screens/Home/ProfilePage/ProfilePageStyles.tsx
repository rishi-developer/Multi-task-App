import { StyleSheet, Dimensions } from "react-native";
let { height, width } = Dimensions.get("screen");

export const profilePageStyles = StyleSheet.create({
    navbar: {
      paddingTop: height / 25,
    },
    lightcontactDetails: {
      backgroundColor: "pink",
    },
    darkcontainer1: {
      borderColor: "#2E343C",
    },
    lightcontainer1: {
      borderColor: "#498BEA",
    },
    mainContainer: {
      backgroundColor: "blue",
    },
    container1: {
      borderRadius: 10,
      padding: 10,
    },
    backBtnCntr: {
      width: width / 5.68,
      height: height / 15.39,
    },
    backBtn: { fontSize: width / 18.33 },
    userDetailsCntr: {
      marginTop: height / 76.2,
    },
    noDataFoundBox: {
      marginTop: height / 7.2,
      height: height / 10,
    },
    contactDetails: {
      shadowRadius: 3,
      shadowOpacity: 0.2,
      shadowOffset: { width: -2, height: 4 },
      borderRadius: 10,
      borderColor: "#498BEA",
      width: "90%",
      height: "20%",
      marginTop: height / 70.7,
      bottom: height / 10.2,
    },
    contact: {
      marginLeft: width / 34.9,
      width: "90%",
      bottom: "5%",
    },
    department: {
      top: "4%",
      marginLeft: width / 34.9,
      width: "90%",
    },
    profilePageCntr: {
      height: height / 6.5,
      top: height / 55,
    },
    warningIcon: {
      top: "30%",
    },
    infoDataMail1: {
      fontSize: width / 29.5,
    },
    infoDataContact: {
      left: width / 48,
      fontSize: width / 30.6,
      marginBottom: height / 85.4,
    },
    infoDataDepart: {
      left: width / 10,
      width: "auto",
      fontSize: width / 30.6,
    },
    headerContainer: {
      marginTop: "1%",
    },
    userDetails: {
      height: "40%",
    },
    logoutCntr: {
      height: "10%",
      bottom: height / 15.7,
    },
    logoutBtn: {
      borderRadius: 6,
      width: width / 2.473,
      height: height / 18.897,
      backgroundColor: "#B22222",
    },
    logoutText: {
      fontSize: width / 20,
    },
    infoNum: {
      fontSize: width / 27.6,
    },
    infoDepart: {
      textAlign: "justify",
      fontSize: width / 27.6,
    },
    textOk: {
      fontWeight: "bold",
    },
    container: {
      height: "60%",
    },
    bgImg1: {
      width: height / 5.206,
      height: height / 5.206,
    },
    bgImg2: {
      width: height / 5.718,
      height: height / 5.718,
      top: height / 122,
    },
    pageInfo: {
      fontSize: width / 18.2,
      fontWeight: "600",
      left: width / 6.65,
      width: width / 2,
    },
    userImg: {
      width: height / 6.545,
      height: height / 6.545,
      marginVertical: height / 65.7,
      borderRadius: 100,
      top: height / 284.6,
    },
    userName: {
      fontStyle: "normal",
      fontSize: width / 18.6,
      height: height / 24.4,
    },
    userDescription: {
      fontStyle: "normal",
      fontSize: width / 21.6,
      fontWeight: "500",
      marginBottom: height / 85.4,
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
      borderWidth: 2,
      borderColor: "#498BEA",
      backgroundColor: "#498BEA",
      color: "white",
      fontWeight: "bold",
      borderRadius: 4,
      height: height / 21.5,
      width: width / 5.8,
      justifyContent: "center",
      alignContent: "center",
    },
    startQuizCnt: {
      marginTop: height / 85.4,
      width: width,
    },
    startQuizBtn: {
      borderColor: "#fafafa",
      padding: 6,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    accountView:{
      height: height
    },
    noData:{
      width: width,
    }
  });