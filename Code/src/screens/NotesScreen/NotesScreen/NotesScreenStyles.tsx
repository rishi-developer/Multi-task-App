import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const notesScreenStyles = StyleSheet.create({
    container: {
      paddingTop: height / 15,
    },
    icon: {
      bottom: height / 8,
    },
    btnContainer: {
      borderRadius: 6,
      width: width / 3.473,
      height: height / 25.897,
    },
    selectBtn: {
      fontSize: width / 20,
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
    mainContainer: {
      height: "10%",
      marginVertical: 15,
    },
    resultNotFound: {
      marginBottom: height / 50.235,
      height: height / 1.45,
    },
    noResultFoundText: {
      fontWeight: "500",
    },
    noteContainer: {
      height: "77.5%",
    },
    noteCard: {
      width: "10%",
      height: "30%",
      left: "43%",
    },
    noteImage: {
      tintColor: "#498BEA",
      width: 61,
      height: 64,
    },
    scrollviewConatiner: {
      height: height,
    },
    exclamationMark: {
      top: "30%",
    },
    pageInfo: {
      height: 29,
      lineHeight: 22,
      fontSize: width / 22,
    },
  });