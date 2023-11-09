import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");

export const eventFormStyles = StyleSheet.create({
  closeIcon: {
    height: height / 10,
    width: height / 10,
  },
  modal_headingCntr: {
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: Platform.OS === "android" ? 63 : 75,
  },
  darkBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#4E4949",
  },
  errText: {
    fontSize: 14,
    color: "#FF2828",
    marginBottom: 15,
  },
  lightBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.25);",
  },
  modal_heading: {
    alignItems: Platform.OS === "android" ? "center" : "flex-end",
    width: width - 50,
    paddingBottom: Platform.OS == "android" ? 0 : 10,
    paddingTop: Platform.OS == "android" ? 0 : 30,
  },
  modal_body: {
    width: width - 50,
    marginVertical: 18,
  },
  btnCntr: {
    height: 29,
    borderRadius: 6,
  },
  btnTitle: {
    color: "white",
    alignSelf: "center",
    fontSize: 14,
    fontFamily: "Montserrat-SemiBold",
  },
  indicator: {
    alignSelf: "center",
    top: height / 2,
  },
});
