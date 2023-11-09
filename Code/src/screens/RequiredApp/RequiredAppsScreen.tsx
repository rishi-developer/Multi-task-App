import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Linking,
  Platform,
  BackHandler,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { appImage } from "../../data/ImageData";
import CommonStyle from "../../styles/Global";
import Header from "../../shared/Header";
import { NeoContext } from "../../NeoProvider/NeoProvider";
import Nav from "../../shared/Nav";
import Styles from "../../styles/Styles";
import { Text, View } from "../../shared/Themed";
import Toast2 from "../../shared/toast";
import useColorScheme from "../../hooks/useColorScheme";
import { svgImports } from "../../data/Imports";
import { AppDataObject3 } from "../../../types";

const RequiredAppsScreen = (props: any) => {
  let { appData, getLoginDetails, fetchAppData }: any = useContext(NeoContext);
  const wid = Dimensions.get("window").width;
  const high = Dimensions.get("window").height;
  const [bookmark, setBookmark] = useState<AppDataObject3[]>([]);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMesage] = useState("Bookmark Added");
  const colorScheme = useColorScheme();

  bookmark.map((e: AppDataObject3) => {
    appData.map((app: AppDataObject3) => {
      if (e.name == app.name) {
        app.is_selected = true;
      }
    });
  });
  let allBookmark: AppDataObject3[] = [];
  const fetchBookmarkData = async () => {
    const getData = await SecureStore.getItemAsync("bookmark");
    if (getData != null) {
      setBookmark(JSON.parse(getData));
      allBookmark = [...bookmark];
    }
    let showData = allBookmark.filter(
      (bookMarkApp: AppDataObject3) => bookMarkApp.is_selected == true
    );
    allBookmark = [...showData, appData];
  };

  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchBookmarkData();
    });
  }, [props.navigation]);
  const handleClick = async (
    name: string,
    url: string,
    source: string,
    dark_source: string,
    navig: string,
    description: string,
    is_selected: boolean
  ) => {
    const apps = {
      name: name,
      url: url,
      source: source,
      dark_source: dark_source,
      navig: navig,
      description: description,
      is_selected: is_selected,
    };
    let updatedBookmark: AppDataObject3[] = [...bookmark, apps];
    if (is_selected == true) {
      await SecureStore.setItemAsync(
        "bookmark",
        JSON.stringify(updatedBookmark)
      );
      setBookmark(updatedBookmark);

      setToastMesage("Bookmark Added");
      setToastActive(true);
      setTimeout(() => {
        setToastActive(false);
      }, 800);
    } else {
      updatedBookmark = bookmark.filter(
        (bookMarkApp: AppDataObject3) => bookMarkApp.name != name
      );
      await SecureStore.setItemAsync(
        "bookmark",
        JSON.stringify(updatedBookmark)
      );
      setBookmark(updatedBookmark);
      setToastMesage("Bookmark Removed");
      setToastActive(true);
      setTimeout(() => {
        setToastActive(false);
      }, 800);
    }
    let getData = await SecureStore.getItemAsync("bookmark");
    if (getData != null) {
      setBookmark(JSON.parse(getData));
      updatedBookmark = [...bookmark];
    }
  };
  return (
    <View
      style={[
        CommonStyle.flex1,
        colorScheme == "dark"
          ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
          : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
      ]}
    >
      <Header title="Required Apps" type="Back" />
      {toastActive && <Toast2 message={toastMessage} />}
      <FlatList
        contentContainerStyle={{ paddingBottom: high / 9 }}
        data={appData}
        renderItem={({ item }) => (
          <>
            {item.is_required && (
              <TouchableOpacity
                onPress={() => {
                  if (
                    item.name == "Teams" ||
                    item.name == "Microsoft Teams" ||
                    item.name == "Authenticator" ||
                    item.name == "Asana" ||
                    item.name == "Microsoft Outlook" ||
                    item.name == "Trello" ||
                    item.name == "Webex" ||
                    item.name == "Zoom"
                  ) {
                    Platform.OS == "ios" && item.appstoreid.length > 0
                      ? Linking.openURL(
                          `https://apps.apple.com/us/app/id${item.appstoreid}`
                        )
                      : Linking.openURL(
                          item.name == "Microsoft Outlook"
                            ? `ms-outlook://emails`
                            : item.url
                        ).catch((err) => {
                          Linking.openURL(
                            `http://play.google.com/store/apps/details?id=${item.url}`
                          ).catch((err) =>
                            console.error("An error occurred", err)
                          );
                        });
                  } else {
                    props.navigation.navigate(item.webview as never, {
                      url: `${item.url}`,
                      name: item.name,
                      description: item.description,
                      source: item.source,
                      darksource: item.dark_source,
                      Screenshots: item.screenshots,
                      size: item.size,
                      category: item.category,
                      id: item.id,
                    });
                  }
                }}
              >
                <View
                  style={[
                    Styles.AppCntr,
                    colorScheme === "dark"
                      ? {
                          ...CommonStyle.bg_1C2024,
                          ...CommonStyle.c_FFFFFF,
                          ...CommonStyle.border_cr_0b0b0b,
                        }
                      : {
                          ...CommonStyle.bg_FAFAFB,
                          ...CommonStyle.c_000000,
                          ...CommonStyle.border_cr_F4F4F4,
                        },
                  ]}
                >
                  <View
                    style={[
                      CommonStyle.jc_center,
                      Styles.modalimagecontainers,
                      colorScheme === "dark"
                        ? {
                            ...CommonStyle.bg_2E343C,
                            ...Styles.darkmodalimagecontainers,
                          }
                        : CommonStyle.bg_FFFFFF,
                    ]}
                  >
                    <Image
                      source={
                        colorScheme === "dark"
                          ? item.dark_source
                            ? appImage[item.dark_source]
                            : appImage[item.source]
                          : appImage[item.source]
                      }
                      style={{
                        width: wid / 8.72,
                        height: wid / 8.72,
                        alignSelf: "center",
                      }}
                    />
                  </View>
                  <View
                    style={[
                      CommonStyle.pAbsolute,
                      Styles.modalTextContainer,
                      colorScheme === "dark"
                        ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                        : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
                    ]}
                  >
                    <Nav
                      name={item.name}
                      navig={item.webview}
                      text={item.name}
                      url={item.url}
                      ContainerStyle={[
                        CommonStyle.montserratSemiBold,
                        Styles.modalText,
                        colorScheme === "dark"
                          ? {
                              ...CommonStyle.bg_1C2024,
                              ...CommonStyle.c_FFFFFF,
                            }
                          : {
                              ...CommonStyle.bg_FAFAFB,
                              ...CommonStyle.c_000000,
                            },
                      ]}
                      navigation={props.navigation}
                      isToken={item.is_token}
                    />
                  </View>
                  <View
                    style={[
                      CommonStyle.pAbsolute,
                      Styles.modalDescriptionContainer,
                      colorScheme === "dark"
                        ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                        : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        Styles.modalDescriptionText,
                        colorScheme === "dark"
                          ? {
                              ...CommonStyle.c_D0D0D2,
                              ...CommonStyle.bg_1C2024,
                            }
                          : {
                              ...CommonStyle.c_858C94,
                              ...CommonStyle.bg_FAFAFB,
                            },
                      ]}
                    >
                      {item.sub_description}
                    </Text>
                  </View>
                  <View
                    style={[
                      CommonStyle.bg_1C2024,
                      CommonStyle.pAbsolute,
                      Styles.SaveBtn,
                      colorScheme === "dark"
                        ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                        : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        handleClick(
                          item.name,
                          item.url,
                          item.source,
                          item.darksource,
                          item.webview,
                          item.sub_description,
                          (item.is_selected = !item.is_selected)
                        );
                      }}
                    >
                      {item.is_selected ? (
                        <svgImports.Star size={22} />
                      ) : (
                        <svgImports.StarOutline size={22} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </>
        )}
      />
    </View>
  );
};
export default RequiredAppsScreen;
