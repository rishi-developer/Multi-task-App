import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const webviewStyles = StyleSheet.create({
    loader: {
      position: "absolute",
      top: height / 2,
      left: width / 2.1,
    },
  });