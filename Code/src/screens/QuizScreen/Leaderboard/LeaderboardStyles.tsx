import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");

export const leaderboardStyles = StyleSheet.create({
    netWorkIssueText: {
      padding: 50,
      paddingVertical: height / 4,
      width: width,
    },
    headerContainer: {
      height: "30%",
      zIndex: 2,
    },
    userContainer: {
      top: 2.5,
      height: "70%",
      borderTopStartRadius: 40,
      borderTopEndRadius: 40,
      paddingTop: 60,
    },
    topperBackgroundImage: {
      backgroundColor: "yellow",
    },
    topBar: {
      zIndex: 5,
    },
    backBtnArea: {
      height: height / 16,
      width: width / 6,
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
      zIndex: 15,
    },
    leaderboardHeading: {
      fontSize: 23,
      color: "#F9F9F9",
    },
    ImageContainer: {
      marginTop: "12.5%",
    },
    tooperBackgroundIcon: {
      zIndex: 3,
    },
    topperImage: {
      height: 110,
      width: 110,
      borderRadius: 100,
      zIndex: 3,
      bottom: Platform.OS == "ios" ? "24%" : "23.5%",
    },
    noQuizContainer: {
      height: Dimensions.get("window").height / 2.5,
      marginTop: "50%",
    },
  });