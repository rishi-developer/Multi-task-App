import { StyleSheet, Dimensions } from 'react-native';
const { height, width } = Dimensions.get("screen");

export const directoryPageStyles = StyleSheet.create({
    netWorkIssueText: {
      padding: 50,
      paddingVertical: height / 3,
      width: width,
    },
    container: {
      paddingTop: height / 15,
    },
    circle: {
      width: 34,
      height: 34,
      paddingBottom: 10,
      borderRadius: 17,
      paddingTop: 10,
      backgroundColor: "rgba(73, 139, 234, 0.3)",
    },
    circleData: {
      height: 18,
      fontStyle: "normal",
      fontWeight: "700",
      top: -1,
    },
    pageInfo: {
      height: 29,
      lineHeight: 22,
      fontSize: width / 22,
    },
    darkSearchBar: {
      borderColor: "#3C444E",
    },
    searchBar: {
      width: "90%",
      height: 40,
      alignSelf: "center",
      backgroundColor: "rgba(241, 241, 241, 0.5)",
      borderWidth: 1,
      borderColor: "#F3F3F3",
      color: "#414249",
      paddingLeft: 9,
      paddingBottom: 8,
      paddingTop: 7,
      borderRadius: 6,
      marginBottom: 6,
    },
    placeholder1: {
      fontStyle: "normal",
      fontWeight: "500",
    },
    clearIcon: {
      marginTop: 7.5,
      right: "9%",
      width: 25,
      height: 25,
    },
    warning_modal: {
      width: "86%",
      height: height / 4.5,
      borderRadius: 7,
    },
    modal_heading: {
      overflow: "hidden",
      borderRadius: 7,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      height: "30%",
      paddingLeft: "5%",
    },
    modal_body: {
      margin: "5%",
    },
    text: {
      fontSize: width / 26,
    },
    textheading: {
      fontSize: width / 18,
      marginLeft: "10%",
      bottom: "16%",
    },
    textYes: {
      margin: "5%",
      marginRight: 20,
      marginBottom: "0%",
      borderWidth: 2,
      borderColor: "#498BEA",
      fontWeight: "bold",
      borderRadius: 4,
      height: height / 21.5,
      width: width / 5.8,
    },
    arrow: {
      fontSize: width / 21.33,
    },
    searchBarView: {
      marginTop: 15,
      marginBottom: 15,
    },
    results: {
      marginBottom: height / 50.235,
      height: height / 1.45,
    },
    noresults: {
      fontWeight: "500",
    },
    callimage: {
      width: 15,
      height: 15,
      tintColor: "#33cc33",
    },
    call: {
      width: "15%",
    },
    name: {
      bottom: 3,
    },
    employeedataview: {
      width: "70%",
    },
    userimageview: {
      width: "14%",
    },
    employeedetails: {
      justifyContent: "flex-start",
      height: 60,
      paddingTop: 5,
      paddingBottom: 5,
    },
    employeedetailsview: {
      borderBottomColor: "#E0E0E0",
      borderBottomWidth: 1,
      width: "90%",
    },
    dataflatlist: {
      top: 10,
      paddingBottom: 50,
    },
    dataview: {
      height: "84%",
    },
    warning: {
      top: "30%",
    },
    ok: {
      fontWeight: "bold",
    },
    renderLoader: {
      paddingBottom: 50,
    },
    backBtnArea: {
      height: height / 25,
      width: width / 6,
      justifyContent: "center",
      alignItems: "center",
    },
    backBtnCntr: {
      height: 20,
      width: 20,
      marginLeft: 24,
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
    backBtnLight: {
      borderLeftWidth: 3,
      borderBottomWidth: 3,
      borderBottomColor: "black",
      borderLeftColor: "black",
      borderRadius: 2,
      width: 15,
      height: 15,
      transform: [{ rotate: "45deg" }],
    },
  });
  