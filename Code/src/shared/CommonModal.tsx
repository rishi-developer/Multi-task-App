import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CommonStyle from "../styles/Global";
const { height, width } = Dimensions.get("screen");
import useColorScheme from "../hooks/useColorScheme";
import { FontAwesome } from "@expo/vector-icons";

const CommonModal = ({
  showWarning,
  logoutButtonHandler,
  showWarningfalse,
  typeOf,
  selectedItems,
  message,
  city,
  value,
}: any) => {
  const colorscheme = useColorScheme();
  let theme = colorscheme === "dark";
  return (
    <>
      <Modal
        visible={showWarning}
        transparent
        onRequestClose={() => showWarningfalse()}
      >
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.jc_center,
            CommonStyle.ai_center,
            CommonStyle.bg_00000099,
          ]}
        >
          <View
            style={[
              styles.warning_modal,
              typeOf === "delete"
                ? [theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF]
                : [theme ? CommonStyle.bg_2E343C : CommonStyle.bg_FFFFFF],
            ]}
          >
            <View
              style={[
                CommonStyle.pRelative,
                CommonStyle.w100,
                CommonStyle.bg_498BEA,
                CommonStyle.jc_center,
                styles.modal_heading,
              ]}
            >
              {typeOf === "delete" || typeOf === "checkIn" ? (
                <FontAwesome
                  name="exclamation-circle"
                  style={[
                    CommonStyle.c_FFFFFF,
                    CommonStyle.fs_20,
                    CommonStyle.ai_center,
                    CommonStyle.jc_center,
                    styles.exclamationMark,
                  ]}
                ></FontAwesome>
              ) : (
                <AntDesign
                  name="warning"
                  size={24}
                  style={[
                    [
                      styles.warningIcon,
                      CommonStyle.c_FFFFFF,
                      CommonStyle.ai_center,
                      CommonStyle.fs_20,
                      CommonStyle.jc_center,
                    ],
                  ]}
                ></AntDesign>
              )}

              <Text
                allowFontScaling={false}
                style={[
                  styles.textheading,
                  CommonStyle.montserrat,
                  CommonStyle.c_FFFFFF,
                ]}
              >
                {message}
              </Text>
            </View>

            <View
              style={[
                styles.modal_body,
                typeOf === "delete"
                  ? [theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF]
                  : [theme ? [CommonStyle.bg_2E343C] : [CommonStyle.bg_FFFFFF]],
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserrat,
                  CommonStyle.flexDRow,
                  styles.text,
                  theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_747B84,
                ]}
              >
                {typeOf === "delete" ? (
                  selectedItems.length === 1 ? (
                    <Text>
                      Are you sure you want to delete the selected note ?
                    </Text>
                  ) : (
                    <Text>
                      Are you sure you want to delete the selected {value} ?
                    </Text>
                  )
                ) : typeOf === "checkIn" ? (
                  <Text>
                    Are you sure you want to proceed with {city} location ?
                  </Text>
                ) : (
                  <Text>You will be logged out. Please sign in again.</Text>
                )}
              </Text>

              <View
                style={[
                  CommonStyle.jc_flexEnd,
                  CommonStyle.flexDRow,
                  theme
                    ? CommonStyle.bg_trans
                    : {
                        ...CommonStyle.bg_FFFFFF,
                        ...styles.lightcontainer1,
                      },
                ]}
              >
                {typeOf === "delete" || typeOf === "checkIn" ? (
                  <>
                    <Pressable onPress={logoutButtonHandler}>
                      <View
                        style={[
                          CommonStyle.bg_498BEA,
                          CommonStyle.jc_center,
                          CommonStyle.ac_center,
                          styles.textYes,
                        ]}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[
                            CommonStyle.montserratBold,
                            CommonStyle.as_center,
                            CommonStyle.c_FFFFFF,
                          ]}
                        >
                          YES
                        </Text>
                      </View>
                    </Pressable>
                    <Pressable onPress={() => showWarningfalse()}>
                      <View
                        style={[
                          CommonStyle.pRelative,
                          CommonStyle.bg_FFFFFF,
                          CommonStyle.jc_center,
                          CommonStyle.as_center,
                          styles.textNo,
                          theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
                        ]}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[
                            CommonStyle.montserratBold,
                            CommonStyle.as_center,
                            theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_747B84,
                          ]}
                        >
                          NO
                        </Text>
                      </View>
                    </Pressable>
                  </>
                ) : (
                  <Pressable onPress={logoutButtonHandler}>
                    <View style={[styles.textYes]}>
                      <Text
                        allowFontScaling={false}
                        style={[
                          styles.textOk,
                          CommonStyle.c_FFFFFF,
                          styles.textOkAlign,
                          theme
                            ? { ...styles.text, ...CommonStyle.c_FFFFFF }
                            : {
                                ...CommonStyle.c_000000,
                                ...styles.text,
                              },
                        ]}
                      >
                        OK
                      </Text>
                    </View>
                  </Pressable>
                )}
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  warning_modal: {
    width: "86%",
    height: height / 4.5,
    borderRadius: 7,
  },
  modal_heading: {
    overflow: "hidden",
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: "30%",
    paddingLeft: "5%",
  },
  textheading: {
    fontSize: width / 18,
    marginLeft: "10%",
    bottom: "16%",
  },
  modal_body: {
    margin: "5%",
  },
  text: {
    fontSize: width / 26,
  },
  textYes: {
    fontSize: width / 22,
    margin: "5%",
    marginRight: 20,
    marginBottom: "0%",
    borderWidth: 2,
    borderColor: "#498BEA",
    fontWeight: "bold",
    borderRadius: 4,
    height: height / 21.5,
    width: width / 5.8,
  },
  warningIcon: {
    top: "30%",
  },
  textOk: {
    fontWeight: "bold",
  },
  lightcontainer1: {
    borderColor: "#498BEA",
  },
  textOkAlign: {
    textAlign: "center",
    paddingTop: "14%",
  },
  padText: {
    paddingLeft: "32%",
    paddingTop: "5%",
    width: "100%",
  },
  margBox: {
    marginTop: "20%",
  },
  OkText: {
    alignSelf: "center",
    color: "white",
    fontWeight: "bold",
  },
  antDesignStyle: {
    color: "white",
    fontSize: 20,
    alignItems: "center",
    justifyContent: "center",
    top: "30%",
  },
  viewStyle: {
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  textNo: {
    fontSize: width / 22,
    marginTop: "7%",
    color: "grey",
    borderWidth: 2,
    borderColor: "#498BEA",
    height: height / 21.5,
    width: width / 5.8,
    fontWeight: "bold",
    borderRadius: 4,
  },
  exclamationMark: {
    top: "30%",
  },
});

export default CommonModal;
