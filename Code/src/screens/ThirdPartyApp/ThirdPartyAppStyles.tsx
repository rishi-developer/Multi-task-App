import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export const thirdPartyAppsStyles = StyleSheet.create({
  flatListContainer: {
    paddingBottom: height / 9,
  },
  icons: {
    width: width / 8.72,
    height: width / 8.72,
    alignSelf: "center",
  },
});
