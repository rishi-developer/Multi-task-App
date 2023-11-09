import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const detailedStatsStyles = StyleSheet.create({
    container: {
      marginRight: 20,
    },
    questions: {
      left: 26,
      marginTop: 20,
      width: "90%",
    },
    correctanswer1: {
      width: "87%",
      borderRadius: 8,
      left: 26,
      marginTop: 20,
      paddingBottom: 10,
      paddingTop: 10,
    },
    correctanswerstext1: {
      marginLeft: 30,
      width: "70%",
    },
    correctanswers2: {
      width: "87%",
      borderRadius: 8,
      left: 26,
      marginTop: 20,
      paddingBottom: 10,
      paddingTop: 10,
    },
    correctanswerstext2: {
      marginLeft: 30,
      width: "70%",
    },
    useranswer: {
      width: "87%",
      borderRadius: 8,
      left: 26,
      marginTop: 20,
      paddingBottom: 10,
      paddingTop: 10,
    },
    useranswertext: {
      marginLeft: 30,
      width: "70%",
    },
    icon: {
      height: 20,
      width: 18,
    },
    iconCorrect: {
      height: 20,
      width: 80,
    },
    correctImg: {
      width: "20%",
    },
    wrongImg: {
      width: "20%",
    },
  });