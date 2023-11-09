import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");

export const noteInputModalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS == "android" ? 10 : 50,
  },
  icon: {
    height: "16%",
    bottom: height / 20,
    left: width / 3.5,
  },
  importImgContr: {
    width: width / 2.526,
    height: height / 19.454,
    shadowRadius: 10,
    shadowColor: "rgba(73, 139, 234, 0.3)",
    shadowOffset: { width: 0, height: 4 },
  },
  imgButton: {
    width: width / 2.526,
    height: height / 19.454,
    borderRadius: 10,
    elevation: 2,
  },
  btnCntr: {
    width: width / 11.29,
  },
  input: {
    marginVertical: 10,
  },
  title: {
    height: 40,
    fontWeight: "500",
    padding: 6,
  },
  desc: {
    fontWeight: "400",
    padding: 6,
    height: "87%",
  },
  modalBG: {
    zIndex: -1,
  },
  saveTick: {
    height: height / 20,
    width: height / 20,
    borderRadius: 50,
  },
  imgContainer: {
    marginBottom: "5%",
  },
  imgAttached: {
    width: 200,
    height: 200,
  },
  headerView: {
    right: "0%",
  },
  header: {
    width: "90%",
  },
  noteContainer: {
    paddingBottom: "5%",
  },
});