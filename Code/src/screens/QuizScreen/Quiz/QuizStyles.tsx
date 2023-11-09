import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const quizStyles = StyleSheet.create({
    topBar: {
      height: "5%",
      marginTop: 40,
    },
    endBtn: {
      height: "60%",
      width: "15%",
      marginRight: 20,
      borderRadius: 10,
    },
    questionTabContainer: {
      height: 50,
      width: "90%",
      margin: 20,
      padding: 10,
    },
    questionContainer: {
      height: "82%",
      marginTop: 10,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
    },
    optionBtn: {
      height: "8%",
      width: "85%",
      borderWidth: 2,
      marginLeft: 27,
      marginTop: 20,
      paddingLeft: 10,
      borderRadius: 10,
    },
    darkoptionBtn: {
      borderColor: "#202020",
    },
    lightoptionBtn: {
      borderColor: "#ECECEC",
    },
    optionBtnHover: {
      height: "8%",
      width: "85%",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      marginLeft: 27,
      marginTop: 20,
      justifyContent: "center",
      paddingLeft: 10,
      borderRadius: 10,
      borderWidth: 1,
    },
    lightoptionBtnHover: {
      borderColor: "#9187E6",
    },
    bottomTab: {
      bottom: 60,
      height: "5%",
    },
    previosBtn: {
      width: "40%",
      borderWidth: 1,
      borderRadius: 10,
    },
    lightpreviosBtn: {
      borderColor: "#9187E6",
    },
    previosBtnDisable: {
      display: "none",
    },
    skipBtn: {
      width: "20%",
      borderWidth: 1,
      borderRadius: 10,
    },
    lightskipBtn: {
      borderColor: "#F8C67C",
    },
    saveAndNextBtn: {
      width: "40%",
      borderRadius: 10,
    },
    darkcentered_view: {
      backgroundColor: "rgba(21, 12, 67, 0.84)",
    },
    warning_modal: {
      width: "86%",
      height: height / 3,
      borderRadius: 7,
    },
    modal_handsEmoji: {
      width: "21%",
      height: "25%",
      marginTop: 40,
      marginBottom: 20,
      borderRadius: 100,
    },
    darkmodal_handsEmoji: {
      backgroundColor: "rgba(255, 203, 63, 0.22)",
    },
    modal_body: {
      margin: "2%",
    },
    text: {
      fontSize: width / 19,
      marginBottom: 5,
    },
    textYes: {
      fontSize: width / 20,
      marginTop: 10,
      marginBottom: "0%",
      borderRadius: 10,
      height: height / 21.5,
      width: width / 3,
      borderWidth: 1,
    },
    lighttextYes: {
      borderColor: "#E46566",
    },
    textNo: {
      fontSize: width / 20,
      marginBottom: "0%",
      height: height / 21.5,
      width: width / 3,
      borderRadius: 10,
    },
    notSelected: {
      height: "6%",
      width: "85%",
      borderRadius: 10,
      marginTop: 20,
      marginLeft: 27,
    },
    lightnotSelected: {
      backgroundColor: "rgba(228, 101, 102, 0.2)",
    },
    questionnumber: {
      marginHorizontal: 20,
      fontWeight: "600",
    },
    warning: {
      fontWeight: "500",
      width: "95%",
    },
    lightwarning: {
      color: "#E46566",
    },
    bottombar: {
      marginTop: "2%",
    },
    handemoji: {
      height: "70%",
      width: "70%",
    },
    circle: {
      top: 9,
      right: 10,
      height: "60%",
      width: "10%",
      borderRadius: 100,
    },
    info: {
      height: "50%",
      width: "10%",
      marginHorizontal: 3,
    },
    skiptextNone: {
      display: "none",
    },
    notext: {
      marginTop: 10,
    },
  });