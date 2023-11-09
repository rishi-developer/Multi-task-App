import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");

export const guestLoginStyles = StyleSheet.create({
    body: {
      backgroundColor: "transparent",
    },
    background: {
      left: 5,
    },
    logo: {
      width: 250,
      height: 45.63,
    },
    closeBtn: {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: Platform.OS == "android" ? 0 : 10,
    },
    formCntr: {
      height: "90%",
    },
    btnContainer: {
      backgroundColor: "transparent",
      marginTop: 60,
    },
    EmailField: {
      padding: 10,
      backgroundColor: "transparent",
    },
    Input: {
      borderWidth: 1,
      borderColor: "lightgray",
      height: 55,
      width: 360,
      borderRadius: 15,
      padding: 15,
    },
    ContinuebtnContainer: {
      marginTop: 20,
    },
    buttonCtn: {
      backgroundColor: "#205072",
      padding: 10,
      width: 218,
      height: 45,
      borderRadius: 12,
    },
    leftArrow: {
      fontSize: width / 19.2,
    },
    btnText: {
      fontSize: 16,
      fontWeight: "600",
    },
    errInputCntr: { borderColor: "#FF2828", borderWidth: 1 },
    errMsg: {
      color: "#FF2828",
      marginVertical: 6,
      paddingLeft: 6,
    },
    headView:{
      height: height * 1.02
    }
  });