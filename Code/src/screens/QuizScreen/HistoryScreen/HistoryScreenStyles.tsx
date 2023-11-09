import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const historyScreenStyles = StyleSheet.create({
    cloudBackgorund: {
      width: Dimensions.get("window").width,
    },
    darkCloudImgHeight: {
      height: 800,
    },
    lightCloudImgHeight: {
      height: 500,
    },
    circle1: {
      width: 20,
      height: 20,
      borderRadius: 20 / 2,
      backgroundColor: "rgba(129, 113, 245, 0.53)",
      bottom: 10,
      left: 30,
    },
    circle2: {
      width: 40,
      height: 40,
      borderRadius: 40 / 2,
      backgroundColor: "rgba(129, 113, 245, 0.53)",
      left: -15,
      top: 45,
    },
    circle3: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      backgroundColor: "rgba(129, 113, 245, 0.53)",
      right: -5,
    },
    circle4: {
      width: 20,
      height: 20,
      borderRadius: 20 / 2,
      backgroundColor: "rgba(129, 113, 245, 0.53)",
      right: 100,
      bottom: 20,
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
      elevation: 4,
    },
    quizHistoryTitleContainer: {
      top: 30,
      left: 0,
      right: 0,
      bottom: 0,
    },
    toolbar: {
      height: 130,
    },
    yourDetailSmallContainer: {
      paddingBottom: 40,
      borderTopLeftRadius: 40,
      borderTopRightRadius: 40,
      paddingTop: 30,
    },
    profile: {
      width: "90%",
      paddingBottom: 50,
    },
    profileImgContainer: {
      width: "30%",
    },
    profileDetailsContainer: {
      width: "70%",
    },
    profileImg: {
      height: 75,
      width: 75,
      borderRadius: 75 / 2,
    },
    yourDetailTitle: {
      padding: "4%",
    },
    yourDetailSubTitle: {
      paddingLeft: "4%",
      fontWeight: "300",
      bottom: "4%",
    },
    allStatsContainer: {
      bottom: "6%",
    },
    paricipatedQuizTitle: {
      top: -30,
      paddingLeft: "6%",
    },
    paricipatedQuizSubTitle: {
      top: -25,
      fontWeight: "300",
      padding: 3,
      paddingLeft: "6%",
    },
    noQuizContainer: {
      height: Dimensions.get("window").height / 2.5,
      marginTop: 80,
    },
    historyCardContainer: {
      top: -7,
    },
    backBtnCntr: {
      height: 20,
      width: 20,
      marginLeft: 24,
    },
    backBtnArea: {
      height: height / 16,
      width: width / 6,
    },
    quizHistoryTitle: {
      top: -3,
    },
  });