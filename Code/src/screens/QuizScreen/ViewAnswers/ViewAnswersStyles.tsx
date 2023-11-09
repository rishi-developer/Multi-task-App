import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("screen");


export const viewAnswersStyles = StyleSheet.create({
    secondmargin: {
      borderBottomWidth: 1,
      marginRight: 26,
      marginLeft: 26,
      marginTop: 5,
    },
    darksecondmargin: {
      borderBottomColor: "#C6C2C2",
    },
    lightsecondmargin: {
      borderBottomColor: "#EBEEF2",
    },
    scrollview: {
      height: "88%",
    },
    icon: {
      height: 16,
      width: 16,
      top:height/80,
      left:height/80,
    },
    close:{
      height: 40,
      width: 40,
    },
    header: {
      marginTop: "10%",
      height: 40,
      width: "85%",
    },
    noquestionsselected: {
      top: height / 2.5,
      fontWeight: "500",
    },
  });