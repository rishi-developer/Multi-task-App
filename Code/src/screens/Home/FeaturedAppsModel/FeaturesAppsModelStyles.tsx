import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("screen");

export const featuredModelsStyles = StyleSheet.create({
  icons: {
    width: width / 8.72,
    height: width / 8.72,
    alignSelf: "center",
  },
  flatListContainer:{
    paddingBottom: height / 9 
  }
});
