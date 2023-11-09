import { StyleSheet, Dimensions, Platform } from "react-native";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

export const bookmarkScreenStyles = StyleSheet.create({
    GenericMsgCntr: {
      height: "90%",
    },
    genericMsg: {
      fontSize: 18,
    },
    icon:{
        width: wid / 8.72,
        height: wid / 8.72,
        alignSelf: "center",
    },
    list:{
        paddingBottom: high / 9
    }
  });
  