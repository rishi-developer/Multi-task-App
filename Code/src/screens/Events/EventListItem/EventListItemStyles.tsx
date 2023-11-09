import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");

export const eventListItemStyles = StyleSheet.create({
    container: {
      height: 96,
      marginBottom: 21,
      borderRadius: 8,
      borderWidth: 1,
      elevation: 2,
      shadowColor: "rgba(166, 163, 163, 0.3);",
      shadowOpacity: Platform.OS === "ios" ? 1 : 10,
      shadowOffset:
        Platform.OS === "ios"
          ? { width: 2, height: 4 }
          : { width: 4, height: 10 },
      shadowRadius: Platform.OS === "ios" ? 5 : 16,
    },
    cardTimeCntr: {
      width: "85%",
    },
    lightBorder: {
      borderColor: "#F4F4F4",
    },
    darkBorder: {
      borderColor: "#2E343C",
    },
    CardTextCntr: {
      width: "74%",
    },
    imageCntr: {
      width: "26%",
    },
    imgOpacity: {
      zIndex: 3,
      opacity: 0.5,
    },
    venueText: {
      fontFamily: "Montserrat",
      fontSize: 11,
      lineHeight: 14.3,
      marginLeft: 6.75,
    },
    eventName: {
      fontFamily: "Montserrat-SemiBold",
      fontSize: 13,
      marginVertical: 7,
    },
    eventImg: {
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    attendingEventStatusCntr: {
      top: 10,
      elevation: 5,
      width: "70%",
      borderRadius: 2,
      height: 18,
    },
    attending: {
      backgroundColor: "#55B727",
    },
    valid: { backgroundColor: "#E83A50" },
  });
  