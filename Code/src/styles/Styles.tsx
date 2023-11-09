import { StyleSheet } from "react-native";
import { Dimensions, Platform } from "react-native";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

export default StyleSheet.create({
  header: {
    height: high / 20,
    marginBottom: 10,
    width: "80%",
  },
  dateContainer: {
    top: high / 14,
    left: 28,
    width: 200,
    height: high / 60,
    marginBottom: "1%",
  },
  dateText: {
    fontSize: wid / 34.91,
    lineHeight: high / 60,
    fontWeight: "500",
  },
  goodTextContainer: {
    top: high / 11,
    left: 27,
  },
  goodText: {
    fontWeight: "600",
    fontSize: wid / 17.45,
    lineHeight: 25.81,
  },
  profileCntr: {
    right: wid / 7,
    width: wid / 4.8,
    top: high / 15.08,
    height: high / 9.425,
  },
  profileBtn: {
    width: wid / 10,
    height: high / 20,
    justifyContent: "center",
  },
  scanCntr: {
    right: wid / 15,
    width: wid / 4.8,
    top: high / 15.08,
    height: high / 9.425,
  },
  scanBtn: {
    width: wid / 10,
    height: high / 20,
  },
  profileIcon: {
    width: 26,
    height: 26,
  },
  lightprofileIcon: {
    tintColor: "#666592",
  },
  slider: {
    height: high / 3,
    top: Platform.OS == "android" ? high / 13 : high / 19,
  },
  sliderHolder: {
    width: wid / 1.17,
    height: high / 3.81,
    left: 8,
  },
  sliderHolderVideo: {
    width: wid / 1.17,
    height: high / 4.2,
    left: 8,
  },
  sliderContainer: {
    width: wid / 1.259,
    height: high / 4.5,
    borderRadius: 10,
    borderColor: "#498BEA",
    shadowColor: "rgba(20, 20, 20, 0.02)",
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  circle: {
    width: high / 26,
    height: high / 26,
    top: high / 42.7,
    left: wid / 14.75,
    borderRadius: 15,
  },
  vector: {
    width: wid / 19,
    height: high / 40,
    left: wid / 75,
    top: high / 130,
  },
  ContripointVector: {
    width: wid / 24,
    height: high / 30,
    left: wid / 55,
    top: high / 205,
  },
  misTextContainer: {
    left: wid / 5.67,
    top: high / 40,
    width: wid / 1.92,
  },

  misText: {
    fontSize: wid / 19.2,
    fontWeight: "600",
  },
  seperator: {
    marginVertical: high / 12.93,
    height: 1,
    backgroundColor: "rgba(229, 255, 223, 0.27)",
  },
  messageContainer: {
    width: wid / 1.73,
    height: high / 14,
    top: high / 22,
    left: wid / 12.71,
  },
  message: {
    fontWeight: "500",
    fontSize: wid / 21,
  },
  featuredAppContainer: {
    height: high / 5,
    top: Platform.OS == "android" ? high / 25 : high / 31,
  },
  featuredTextCntr: {
    paddingHorizontal: wid / 14.5,
    top: high/200
  },
  featureimageContainer: {
    width: high / 10.67,
    height: high / 10.67,
    borderRadius: 15,
    justifyContent: "center",
    padding: 18,
    top: high / 85.4,
  },
  darkfeatureimageContainer: {
    elevation: 6,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowRadius: 10,
    shadowOffset: {
      width: 4,
      height: 10,
    },
    shadowOpacity: 0.4,
  },
  lightfeatureimageContainer: {
    elevation: 2,
    shadowOffset: { width: 0, height: 0.4 * 10 },
    shadowOpacity: 0.2,
    shadowRadius: 0.8 * 10,
  },
  featuredText: {
    fontWeight: "600",
    fontSize: wid / 25.6,
    lineHeight: 18,
  },
  viewAllContainer: {
    width: wid / 3.12,
    height: high / 28.16,
    top: "-1%",
  },
  viewAllText: {
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 14.08,
    marginRight: 5,
  },
  viewAllIcon: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowContainer: {
    height: high / 50.16,
  },
  featuredAppSLider: {
    height: high / 6.32,
  },
  featuredAppSliderItemCntr: {
    width: wid / 3.79,
    height: high / 4.9,
    left: wid / 21.33,
    top: high / 213.5,
    marginRight: 10,
  },
  featuredAppSliderItem: {
    width: 90,
    height: 174,
    left: 2,
    borderRadius: 10,
    borderColor: "#498BEA",
    shadowColor: "rgba(20, 20, 20, 0.02)",
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  featuredAppHolder: {
    zIndex: 1,
    width: wid / 4.26,
    justifyContent: "center",
    height: high / 7.11,
    left: wid / 19.2,
  },
  featureAppImageContainer: {
    backgroundColor: "white",
  },
  featureAppImage: {
    width: high / 17.79,
    height: high / 17.79,
  },
  featureAppTextContainer: {
    top: 25,
  },
  featureAppText: {
    fontWeight: "300",
    fontSize: wid / 34.9,
  },
  catContainer: {
    marginTop: Platform.OS == "android" ? high / 13 : high / 19,
    height: high / 5,
  },
  catHeader: {
    left: wid / 14.5,
    top: high/200
  },
  catHeading: {
    height: high / 7.11,
    top: high / 42.7,
  },
  catText: {
    fontWeight: "600",
    fontSize: wid / 25.6,
    lineHeight: 18,
  },
  viewAllcatContainer: {
    position: "absolute",
    left: 270,
    bottom: 3,
    width: 50,
    height: 15,
  },
  viewAllcatText: {
    fontFamily: "Montserrat",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 14.63,
    color: "#666592",
  },
  catListHolder: {
    minWidth: wid / 2.97,
    height: high / 11.23,
    top: high / 284.6,
    left: wid / 15.36,
    marginRight: 15,
  },
  catListContainer: {
    minWidth: wid / 2.97,
    height: high / 11.7,
    borderColor: "#ECECEC",
    shadowOffset: { width: 0, height: 0.4 * 10 },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 0.8 * 10,
    borderRadius: 10,
    padding: 6,
  },
  barCode: {
    left: 110,
  },
  barCodeImage: {
    height: 40,
    width: 40,
  },
  closeBarBtn: {
    top: high / 3,
    left: wid / 3,
    backgroundColor: "#70a1ff",
    width: wid / 3,
    height: high / 25,
    justifyContent: "center",
    borderRadius: 10,
  },
  closeBarBtnText: {
    alignSelf: "center",
    fontSize: high / 35,
  },
  barCodeModal: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  crossBtnBox: {
    width: wid / 5,
    height: wid / 6,
    marginTop: Platform.OS == "ios" ? high / 18 : high / 30,
  },
  crossBtn: {
    fontSize: high / 35,
    fontFamily: "Montserrat-Bold",
    transform: [{ rotate: "180deg" }],
  },
  userNameText: {
    fontSize: high / 40,
  },
  userEmployeeCode: {
    fontSize: high / 50,
    marginVertical: high / 40,
  },
  userEmployeeCodeValue: {
    fontSize: high / 50,
  },
  QRCodeBox: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "70%",
  },
  QrInfo: {
    color: "#62656A",
    marginTop: high / 45,
    fontSize: high / 60,
    zIndex: 10,
    lineHeight: 20,
  },
  footerImage: {
    zIndex: -1,
    position: "absolute",
    bottom: "15%",
  },
  lightcontainer1: {
    borderColor: "#498BEA",
  },
  textOk: {
    fontWeight: "bold",
  },
  warning_modal: {
    width: "86%",
    height: high / 4.5,
    borderRadius: 7,
  },
  darkcontactDetails: {
    backgroundColor: "#2E343C",
  },
  lightcontactDetails: {
    backgroundColor: "pink",
  },
  warningIcon: {
    top: "30%",
  },
  textheading: {
    color: "white",
    fontSize: wid / 18,
    fontFamily: "Montserrat",
    marginLeft: "10%",
    bottom: "16%",
  },
  textYes: {
    fontSize: wid / 22,
    margin: "5%",
    marginRight: 20,
    marginBottom: "0%",
    fontFamily: "Montserrat",
    borderWidth: 2,
    borderColor: "#498BEA",
    backgroundColor: "#498BEA",
    color: "white",
    fontWeight: "bold",
    borderRadius: 4,
    height: high / 21.5,
    width: wid / 5.8,
    justifyContent: "center",
    alignContent: "center",
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
    fontSize: wid / 26,
  },
  catListItem: {
    height: high / 10.6,
    minWidth: wid / 2.8,
  },
  catListText: {
    fontSize: wid / 24,
    fontWeight: "600",
  },
  modalImageContainer: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  modalimagecontainers: {
    width: high / 9.7,
    height: high / 9.7,
    borderRadius: 15,
    padding: wid / 29.53,
    elevation: 1,
    top: high / 42.7,
    left: wid / 19.2,
  },
  darkmodalimagecontainers: {
    shadowColor: "rgba(163, 163, 163, 0.35)",
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  modalTextContainer: {
    top: high / 42.7,
    left: wid / 3.147,
  },
  modalText: {
    fontSize: wid / 24,
  },
  modalDescriptionContainer: {
    width: wid / 2.4,
    height: high / 11.2,
    top: high / 17.8,
    left: wid / 3.173,
    backgroundColor: "#FAFAFB",
  },
  modalDescriptionText: {
    fontWeight: "300",
    fontSize: wid / 32,
  },
  modalButtonContainer: {
    width: wid / 5.19,
    height: high / 28,
    position: "absolute",
    borderWidth: 1,
    top: high / 42.7,
    left: wid / 1.388,
    marginLeft: 20,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  darkmodalButtonContainer: {
    borderColor: "rgba(73, 139, 234, 1)",
    backgroundColor: "#1C2024",
    shadowColor: "rgba(73, 139, 234, 1)",
    shadowRadius: 10,
    shadowOffset: {
      width: 4,
      height: 10,
    },
  },
  lightmodalButtonContainer: {
    borderColor: "rgba(73, 139, 234, 1)",
    backgroundColor: "rgba(73, 139, 234, 1)",
  },
  visitNowbtn: {
    backgroundColor: "#FFC154",
    borderRadius: 8,
    width: wid / 3.42,
    height: high / 24.529,
    top: high / 6,
    left: wid / 13.17,
  },
  visitNowText: {
    fontFamily: "Montserrat-Bold",
    fontSize: wid / 24,
    color: "#fff",
    fontWeight: "600",
  },
  arrowImg: {
    width: high / 19.4,
    height: high / 19.4,
    left: wid / 19.2,
    zIndex: 1,
  },
  Container: {
    flex: 1,
  },
  HeaderCntr: {
    height: high / 17.08,
    top: high / 17.46,
    marginBottom: high / 16.7,
  },
  HeaderCntr1: {
    height: high / 18.08,
    top: high / 20.46,
    marginBottom: high / 16.7,
  },
  leftArrow: {
    width: wid / 7.68,
    height: high / 21.35,
  },
  BackBtn: {
    fontSize: wid / 21.33,
  },
  reloadBtn: {
    fontSize: wid / 20.21,
    width: wid / 8,
  },
  HeaderTxtCntr: {
    height: high / 18.08,
    marginLeft: wid / 6,
    top: high / 170.8,
  },
  Headertext: {
    fontSize: wid / 20.21,
    fontFamily: "Montserrat-Bold",
    width: wid / 2,
    textAlign: "center",
  },
  AppCntr: {
    height: high / 5.87,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 10,
    width: "95%",
    margin: high / 99,
    elevation: 6,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowRadius: 10,
    shadowOffset: {
      width: 4,
      height: 10,
    },
    shadowOpacity: 0.4,
  },

  SaveBtn: {
    width: high / 35.7,
    height: high / 15.7,
    left: wid / 1.17,
    top: 20,
  },
  saveImg: {
    width: wid / 20.72,
    height: wid / 14.72,
  },
  dropDownContainer: {
    position: "absolute",
    width: 118,
    height: 89,
    borderRadius: 8,
    top: high / 8.5,
    right: wid / 7.5,
    borderColor: "#498BEA",
    justifyContent: "center",
    elevation: 2,
    paddingLeft: 15,
    paddingTop: 21.5,
    paddingBottom: 21.5,
  },
  dropHolder: {
    shadowColor: "rgba(0,0,0,0.1)",
    shadowRadius: 22,
    shadowOffset: { width: 12, height: 4 },
    shadowOpacity: 0.2,
  },
  dropTextHolder: {
    height: 20,
    marginBottom: 5,
  },
  dropTextSecHolder: {
    height: 25,
    marginBottom: 5,
  },
  dropText: {
    fontFamily: "Montserrat-SemiBold",
    fontWeight: "600",
    fontSize: 11,
    lineHeight: 15,
    color: "#474749",
  },
  dropDarkContainer: {
    backgroundColor: "#2E343C",
  },
  dropDarkText: {
    color: "#f9f9f9",
  },
  darkprofileicon: { tintColor: "#D1D0D0" },
  pageInfo: {
    height: 29,
    lineHeight: 22,
    fontSize: wid / 22,
  },
  Eventheader: {
    marginTop: Platform.OS == "android" ? high / 25.6 : 20,
    width: "90%",
  },
  headerTitleCntr: {
    width: "80%",
  },
  headerTitle: {
    lineHeight: 22,
    fontSize: wid / 22,
  },
  netWorkIssueText: {
    padding: 50,
    paddingVertical: high / 2.5,
    width: wid,
  },
  videovisitNowbtn: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    width: wid / 3.42,
    height: high / 24.529,
    top: high / 6,
    left: wid / 20.17,
  },
  videovisitNowText: {
    fontFamily: "Montserrat-Bold",
    fontSize: wid / 24,
    color: "#773CD1",
    fontWeight: "600",
  },
  videoTextContainer: {
    left: wid / 20.67,
    top: high / 40,
    width: wid / 2.2,
    height: high / 10,
  },
  videoText: {
    fontSize: wid / 24,
    // fontWeight: "700",
    lineHeight: 26,
  },
  videoImage: {
    width: wid / 3,
    height: high / 5,
    top: high / 40,
  },
  filesbackButton: {
    width: wid / 13,
    height: high / 26,
    alignSelf: "center",
  },
  filesleftArrow: {
    fontSize: wid / 19.2,
  },
  Filesheader: {
    marginTop: Platform.OS == "android" ? high / 25.6 : 20,
    width: "100%",
  },
  FilesheaderTitleCntr: {
    width: "90%",
  },
  filterEventItem: {
    width: wid / 4,
    height: 26,
    borderRadius: 6,
    shadowColor: "rgba(0, 0, 0, 1.5);",
    shadowOffset: { width: 0, height: 0.5 * 10 },
    shadowOpacity: 0.3,
    elevation: 10,
    shadowRadius: 0.8 * 10,
  },
  lightText: {
    color: "#1D1F23",
  },
  darkText: {
    color: "rgba(209, 208, 208, 0.8)",
  },
  filesHeaderTitle: {
    lineHeight: 22,
    fontSize: wid / 22,
    left: wid / 3,
    top: "-1%",
  },
  filesAppChange: {
    width: wid / 6,
    paddingLeft: 5,
  },
  dropDownAppContainer: {
    zIndex: 19,
    width: Platform.OS === "ios" ? 100 : 112,
    height: Platform.OS === "ios" ? 60 : 89,
    borderRadius: 8,
    top: high / 27.5,
    right: wid / 28.5,
    elevation: 10,
    paddingLeft: Platform.OS === "ios" ? 0 : 15,
    paddingTop: 21.5,
    paddingBottom: 21.5,
  },
  dropAppHolder: {
    paddingLeft: Platform.OS === "ios" ? 10 : 0,
    paddingTop: Platform.OS === "ios" ? 10 : 0,
    borderColor: "#498BEA",
    shadowColor: Platform.OS === "ios" ? "" : "rgba(0, 0, 0, 0.1)",
    shadowRadius: 22,
    shadowOffset: { width: 12, height: 4 },
    shadowOpacity: 0.2,
    borderRadius: Platform.OS === "ios" ? 8 : 0,
  },
  dropAppTextHolder: {
    height: 20,
    marginBottom: 5,
  },
  dropAppText: {
    fontWeight: "600",
    fontSize: 11,
    lineHeight: 15,
  },
  viewAllDetails: {
    width: wid / 5.12,
    height: high / 33.16,
    left: wid / 10,
    marginTop: high / 30,
  },
});
