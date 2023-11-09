import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  TextInput,
  BackHandler,
  Alert,
  Platform,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { guestLoginStyles } from "./GuestLoginStyles";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import CommonStyle from "../../../styles/Global";
import GuestApiService from "../../../services/api/GuestApi/guestApiServices";
import { guestLogin } from "../../../services/apiInterceptors";
import useColorScheme from "../../../hooks/useColorScheme";
import UserDetailApiService from "../../../services/api/UserApi/userApiServices";
const lightThemeBackgroundImage = require("../../../../assets/images/bglogo.png");
const lightThemeLogoImage = require("../../../../assets/images/loginLogo.png");
const darkThemeBackgroundImage = require("../../../../assets/images/DarkBackgroundImage.png");
const darkThemeLogoImage = require("../../../../assets/images/DarkLogo.png");

export default function GuestLogin({ navigation }: any) {
  const userService = new UserDetailApiService();
  const colorScheme = useColorScheme();
  const [userMailId, setUserMailId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [isGuestLoading, setGuestLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({
    userMailId: false,
    userPassword: false,
  });
  let GuestService = new GuestApiService();
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Login");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  useEffect(() => {
    if (showWarning == true) {
      Alert.alert("Alert", "User is already logged in some other device", [
        {
          text: "Yes",
          onPress: () => {
            setShowWarning(false);
            setGuestLoading(false);
          },
        },
      ]);
    }
  }, [showWarning]);

  useEffect(() => {
    const checkGuestUser = async () => {
      try {
        const res: any = await SecureStore.getItemAsync("GuestUser");
        const guestUserData = JSON.parse(res);
        const currDateAndTime: any = new Date();
        const guestLoginDate: any = new Date(guestUserData?.token);
        if (currDateAndTime - guestLoginDate > 3600000) {
          await SecureStore.deleteItemAsync("isGuestUser");
          await SecureStore.deleteItemAsync("GuestUser");
          await SecureStore.deleteItemAsync("EmailId");
          await SecureStore.deleteItemAsync("access_token");
          await SecureStore.deleteItemAsync("userDetails");
          navigation.navigate("Login");
        }
      } catch (err: any) {
        console.log(err.message);
      }
    };

    checkGuestUser();
  }, []);

  const continueInputHandler = async () => {
    if (userMailId.trim() == "" || userPassword.trim() == "") {
      setErrMsg({ userMailId: true, userPassword: true });
    } else {
      setGuestLoading(true);
      const userPayload = {
        email: userMailId,
        isGuestUser: true,
      };
      await userService.getToken(userPayload).then((res) => {
        guestLogin(res.data.token);
      });
      try {
        const res = await GuestService.login({
          username: userMailId,
          password: userPassword,
        });

        if (res.data.status == 403) {
          setErrMsg({ userMailId: true, userPassword: true });
          setGuestLoading(false);
        } else if (res.data.status == 400) {
          setErrMsg({ userMailId: false, userPassword: true });
          setGuestLoading(false);
        } else {
          let { token } = res.data;
          let currDAteAndTime: any = Date.now();
          let guestLoginDate: any = Date.parse(token.split("GMT")[0]);
          if (token == "" || currDAteAndTime - guestLoginDate > 3600000) {
            let token = new Date();
            await addToken(userMailId, token);
            let guestUser = {
              emailId: userMailId,
              isGuestUser: true,
              Events: [],
              token: token,
            };
            await SecureStore.deleteItemAsync("userDetails");
            await SecureStore.deleteItemAsync("access_token");
            await SecureStore.setItemAsync("isGuestUser", "true");
            await SecureStore.setItemAsync(
              "GuestUser",
              JSON.stringify(guestUser)
            );
            setShowWarning(false);
            setErrMsg({ userMailId: false, userPassword: false });
            navigation.navigate("Events");
          } else {
            setGuestLoading(false);
            setShowWarning(true);
          }
        }
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  async function addToken(id: any, token: any) {
    GuestService.updateGuestUser(id, token).catch((err) =>
      console.log(err.message)
    );
  }

  const renderScreen = () => {
    return (
      <SafeAreaView>
        <ScrollView>
          <View
            style={[
              CommonStyle.flex1,
              guestLoginStyles.headView,
              colorScheme == "dark"
                ? CommonStyle.bg_1C2024
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <ImageBackground
              source={
                colorScheme == "dark"
                  ? darkThemeBackgroundImage
                  : lightThemeBackgroundImage
              }
              style={[guestLoginStyles.background, CommonStyle.w100, CommonStyle.h100]}
              imageStyle={{
                resizeMode: "contain",
              }}
            >
              <View
                style={[
                  CommonStyle.w100,
                  CommonStyle.h100,
                  CommonStyle.flexDCol,
                  guestLoginStyles.body,
                ]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  style={[
                    guestLoginStyles.closeBtn,
                    CommonStyle.dflex,
                    CommonStyle.as_FStart,
                    CommonStyle.jc_flexStart,
                  ]}
                >
                  <FontAwesome
                    name="arrow-left"
                    style={[
                      guestLoginStyles.leftArrow,
                      colorScheme === "dark"
                        ? (CommonStyle.bg_1B1F23, CommonStyle.c_FFFFFF)
                        : (CommonStyle.bg_FFFFFF, CommonStyle.c_000000),
                    ]}
                  ></FontAwesome>
                </TouchableOpacity>
                <View
                  style={[
                    guestLoginStyles.formCntr,
                    CommonStyle.jc_center,
                    CommonStyle.dflex,
                    CommonStyle.w100,
                  ]}
                >
                  <View style={[CommonStyle.ai_center, CommonStyle.jc_center]}>
                    <Image
                      source={
                        colorScheme == "dark"
                          ? darkThemeLogoImage
                          : lightThemeLogoImage
                      }
                      style={[guestLoginStyles.logo, CommonStyle.pAbsolute]}
                    />
                  </View>
                  <View style={[guestLoginStyles.btnContainer, CommonStyle.ai_center]}>
                    <View style={guestLoginStyles.EmailField}>
                      <TextInput
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserrat,
                          CommonStyle.c_000000,
                          guestLoginStyles.Input,
                          colorScheme == "dark"
                            ? { color: "#D1D0D0" }
                            : { color: "black" },
                          errMsg.userMailId ? guestLoginStyles.errInputCntr : null,
                        ]}
                        placeholder="Enter your Username"
                        placeholderTextColor={
                          colorScheme == "dark" ? "#FFFFFF" : "#414249"
                        }
                        autoCapitalize="none"
                        value={userMailId}
                        onChangeText={(text) => {
                          setUserMailId(text);
                          setErrMsg({ userMailId: false, userPassword: false });
                        }}
                      />
                      {errMsg.userMailId && (
                        <Text
                          allowFontScaling={false}
                          style={[
                            CommonStyle.montserrat,
                            CommonStyle.fs_10,
                            guestLoginStyles.errMsg,
                          ]}
                        >
                          Invalid Credential
                        </Text>
                      )}
                    </View>
                    <View style={guestLoginStyles.EmailField}>
                      <TextInput
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserrat,
                          guestLoginStyles.Input,
                          colorScheme == "dark"
                            ? { color: "#D1D0D0" }
                            : { color: "black" },
                          errMsg.userMailId ? guestLoginStyles.errInputCntr : null,
                        ]}
                        placeholder="Password"
                        placeholderTextColor={
                          colorScheme == "dark" ? "#FFFFFF" : "#414249"
                        }
                        secureTextEntry
                        autoCapitalize="none"
                        value={userPassword}
                        onChangeText={(text) => {
                          setUserPassword(text);
                          setErrMsg({ userMailId: false, userPassword: false });
                        }}
                      />
                      {errMsg.userMailId && (
                        <Text
                          allowFontScaling={false}
                          style={[CommonStyle.montserrat, guestLoginStyles.errMsg]}
                        >
                          Invalid Credential
                        </Text>
                      )}
                      {errMsg.userMailId == false && errMsg.userPassword && (
                        <Text
                          allowFontScaling={false}
                          style={[CommonStyle.montserrat, guestLoginStyles.errMsg]}
                        >
                          Invalid Password
                        </Text>
                      )}
                    </View>
                    <View
                      style={[
                        guestLoginStyles.ContinuebtnContainer,
                        CommonStyle.ai_center,
                        CommonStyle.jc_center,
                      ]}
                    >
                      <TouchableOpacity
                        style={[guestLoginStyles.buttonCtn]}
                        onPress={continueInputHandler}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[
                            CommonStyle.montserrat,
                            CommonStyle.ta_center,
                            CommonStyle.c_FFFFFF,
                            guestLoginStyles.btnText,
                          ]}
                        >
                          Login
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <>
      {isGuestLoading ? (
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.jc_center,
            colorScheme === "dark"
              ? CommonStyle.bg_1C2024
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <ActivityIndicator size="large" color={"#666592"} />
        </View>
      ) : (
        <>
          {Platform.OS === "android" && renderScreen()}
          {Platform.OS === "ios" && (
            <KeyboardAvoidingView behavior="padding">
              {renderScreen()}
            </KeyboardAvoidingView>
          )}
        </>
      )}
    </>
  );
}
