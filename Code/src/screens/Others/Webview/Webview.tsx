import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { webviewStyles } from "./WebviewStyles";
import { WebView } from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import Common from "../../../styles/Global";
import Styles from "../../../styles/Styles";
import { FontAwesome } from "@expo/vector-icons";
import CommonStyle from "../../../styles/Global";
import useColorScheme from "../../../hooks/useColorScheme";

const Webview = ({ route, navigation }: any) => {
  let WebViewRef: WebView<{
    style: ({ backgroundColor: string } | { marginBottom: number })[];
    source: { uri: never };
    startInLoadingState: true;
    ref: unknown;
    renderError: unknown;
    renderLoading: () => JSX.Element;
  }> | null;
  const colorScheme = useColorScheme();
  let theme = colorScheme == "dark";

  const goBack = () => {
    navigation.goBack();
  };
  let { url, name, isToken } = route.params;
  let newUrl: string;
  const [conrtiUrl, setContriUrl] = useState(null);
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backbuttonHander);
    };
  });
  // const updateUrl = async () => {
  //   if (isToken === "true") {
  //     await SecureStore.getItemAsync("access_token").then(
  //       (value: string | null) => {
  //         if (value != null) {
  //           newUrl = `${url}?token=${value}`;
  //         }
  //       }
  //     );
  //     url = newUrl;
  //     setContriUrl(url);
  //   } else {
  //     setContriUrl(url);
  //   }
  // };

  const updateUrl = async () => {
    if (isToken === "true") {
      const value = await SecureStore.getItemAsync("access_token");
      if (value !== null) {
        newUrl = `${url}?token=${value}`;
        url = newUrl;
        setContriUrl(url);
      }
    } else {
      setContriUrl(url);
    }
  };

  useEffect(() => {
    updateUrl();
  }, []);
  return (
    <>
      {conrtiUrl != null ? (
        <View
          style={[
            CommonStyle.flex1,
            colorScheme == "dark"
              ? CommonStyle.bg_1C2024
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View
            style={[
              CommonStyle.w100,
              CommonStyle.as_center,
              CommonStyle.flexDRow,
              CommonStyle.jc_spaceBTW,
              Styles.HeaderCntr1,
              colorScheme == "dark"
                ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                : { ...CommonStyle.bg_FFFFFF, ...CommonStyle.c_000000 },
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
                      : { ...CommonStyle.bg_FFFFFF, ...CommonStyle.c_000000 },
                  ]}
                ></FontAwesome>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                WebViewRef && WebViewRef.reload();
              }}
              style={[
                CommonStyle.jc_flexStart,
                Styles.HeaderTxtCntr,
                colorScheme === "dark"
                  ? { ...CommonStyle.bg_1C2024 }
                  : { ...CommonStyle.bg_FFFFFF },
              ]}
            >
              <FontAwesome
                name="rotate-right"
                style={[
                  Styles.reloadBtn,
                  colorScheme === "dark"
                    ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                    : { ...CommonStyle.bg_FFFFFF, ...CommonStyle.c_000000 },
                ]}
              ></FontAwesome>
            </TouchableOpacity>
          </View>
          <WebView
            style={[CommonStyle.bg_FFFFFF, { marginBottom: 40 }]}
            source={{ uri: conrtiUrl }}
            startInLoadingState={true}
            ref={(WEBVIEW_REF) => (WebViewRef = WEBVIEW_REF)}
            renderError={(errorDomain, errorCode, errorDesc) => {
              return (
                <View
                  style={[
                    Common.pAbsolute,
                    Common.flex1,
                    Common.jc_center,
                    Common.ai_center,
                    Common.h100,
                    Common.w100,
                    Common.bg_FFFFFF,
                  ]}
                >
                  <ActivityIndicator
                    color={"#666592"}
                    size={"large"}
                    style={[Common.pAbsolute, webviewStyles.loader]}
                  />
                </View>
              );
            }}
            renderLoading={() =>
              name != "Feedback form" ? (
                <ActivityIndicator
                  color={"#666592"}
                  size={"large"}
                  style={webviewStyles.loader}
                />
              ) : (
                <></>
              )
            }
          />
        </View>
      ) : (
        <ActivityIndicator></ActivityIndicator>
      )}
    </>
  );
};

export default Webview;
