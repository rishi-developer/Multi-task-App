import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default StyleSheet.create({
  darkThemeBackground: {
    backgroundColor: "#1B1F23",
  },
  darkThemeShowHistory: {
    backgroundColor: "#3C444E",
    borderBottomColor: "#1B1F23",
  },
  darkThemeText: {
    color: "#D1D0D0",
  },
  darkThemeCntr: {
    backgroundColor: "#2E343C",
  },
  darkBackground: {
    backgroundColor: "#1B1F23",
  },
  darkarrow: {
    color: "#ffffff",
  },
  darkModalBG: {
    backgroundColor: "black",
  },
  darkThemeCardBackground: {
    backgroundColor: "#2E343C",
    borderColor: "#2E343C",
  },
  darkThemeCardShadow: {
    shadowColor: "rgba(0, 0, 0, 0.6)",
  },
  darkOverlay: {
    borderColor: "#007AFF",
    borderWidth: 1,
  },
});
