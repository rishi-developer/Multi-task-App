import { Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("screen");

export const noteContainerStyles = (index: any) =>
  StyleSheet.create({
    container: {
      width: "90%",
      marginTop: 13,
      elevation: 4,
      height: 86,
      borderRadius: 10,
      shadowOpacity: 0.1,
      shadowRadius: 10,
      marginBottom: index[0] === index[1] ? height / 2 : 0,
    },
  });

export const noteStyles = StyleSheet.create({
  darkOverlay: {
    borderColor: "#007AFF",
    borderWidth: 1,
  },
  lightOverlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  darkThemeCardShadow: {
    shadowColor: "rgba(0, 0, 0, 0.6)",
  },
  lightThemeCardShadow: {
    shadowColor: "rgba(20, 20, 20, 0.02)",
  },
  mainContainer: {
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 4 },
    paddingBottom: 10,
  },
  container: {
    width: "90%",
    marginTop: 13,
    elevation: 4,
    height: 86,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardimg: {
    width: "15%",
    paddingLeft: 9,
  },
  cardinfo: {
    paddingLeft: 6,
    width: "74%",
  },
  card: {
    paddingLeft: 6,
    width: "74%",
  },
  cardbody: {
    width: "80%",
  },
  circle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: "rgba(73, 139, 234, 0.3)",
    color: "#007AFF",
  },
  circleData: {
    color: "#007AFF",
    fontStyle: "normal",
    fontWeight: "700",
    alignSelf: "center",
  },
  overlay: {
    borderRadius: 8,
  },
  cardTitle: {
    fontStyle: "normal",
  },
  cardDescription: {
    fontStyle: "normal",
    fontWeight: "400",
  },
  imageTitle: {
    height: 50,
    width: 50,
    top: "20%",
  },
  selectedTick: {
    top: "37%",
    borderWidth: 0,
  },
});