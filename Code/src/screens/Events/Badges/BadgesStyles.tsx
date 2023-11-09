import { StyleSheet } from "react-native";


export const badgesStyles = StyleSheet.create({
    badgeHolder: {
      flexWrap: "wrap",
      flexDirection: "row",
      marginVertical: 5,
    },
    badgeContainer: {
      borderColor: "#007AFF",
      borderWidth: 1,
      borderRadius: 10,
      marginBottom: 10,
      zIndex: 5,
      height: 40,
      minWidth: "100%",
    },
    btext: {
      fontSize: 13,
      color: "black",
    },
    badgeName: {
      marginLeft: 10,
      fontSize: 12,
    },
    cancelIcon: {
      height: 35,
      width: 35,
      right: 0,
    },
    badge:{
        height: 50, 
        width: 40
    }
  });
  