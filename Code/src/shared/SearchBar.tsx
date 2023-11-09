import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CommonStyles from "../styles/Global";
const height = Dimensions.get("window").height;
import useColorScheme from "../hooks/useColorScheme";

const SearchBar = ({
  value,
  onChangeText,
  onClear,
  placeholder,
  openInputModal,
  typeOf,
}: any) => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={[styles.searchBarContainer, typeOf == "attendee" && styles.w_40]}
    >
      <TextInput
        allowFontScaling={false}
        value={value}
        onChangeText={onChangeText}
        style={[
          styles.searchBar,
          CommonStyles.as_center,
          CommonStyles.montserrat,
          typeOf === "normal" && styles.ml_5,
          typeOf === "event" ? styles.left0 : styles.left40,
          typeOf === "attendee" ? styles.mb_0 : styles.mb_6,
          typeOf === "attendee"
            ? styles.searchAttendeesText
            : CommonStyles.fs_13,
          openInputModal === null
            ? typeOf === "event"
              ? CommonStyles.w100
              : typeOf === "attendee"
              ? CommonStyles.w90
              : CommonStyles.w90
            : CommonStyles.w75,
          colorScheme === "dark"
            ? styles.darkInputBackground
            : styles.lightInputBackground,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colorScheme === "dark" ? "#D1D0D0" : "#8E8E93"}
      />

      {value ? (
        <AntDesign
          name="close"
          size={20}
          color="#8E8E93"
          onPress={onClear}
          style={[
            styles.clearIcon,
            CommonStyles.as_center,
            typeOf == "attendee" && styles.m_2,
            openInputModal === null
              ? typeOf === "event"
                ? styles.right2
                : typeOf === "attendee"
                ? styles.right4
                : styles.right8
              : styles.right22,
          ]}
        />
      ) : (
        <Image
          source={require("../../assets/images/wrapper.png")}
          style={[
            styles.clearIcon,
            openInputModal === null
              ? typeOf === "event"
                ? styles.right4
                : typeOf === "attendee"
                ? styles.right4
                : styles.right8
              : styles.right22,
          ]}
        ></Image>
      )}

      {openInputModal === null ? null : (
        <TouchableOpacity
          onPress={() => {
            openInputModal();
          }}
          style={[
            styles.left83,
            CommonStyles.ai_center,
            CommonStyles.jc_center,
          ]}
        >
          <Image
            source={require("../../assets/images/notes1.png")}
            style={styles.NoteImg}
          ></Image>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchAttendeesText: {
    fontSize: 10.5,
  },
  w_40: {
    width: "40%",
  },
  searchBarContainer: {
    flexDirection: "row",
  },
  searchBar: {
    height: height / 20,
    borderWidth: 1,
    paddingLeft: 9,
    paddingBottom: 8,
    paddingTop: 7,
    borderRadius: 6,
  },
  ml_5: {
    marginLeft: 5,
  },
  mb_6: {
    marginBottom: 6,
  },
  mb_0: {
    marginBottom: 0,
  },
  m_2: {
    paddingTop: 2.5,
  },
  clearIcon: {
    position: "absolute",
    marginTop: 8,
    justifyContent: "center",
    width: height / 35,
    height: height / 35,
  },
  darkInputBackground: {
    backgroundColor: "#3C444E",
    borderColor: "#3C444E",
    color: "#D1D0D0",
  },
  lightInputBackground: {
    backgroundColor: "rgba(241, 241, 241, 0.5)",
    borderColor: "#F3F3F3",
    color: "#8E8E93",
  },
  NoteImg: {
    tintColor: "#498BEA",
    width: 35,
    height: 40,
  },
  left0: {
    left: "0%",
  },
  left40: {
    left: "40%",
  },
  left83: {
    left: "83.2%",
  },
  right2: {
    right: "2%",
  },
  right4: {
    right: "4%",
  },
  right8: {
    right: "8%",
  },
  right22: {
    right: "22%",
  },
});

export default SearchBar;
