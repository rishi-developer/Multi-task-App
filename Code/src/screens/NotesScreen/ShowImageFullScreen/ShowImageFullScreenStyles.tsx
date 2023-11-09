import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const showImageFullScreenStyles = StyleSheet.create({
    fullImgHeight: {
      marginTop:height/3.2,
      height: height,
    },
    fullImgBackBtn: {
      // marginTop: height / 50,
      marginLeft: width / 25,
      width: width / 10,
    },
  });
  