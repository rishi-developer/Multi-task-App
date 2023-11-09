import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const scannerStyles = StyleSheet.create({
  container: {
    height: height,
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    height: "100%",
    width: "100%",
  },
  barcode: {
    height: 500,
    width: 500,
    borderRadius: 30,
  },
  centered_view: {
    marginTop: 50,
  },
  warning_modal: {
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
  },
  helperTxt: {
    paddingBottom: 8,
    top: -8,
  },
  errorMsg: {
    paddingTop: 4,
    top: -7,
    color: "#FF2828",
    fontSize: 10,
  },
  modal_body: {
    width: width - 50,
    marginVertical: 18,
  },
  lightThemeText: {
    color: "#353535",
  },
  attendeeName: {
    fontSize: 16,
    lineHeight: 24,
  },
  empCode: {
    fontSize: 12,
    lineHeight: 18,
  },
  successText: {
    lineHeight: 18,
    fontSize: 12,
    color: "#4BAE4F",
  },
  existingText: {
    lineHeight: 18,
    fontSize: 12,
    color: "#FF6174",
  },
  modelBanner: {
    width: 128,
    height: 109,
    marginTop: -35,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 29,
    bottom: -17,
    right: -25,
  },
  confirmBtn: {
    fontSize: 14,
  },
  darkText: {
    color: "rgba(209, 208, 208, 0.8)",
  },
  inputField: {
    backgroundColor: "#F3F3F3",
    height: 38,
    width: 306,
    borderRadius: 10,
    fontSize: 10,
    paddingLeft: 10,
    color: "#8E8E93",
    marginBottom: 12,
  },
  errorInputField: { borderColor: "#FF2828", borderWidth: 1 },
  addUserTitle: {
    fontSize: 12,
    lineHeight: 18,
    paddingBottom: 20,
  },
  addUserHeader: {
    fontSize: 16,
    lineHeight: 24,
    paddingBottom: 4,
  },
  confirmCntr: {
    height: 38,
    width: 306,
    borderRadius: 10,
    fontSize: 10,
    paddingLeft: 10,
    color: "#8E8E93",
  },
  content: {
    borderWidth: 1,
    height: height * 1.5,
    width: width,
    borderColor: "red",
  },
  addUserForm: { marginTop: 40 },
  leftArrow: {
    fontSize: width / 16.2,
  },
  backBtn: {
    top: height / 15,
    left: 0,
    padding: width / 20,
    zIndex: 1,
  },
  scanner: {
    height: "100%",
    width: width * 1.8,
  },
  scannerBox: {
    position: "absolute",
    height: width / 1.2,
    width: width / 1.2,
  },
  scannerTopLeft: {
    position: "absolute",
    height: height / 12,
    width: height / 12,
    top: 0,
    left: 0,
    borderColor: "#3A81F1",
    borderTopWidth: 7,
    borderLeftWidth: 7,
    borderTopLeftRadius: 30,
  },
  scannerTopRight: {
    position: "absolute",
    height: height / 12,
    width: height / 12,
    top: 0,
    right: 0,
    borderColor: "#EA4335",
    borderTopWidth: 7,
    borderRightWidth: 7,
    borderTopRightRadius: 30,
  },
  scannerBottomLeft: {
    position: "absolute",
    height: height / 12,
    width: height / 12,
    bottom: 0,
    left: 0,
    borderColor: "#FDBD00",
    borderBottomWidth: 7,
    borderLeftWidth: 7,
    borderBottomLeftRadius: 30,
  },
  scannerBottomRight: {
    position: "absolute",
    height: height / 12,
    width: height / 12,
    bottom: 0,
    right: 0,
    borderColor: "#2DA94F",
    borderBottomWidth: 7,
    borderRightWidth: 7,
    borderBottomRightRadius: 30,
  },
});
