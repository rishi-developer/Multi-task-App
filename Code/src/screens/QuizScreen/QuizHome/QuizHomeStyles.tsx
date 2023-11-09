import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");


export const quizHomeStyles = StyleSheet.create({
    lightquizhometext: {
      color: "rgba(35, 31, 32, 0.4)",
    },
    header: {
      height: 152,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      shadowColor: "rgba(145, 135, 230, 0.8)",
      shadowOffset: {
        width: 4,
        height: 10,
      },
      shadowOpacity: 0.85,
      shadowRadius: 34,
      elevation: 11,
    },
    headerContainer: {
      height: 50,
      top: 14,
      width: "90%",
    },
    UserImage: {
      width: 50,
    },
    welcomeBar: {
      width: "75%",
      marginLeft: 10,
    },
    welcomeText: {
      width: "80%",
    },
    closeBtn: {
      width: "20%",
      borderRadius: 8,
      elevation: 5,
      shadowOpacity: 0.08,
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowColor: "rgba(59, 44, 166, 0.6)",
    },
    dashboard: {
      height: "11%",
      paddingLeft: 10,
      left: 15,
    },
    dashboardBox: {
      width: 100,
      height: 95,
      borderRadius: 15,
      marginRight: 25,
    },
    lightdashboardBox: {
      borderWidth: 5,
      borderColor: "#fff",
      shadowColor: "rgba(145, 135, 230, 0.8)",
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      elevation: 11,
    },
    lightdashboardBoxIos: {
      shadowOpacity: 0.52,
    },
    darkdashboardBox: {
      elevation: 11,
    },
    footer: {
      height: 348,
    },
    quizConfirmModalContainer: {
      bottom: 0,
    },
    finalStartBtn: {
      height: 40,
      width: "70%",
      borderRadius: 10,
      marginTop: "6%",
    },
    circle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      paddingTop: 10,
      top: "8%",
    },
    lightLogoBackground: {
      backgroundColor: "rgba(145, 135, 230, 0.15)",
    },
    circle1: {
      width: 30,
      height: 30,
      borderRadius: 17,
    },
    circledata: {
      fontWeight: "bold",
    },
    userImg: {
      width: 50,
      height: 50,
      borderRadius: 100,
      borderWidth: 3,
      borderColor: "#FFFFFF",
    },
    userName: {
      fontStyle: "normal",
      fontSize: 22,
      lineHeight: 26.82,
    },
    backBtnArea: {
      bottom: height / 4.0,
      height: height / 18,
      width: width / 6,
      marginLeft: "4%",
      justifyContent: "center",
      alignItems: "center",
    },
    backBtn: {
      borderLeftWidth: 3,
      borderBottomWidth: 3,
      borderBottomColor: "white",
      borderLeftColor: "white",
      borderRadius: 2,
      width: 15,
      height: 15,
      transform: [{ rotate: "45deg" }],
    },
    quizhomedesign: {
      top: height / 12,
      overflow: "hidden",
    },
    quizhometext: {
      marginLeft: 20,
      marginVertical: 10,
    },
    quizHomeText: {
      marginLeft: 20,
    },
    quizhomemaintext: {
      marginTop: 30,
    },
    secondBoxContainer: {
      marginBottom: 10,
    },
    dashboardText: {
      marginTop: "18%",
    },
    iconimage: {
      height: 25,
      width: 25,
    },
    dashboardtext: {
      fontSize: 16,
      marginHorizontal: 25,
      marginVertical: 25,
    },
    blank: {
      height: 40,
      width: 40,
    },
    welcome: {
      fontWeight: "500",
      fontSize: 20,
    },
    startquiz: {
      paddingLeft: 10,
    },
    popup: {
      bottom: height / 75,
    },
    designquiztext: {
      fontSize: 20,
      left: 32,
      bottom: "5%",
    },
    pointsview: {
      left: 32,
      bottom: "5%",
    },
    imagepointsview: {
      width: 120,
      height: 39,
      borderRadius: 10,
    },
    pointstext: {
      paddingLeft: 4,
    },
    timerview: {
      backgroundColor: "rgba(75, 255, 178, 0.43)",
      width: 120,
      height: 39,
      borderRadius: 10,
      marginLeft: 16,
    },
    timertext: {
      paddingLeft: 4,
    },
    modalwelcometext: {
      fontWeight: "300",
      width: "78%",
      left: 32,
      lineHeight: 23.45,
    },
    rules: {
      left: 32,
      marginTop: "5%",
    },
    rulesview1: {
      width: "88%",
      left: 30,
      marginTop: "3.8%",
      height: 40,
    },
    rule1: {
      width: "83%",
      marginLeft: 22,
    },
    polygon: {
      width: 16,
      height: 16,
    },
    noquizview: {
      marginTop: "20%",
      marginBottom: "20%",
    },
    popupimage: {
      top: "25%",
      right: width / 200,
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
      fontWeight: "bold",
      borderRadius: 4,
      height: height / 21.5,
      width: width / 5.8,
    },
    pointsandtimerimage: {
      height: 18,
      width: 18,
    },
    splashtext: {
      top: height / 2.6,
      left: width / 4.5,
    },
  });