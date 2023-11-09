import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const leaderBoardCardStyles = StyleSheet.create({
    scoreCard: {
      height: 80,
      width: "85%",
      borderRadius: 10,
      marginBottom: 27,
      marginLeft: 10,
      top: "3%",
    },
    lightscoreCard: {
      shadowColor: "rgba(145, 135, 230, 0.8)",
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.52,
      elevation: 11,
      borderWidth: 1,
      borderColor: "#F4F4F4",
    },
    rank: {
      height: 40,
      width: 40,
      left: -20,
      borderRadius: 10,
    },
    rankImage: {
      height: 80,
      width: 80,
      left: -30,
    },
    userImage: {
      height: 50,
      width: 50,
      marginLeft: 30,
      borderRadius: 40,
    },
    nameContainer: {
      height: height / 15,
      width: "75%",
    },
    userName: {
      fontSize: height / 60,
      marginLeft: height / 80,
    },
    userDepartmant: {
      fontSize: height / 75,
      fontWeight: "300",
    },
    iosShadow: {
      shadowColor: "rgba(145, 135, 230, 0.8)",
      shadowRadius: 11,
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.45,
      elevation: 7,
    },
    scoreContainer: {
      minHeight: height / 35,
      minWidth: width / 55,
      right: 0,
      top: -10,
      borderRadius: 5,
    },
    points: {
      marginLeft: height / 80,
      marginRight: height / 80,
      shadowColor: "#000000",
      shadowOffset: {
        width: 8,
        height: 20,
      },
      shadowOpacity: 0.52,
      shadowRadius: -20,
      elevation: 12,
    },
    diamond: {
      marginLeft: height / 80,
    },
  
  });