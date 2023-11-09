import { StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("screen");

export const categoryCardStyles = StyleSheet.create({
  boxContainer: {
    height: 128,
    width: "90%",
    borderRadius: 10,
    marginBottom: 20,
  },
  lightboxContainer: {
    shadowColor: "rgba(145, 135, 230, 0.8)",
    elevation: 11,
    borderWidth: 1,
    borderColor: "#F4F4F4",
  },
  lightboxContainerAndroid: {
    shadowOffset: { width: 4, height: 10 },
    shadowOpacity: 0.85,
    shadowRadius: 34,
  },
  lightboxContainerIos: {
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.52,
  },
  darkBoxContainer: {
    marginBottom: 20,
  },
  catTextContainer: {
    marginLeft: 29,
    width: "50%",
  },
  startQuizBtn: {
    width: width / 2.5,
    height: height / 29,
    borderRadius: 5,
    marginTop: 13,
    borderWidth: 1,
    borderColor: "#9187E6",
  },
  logoIcon: {
    width: "40.63%",
  },
  data: {
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    alignSelf: "auto",
    resizeMode: "cover",
  },
  time: {
    marginTop: 7,
  },
  timeanddate: {
    fontWeight: "300",
  },
  polygon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
});
