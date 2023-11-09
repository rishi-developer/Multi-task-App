import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  useColorScheme,
} from "react-native";
import CommonModal from "./CommonModal";
const wid = Dimensions.get("window").width;
const high = Dimensions.get("window").height;

export default function ConfirmDelete({
  showWarning,
  setShowWarning,
  deleteEvent,
  setShowDropDown,
}: any) {
  const colorscheme = useColorScheme();

  const showWarningfalse = () => {
    setShowWarning(false);
    setShowDropDown(false);

  };
  const deleteConfirm = () => {
    deleteEvent();
  };
  return (
    <View style={styles.body}>
      <CommonModal
        showWarning={showWarning}
        showWarningfalse={showWarningfalse}
        typeOf="delete"
        message="Confirm Delete"
        selectedItems={[]}
        logoutButtonHandler={deleteConfirm}
        value="event"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centered_view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },
  warning_modal: {
    width: "86%",
    height: high / 4.5,
    borderRadius: 7,
  },
  modal_heading: {
    overflow: "hidden",
    position: "relative",
    width: "100%",
    backgroundColor: "#498BEA",
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: "30%",
    paddingLeft: "5%",
    justifyContent: "center",
  },
  modal_body: {
    margin: "5%",
  },
  text: {
    flexDirection: "row",
    fontSize: wid / 26,
    fontFamily: "Montserrat",
  },
  textheading: {
    color: "white",
    fontSize: wid / 18,
    fontFamily: "Montserrat",
    marginLeft: "10%",
    bottom: "16%",
  },
  textYes: {
    fontSize: wid / 22,
    margin: "5%",
    marginRight: 20,
    marginBottom: "0%",
    fontFamily: "Montserrat",
    backgroundColor: "#498BEA",
    color: "white",
    fontWeight: "bold",
    borderRadius: 4,
    height: high / 21.5,
    width: wid / 5.8,
    justifyContent: "center",
    alignContent: "center",
  },
  textNo: {
    position: "relative",
    fontSize: wid / 22,
    marginTop: "7%",
    color: "grey",
    fontFamily: "Montserrat",
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#498BEA",
    height: high / 21.5,
    width: wid / 5.8,
    fontWeight: "bold",
    borderRadius: 4,
    alignSelf: "center",
    justifyContent: "center",
  },
  exclamationMark: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    top: "30%",
  },
  multipleDelete: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  yesText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  noText: {
    color: "#747B84",
    alignSelf: "center",
    fontWeight: "bold",
  },
  darkContainer: {
    backgroundColor: "#1B1F23",
  },
  lightContainer: {
    backgroundColor: "white",
  },
  darkText: {
    color: "#ffffff",
  },
  lightText: {
    color: "#474749",
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
});
