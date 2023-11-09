import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export const detailScreenStyles =  StyleSheet.create({
  mainContainer: {
    paddingTop: height / 15,
  },
  imgPopup: {
    paddingTop: height / 18,
  },
  backButton: {
    left: width / 19.2,
  },
  imgContainerShadow: {
    elevation: 3,
    shadowOffset: { width: 0, height: 4 },
  },
  holder: {
    left: width / 38.4,
    width: width / 1.04,
  },
  Containers: {
    width: height / 9.7,
    height: height / 9.7,
    borderRadius: 16,
    padding: width / 29.53,
    top: height / 120.2,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  logo: {
    width: height / 19.4,
    height: height / 19.4,
  },
  textstyle: {
    width: width / 2.5,
    height: "45%",
    top: height / 50.37,
    fontSize: width / 24,
  },
  imageview: {
    width: width / 1.2,
    height: height / 4.5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  darkimageview: {
    borderColor: "#2E343C",
  },
  lightimageview: {
    borderColor: "white",
  },
  secondmargin: {
    borderBottomWidth: 1,
    width: width / 0.85,
    top: height / 12.54,
  },
  darksecondmarging: {
    borderBottomColor: "#2E343C",
  },
  lightsecondmargin: {
    borderBottomColor: "#EBEEF2",
  },
  firstheading: {
    width: width / 1.11,
    top: height / 10.42,
    fontSize: width / 25.6,
    fontWeight: "600",
    left: width / 38.4,
  },
  detailtext: {
    width: width / 1.11,
    marginTop: 10,
    left: width / 38.4,
    fontWeight: "300",
    fontSize: width / 15,
    lineHeight: 20,
    height: height / 3,
  },
  ContinuebtnContainer: {
    width: width / 4.57,
    height: height / 30,
    borderColor: "rgba(73, 139, 234, 1)",
    borderWidth: 1,
    top: height / 15.5,
    borderRadius: 4,
  },
  ContinuebtnContainer1: {
    width: width / 3.57,
    height: height / 30,
    borderColor: "rgba(73, 139, 234, 1)",
    borderWidth: 1,
    top: height / 15.5,
    left: width / 3.5,
    borderRadius: 4,
  },
  btnText: {
    fontSize: width / 25,
    fontWeight: "600",
  },
  popupimageview: {
    width: width,
    resizeMode: "contain",
  },
  scrollview: {},
  modelview: {
    padding: 1,
    elevation: 5,
    borderWidth: 1,
  },
  darkmodelview: {
    borderColor: "#2E343C",
  },
  lightmodelview: {
    borderColor: "#ECECEC",
  },
  imagemainview: {
    top: height / 16.54,
  },
  leftArrow: {
    fontSize: width / 19.2,
  },
  containerName: {
    left: width / 19.2,
    height: height / 15,
  },
  description: {
    fontWeight: "500",
    lineHeight: 20,
  },
  catListHolder: {
    marginRight: 15,
    left: width / 15.36,
    borderColor: "red",
    borderWidth: 1,
    elevation: 1,
  },
  catListContainer: {
    minWidth: width / 2.97,
    height: height / 11.7,
    borderColor: "#E0E6EF",
    shadowOffset: { width: 0, height: 0.4 * 10 },
    shadowOpacity: 0.2,
    elevation: 1,
    shadowRadius: 0.8 * 10,
    borderRadius: 10,
    padding: 6,
  },
  catListItem: {
    height: height / 10.6,
    minWidth: width / 2.8,
  },
  catListText: {
    fontSize: width / 29,
    fontWeight: "600",
    paddingLeft: 10,
    flexShrink: 1,
  },
  container: {
    flexDirection: "row",
    maxWidth: "100%",
    flexWrap: "wrap",
    marginTop: height / 10,
    minHeight: height / 10,
  },
  SSOwarning: {
    lineHeight: 20,
    fontSize: 12,
  },
  videoItems: {
    width: 162,
    height: 49,
    borderRadius: 10,
    borderColor: "#E0E6EF",
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
  },
  circle: {
    width: height / 26,
    height: height / 26,
    borderRadius: 4,
  },
  detailsFirstheading: {
    width: width / 1.11,
    fontSize: width / 25.6,
    fontWeight: "600",
    left: width / 38.4,
  },
  noVideoDetail: {
    top: height / 9,
  },
  videoDetail: {
    top: 0,
  },
  netWorkIssueText: {
    padding: 50,
    paddingVertical: height / 2,
  },
  trandparentLoaderView: {
    height: height,
    width: "100%",
    paddingTop: 40,
  },
});
