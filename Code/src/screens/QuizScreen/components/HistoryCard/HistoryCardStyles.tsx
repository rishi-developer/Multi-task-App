import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const historyCardStyles = StyleSheet.create({
    givenQuizContainer: {
      borderWidth: 1,
      borderRadius: 10,
      borderColor: "#F4F4F4",
      width: "88%",
      height: 163,
      marginBottom: 15,
      marginTop: 15,
      shadowColor: "rgba(145, 135, 230, 0.4)",
      shadowOffset: { width: 4, height: 10 },
      shadowOpacity: -10,
      shadowRadius: 26,
      elevation: 10,
    },
    darkThemeQuizContainer: {
      shadowColor: "rgba(0, 0, 0, 0.6)",
      borderColor: "#2E343C",
    },
    lightThemeQuizContainer: {
      shadowColor: "rgba(145, 135, 230, 0.4)",
      borderColor: "#F4F4F4",
    },
    spacingAfterPoints: {
      height: "10%",
    },
    header: {
      height: "60%",
    },
    pointsBox: {
      width: "33%",
      height: "15%",
      borderRadius: 5,
      top: -15,
      right: 2,
    },
    smallDiamond: {
      width: "70%",
      height: "70%",
      borderRadius: 50,
    },
    smallDiamondContainer: {
      width: "25%",
      borderRadius: 50,
    },
    pointData: {
      fontSize: 13,
    },
    imageContainer: {
      width: "35%",
    },
    imageBox: {
      width: "75%",
      borderRadius: 10,
    },
    quizNameTimeTakenQuestionContainer: {
      width: "65%",
    },
    quizComponentField: {
      padding: 5,
    },
    quizNameTimeTakenQuestionTitle: {
      width: "45%",
      fontSize: 12,
    },
    quizNameTimeTakenQuestionData: {
      width: "55%",
      fontSize: 12,
      lineHeight: 15.4,
    },
    questionStatusBar: {
      width: "50%",
      height: 16,
      borderRadius: 3,
    },
    questionStatusBarData: {
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
    },
    participatedQuizButtons: {
      height: "30%",
      paddingLeft: "35%",
    },
    viewStatsBtn: {
      borderWidth: 1,
      width: "50%",
      height: "60%",
      borderRadius: 3,
      borderColor: "#9187E6",
    },
    lightThemeStatBtn: {
      backgroundColor: "white",
    },
    viewStatsBtnText: {
      fontSize: 12,
      fontWeight: "600",
    },
  });