import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const quizTimelineStyles = StyleSheet.create({
    timeline: {
      marginTop: 3,
      height: "8%",
      paddingLeft: 10,
    },
    timelineBtn: {
      height: "70%",
      width: 50,
      borderRadius: 60,
      marginRight: 20,
    },
    timelineBtnEmpty: {
      borderRadius: 60,
      marginRight: 20,
      borderWidth: 1,
    },
    darktimelineBtnEmpty: {
      borderColor: "#ffffff",
    },
    lighttimelineBtnEmpty: {
      borderColor: "#ffffff",
    },
    timelineBtnHover: {
      width: 50,
      borderRadius: 60,
      marginRight: 20,
    },
    timelineBtnHoverFlag: {
      borderRadius: 60,
      marginRight: 20,
    },
  
    tickBtn: {
      height: "40%",
      width: "40%",
      borderRadius: 50,
      top: -8,
      right: -4,
    },
    tick: {
      height: "45%",
      width: "45%",
    },
    lighttick: {
      tintColor: "#FFFFFF",
    },
  });