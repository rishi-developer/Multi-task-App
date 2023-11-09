import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import useColorScheme from "../hooks/useColorScheme";
import CommonStyle from "../styles/Global";
import Styles from "../styles/Styles";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, type, NotesBackButton, name }: any) => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  let theme = colorScheme == "dark";
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View>
      {type == "Back" && (
        <View
          style={[
            CommonStyle.w100,
            CommonStyle.as_center,
            CommonStyle.flexDRow,
            Styles.HeaderCntr,
            colorScheme == "dark"
              ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
              : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
          ]}
        >
          <View
            style={[
              CommonStyle.ai_center,
              CommonStyle.bg_trans,
              Styles.arrowImg,
            ]}
          >
            <TouchableOpacity
              style={[
                CommonStyle.ai_center,
                CommonStyle.jc_center,
                Styles.leftArrow,
              ]}
              onPress={goBack}
            >
              <FontAwesome
                name="arrow-left"
                style={[
                  Styles.BackBtn,
                  colorScheme === "dark"
                    ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                    : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
                ]}
              ></FontAwesome>
            </TouchableOpacity>
          </View>

          <View
            style={[
              CommonStyle.jc_flexStart,
              Styles.HeaderTxtCntr,
              colorScheme === "dark"
                ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                CommonStyle.ta_center,
                Styles.Headertext,
                colorScheme === "dark"
                  ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                  : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
              ]}
            >
              {title}
            </Text>
          </View>
        </View>
      )}
      {type == "BottomTab" && (
        <View
          style={[
            CommonStyle.bg_FFFFFF,
            CommonStyle.ai_center,
            theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View
            style={[
              CommonStyle.w100,
              CommonStyle.ai_center,
              CommonStyle.bg_FFFFFF,
              theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                CommonStyle.c_000000,
                CommonStyle.as_center,
                CommonStyle.ta_center,
                CommonStyle.fs_20,
                Styles.pageInfo,
                theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_484848,
              ]}
            >
              {title}
            </Text>
          </View>
        </View>
      )}
      {type == "Event" && (
        <View
          style={[
            Styles.Eventheader,
            CommonStyle.as_center,
            CommonStyle.jc_center,
            colorScheme == "dark"
              ? CommonStyle.bg_1B1F23
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View style={[Styles.headerTitleCntr, CommonStyle.as_center]}>
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                Styles.headerTitle,
                CommonStyle.as_center,
                colorScheme == "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_474749,
              ]}
            >
              {title}
            </Text>
          </View>
          {/* {iSGuestUser == false && (
            <TouchableOpacity
              style={[
                styles.backBtnCntr,
                CommonStyle.as_Fend,
                CommonStyle.pAbsolute,
              ]}
              onPress={() => {
                navigation.navigate("AddUser");
              }}
            >
              <svgImports.AddUser
                size={18}
                color={colorScheme == "dark" ? "#D1D0D0" : "#474749"}
              />
            </TouchableOpacity>
          )} */}
        </View>
      )}
      {type == "Notes" && (
        <View
          style={[
            CommonStyle.bg_FFFFFF,
            CommonStyle.ai_center,
            theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View
            style={[
              CommonStyle.w100,
              CommonStyle.ai_center,
              CommonStyle.bg_FFFFFF,
              CommonStyle.flexDRow,
              CommonStyle.jc_spaceBTW,
              theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
            ]}
          >
            <TouchableOpacity
              style={[
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                { height: 50, width: 50 },
              ]}
              onPress={NotesBackButton}
            >
              <FontAwesome
                name="arrow-left"
                style={[
                  CommonStyle.fs_20,
                  theme ? CommonStyle.c_FFFFFF : CommonStyle.c_000000,
                ]}
              ></FontAwesome>
            </TouchableOpacity>

            <View style={{ height: 50, justifyContent: "center" }}>
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratBold,
                  CommonStyle.c_000000,
                  CommonStyle.as_center,
                  CommonStyle.ta_center,
                  Styles.pageInfo,
                  theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_484848,
                  { padding: 5 },
                ]}
              >
                Add Your Note
              </Text>
            </View>

            <View
              style={[
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                { height: 50, width: 50 },
              ]}
            ></View>
          </View>
        </View>
      )}
      {type == "Files" && (
        <View
          style={[
            CommonStyle.w100,
            CommonStyle.as_center,
            CommonStyle.flexDRow,
            Styles.HeaderCntr,
            colorScheme == "dark"
              ? CommonStyle.bg_1B1F23
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View
            style={[
              CommonStyle.ai_center,
              CommonStyle.bg_trans,
              Styles.arrowImg,
            ]}
          >
            <TouchableOpacity
              style={[
                CommonStyle.ai_center,
                CommonStyle.jc_center,
                Styles.leftArrow,
              ]}
              onPress={goBack}
            >
              <FontAwesome
                name="arrow-left"
                style={[
                  Styles.BackBtn,
                  colorScheme === "dark"
                    ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                    : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
                ]}
              ></FontAwesome>
            </TouchableOpacity>
          </View>

          <View
            style={[
              CommonStyle.jc_flexStart,
              Styles.HeaderTxtCntr,
              colorScheme == "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                CommonStyle.ta_center,
                Styles.Headertext,
                colorScheme === "dark"
                  ? { ...CommonStyle.bg_1B1F23, ...CommonStyle.c_FFFFFF }
                  : { ...CommonStyle.bg_FFFFFF, ...CommonStyle.c_000000 },
              ]}
            >
              {title}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
