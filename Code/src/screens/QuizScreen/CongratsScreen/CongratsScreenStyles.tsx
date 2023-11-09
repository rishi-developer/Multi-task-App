import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("screen");

export const congratsScreenStyles = StyleSheet.create({
    goback: {
      borderRadius: 8,
      width: "80%",
      height: "28%",
      borderColor: "#9187E6",
      borderWidth: 1,
    },
    viewstats: {
      borderRadius: 8,
      width: "80%",
      height: "28%",
    },
    correct: {
      borderRadius: 10,
      width: "41%",
    },
    incorrect: {
      borderRadius: 10,
      width: "41%",
    },
    trophy: {
      width: "90%",
    },
    participatingtext: {
      top: height / 4.7,
      fontWeight: "300",
      lineHeight: 18.83,
    },
    textcorrect: {
      color: "rgba(33, 39, 46, 0.59)",
      paddingTop: "2.5%",
    },
    correctscore: {
      color: "#515853",
      paddingBottom: "2.5%",
    },
    textincorrect: {
      color: "rgba(33, 39, 46, 0.59)",
      paddingTop: "2%",
    },
    incorrectscore: {
      color: "#515853",
      paddingBottom: "2.5%",
    },
    detailedandhomenav: {
      width: "85%",
      height: height / 5,
      top: height / 4.2,
    },
    correctincorrectview: {
      width: "70%",
      height: height / 12,
      top: height / 4.2,
    },
    trophyview: {
      height: height / 5,
      top: height / 5.9,
    },
    yougotpoints: {
      top: height / 5.0,
      flexDirection: "row",
    },
    lighttext: {
      color: "#DADADA",
    },
  });