import React, { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
  Button,
  Linking,
} from "react-native";
import { loginScreenStyles } from "./LoginScreenStyles";
import { BarCodeScanner } from "expo-barcode-scanner";
import { CLIENT_ID, TENET_ID } from "@env";
import * as AuthSession from "expo-auth-session";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import CommonStyle from "../../../styles/Global";
import { guestLogin } from "../../../services/apiInterceptors";
import useColorScheme from "../../../hooks/useColorScheme";
import UserDetailApiService from "../../../services/api/UserApi/userApiServices";
WebBrowser.maybeCompleteAuthSession();
const darkThemeBackgroundImage = require("../../../../assets/images/DarkBackgroundImage.png");
const darkThemeLogoImage = require("../../../../assets/images/DarkLogo.png");
const lightThemeBackgroundImage = require("../../../../assets/images/bglogo.png");
const lightThemeLogoImage = require("../../../../assets/images/loginLogo.png");

export default function LoginScreen(props: any) {
  const colorScheme = useColorScheme();
  const [discovery, setDiscovery]: any = useState({});
  const [authRequest, setAuthRequest]: any = useState({});
  const [authorizeResult, setAuthorizeResult]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const scopes = ["openid", "profile", "email", "offline_access"];
  const domain = `https://login.microsoftonline.com/${TENET_ID}/v2.0`;
  const userService = new UserDetailApiService();
  const redirectUrl = AuthSession.makeRedirectUri({
    scheme: "myapp",
    path: "redirect",
  });

  useEffect(() => {
    getData();
  });
  const getData = async () => {
    try {
      const value = await SecureStore.getItemAsync("isGuestUser");
      if (value && value === "true") {
        await getGuestUserData();
      } else {
        await getUserData();
      }
    } catch (error:any) {
      console.log(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const value = await SecureStore.getItemAsync("access_token")
        if (value) {
          await SecureStore.deleteItemAsync("GuestUser");
          await props.navigation.navigate("Root");
        }
      }
    catch (error:any) {
      console.log(error.message);
    }
  };

  const getGuestUserData = async () => {
    try {
      const value = await SecureStore.getItemAsync("GuestUser");
      if (value) {
        const guestUserData = JSON.parse(value);
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("userDetails");
        const userPayload = {
          email: guestUserData.emailId,
          isGuestUser: true,
        };
        const res = await userService.getToken(userPayload);
        await guestLogin(res.data.token);
        props.navigation.navigate("Root", { screen: "Events" });
      }
    } catch (error:any) {
      console.log(error.message);
    }
  };
  
  useEffect(() => {
    const getSession = async () => {
      const d = await AuthSession.fetchDiscoveryAsync(domain);

      const authRequestOptions: AuthSession.AuthRequestConfig = {
        responseType: AuthSession.ResponseType.Code,
        scopes: scopes,
        usePKCE: true,
        clientId: CLIENT_ID,
        redirectUri: redirectUrl,
      };

      const authRequest = new AuthSession.AuthRequest(authRequestOptions);
      setAuthRequest(authRequest);
      setDiscovery(d);
    };
    getSession();
  }, []);

  useEffect(() => {
    const getCodeExchange = async () => {
      const tokenResult = await AuthSession.exchangeCodeAsync(
        {
          code: authorizeResult.params.code,
          clientId: CLIENT_ID,
          redirectUri: redirectUrl,
          extraParams: {
            code_verifier: authRequest.codeVerifier || "",
          },
        },
        discovery
      );
      const { accessToken, refreshToken }: any = tokenResult;
      storeData(accessToken, refreshToken);
    };

    if (authorizeResult && authorizeResult.type == "error") {
      //Handle error
    }

    if (
      authorizeResult &&
      authorizeResult.type == "success" &&
      authRequest &&
      authRequest.codeVerifier
    ) {
      setIsLoading(true);
      getCodeExchange();
    }
  }, [authorizeResult, authRequest]);
  const storeData = async (token: string, refreshToken: string) => {
    try {
      await SecureStore.setItemAsync("access_token", token);
      await SecureStore.setItemAsync("refresh_token", refreshToken);

      props.navigation.navigate("Root");
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };
  const [askPermissionAgain, setAskPermissionAgain] = useState(false);
  const [hasPermission, setHasPermission] = useState("null");
  const askForCameraPermission = async () => {
    const { status, canAskAgain } =
      await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted" ? "true" : "false");
    setAskPermissionAgain(canAskAgain);
  };

  const openPermissionHandler = () => {
    Linking.openSettings();
    askForCameraPermission();
  };
  useEffect(() => {
    askForCameraPermission();
  }, []);

  return (
    <>
      {isLoading ? (
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
      ) : hasPermission === "false" ? (
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.jc_center,
            CommonStyle.ai_center,
          ]}
        >
          <Text style={[CommonStyle.as_center, loginScreenStyles.alignCenter]}>
            No access to camera
          </Text>
          <Button
            title="Allow Camera"
            onPress={() =>
              askPermissionAgain
                ? askForCameraPermission()
                : openPermissionHandler()
            }
          />
        </View>
      ) : (
        <View
          style={[
            CommonStyle.flex1,
            colorScheme === "dark"
              ? CommonStyle.bg_1C2024
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <ImageBackground
            source={
              colorScheme === "dark"
                ? darkThemeBackgroundImage
                : lightThemeBackgroundImage
            }
            style={[loginScreenStyles.background, CommonStyle.w100, CommonStyle.h100]}
            imageStyle={{
              resizeMode: "contain",
            }}
          >
            <View
              style={[
                CommonStyle.w100,
                CommonStyle.h100,
                CommonStyle.jc_center,
              ]}
            >
              <View style={[CommonStyle.ai_center, CommonStyle.jc_center]}>
                <Image
                  source={
                    colorScheme === "dark"
                      ? darkThemeLogoImage
                      : lightThemeLogoImage
                  }
                  style={[CommonStyle.pAbsolute, loginScreenStyles.logo]}
                />
              </View>
              <View style={[loginScreenStyles.btnContainer, CommonStyle.ai_center]}>
                <View style={[CommonStyle.jc_center]}>
                  <TouchableOpacity
                    style={loginScreenStyles.buttonSign}
                    onPress={async () => {
                      const authorizeResult = await authRequest.promptAsync(
                        discovery
                      );

                      setAuthorizeResult(authorizeResult);
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.fs_15,
                        CommonStyle.ta_center,
                        CommonStyle.c_FFFFFF,
                        loginScreenStyles.btnText,
                      ]}
                    >
                      Sign In with Gemini ID
                    </Text>
                  </TouchableOpacity>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.montserrat,
                      CommonStyle.ta_center,
                      CommonStyle.fs_15,
                      loginScreenStyles.ortext,
                      colorScheme == "dark" && CommonStyle.c_D1D0D0,
                    ]}
                  >
                    or
                  </Text>
                  <TouchableOpacity
                    style={[CommonStyle.bg_FFFFFF, loginScreenStyles.buttonSign]}
                    onPress={async () => {
                      props.navigation.navigate("Guest");
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.montserrat,
                        CommonStyle.fs_15,
                        CommonStyle.ta_center,
                        CommonStyle.c_FFFFFF,
                        loginScreenStyles.btnText,
                      ]}
                    >
                      Sign In with Guest Id
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}
    </>
  );
}


