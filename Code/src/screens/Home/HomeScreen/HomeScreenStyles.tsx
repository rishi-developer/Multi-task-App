import { StyleSheet, Dimensions, Platform } from "react-native";
let { height, width } = Dimensions.get("screen");

export const homeScreenStyles = StyleSheet.create({
  splashHandler: {
    height: height,
    width: width,
    backgroundColor: "#0C1527",
  },
  splashScreenVideo: {
    height: Platform.OS == "android" ? "97.4%" : "100%",
    width: width,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  activityIndicator: {
    marginTop: 25,
  },
  flatlist: {
    height: height,
    paddingTop: height / 3,
  },
  noData:{
    width: width,
  },
  videoCard:{
    height: "72%"
  },
  flatListCategoryname:{
     paddingRight: 20 
  }
});
