import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const quizHistoryStatsStyles = StyleSheet.create({
    statsContainer: {
      width: "28%",
      height: 142,
      marginLeft: "2%",
      marginRight: "2%",
      borderRadius: 8,
    },
    emojiContainer: {
      height: "40%",
    },
    circularContainer: {
      width: 34,
      height: 34,
      borderRadius: 34 / 2,
    },
    diamondEmoji: {
      width: "60%",
      height: "60%",
    },
    diamondContainerColor: {
      backgroundColor: "rgba(255, 204, 126, 0.32)",
    },
    statsTitleContainer: {
      height: "35%",
    },
    statsTitle1: {
      fontSize: 12,
      fontWeight: "400",
    },
    statsData: {
      height: "30%",
      fontWeight: "800",
      bottom: 5,
    },
  });