import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Linking,
  BackHandler
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { appImage } from "../../../data/ImageData";
import CommonStyle from "../../../styles/Global";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import Nav from "../../../shared/Nav";
import Styles from "../../../styles/Styles";
import { Text, View } from "../../../shared/Themed";
import Toast from "../../../shared/toast";
import useColorScheme from "../../../hooks/useColorScheme";
import Header from "../../../shared/Header";
import { svgImports } from "../../../data/Imports";
import { AppDataObject2 } from "../../../../types";
import { bookmarkScreenStyles } from "./BookmarkScreenStyles";

const BookmarkScreen = (props: { navigation: any }) => {
  const [bookmark, setBookmark] = useState<AppDataObject2[]>([]);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMesage] = useState("Bookmark Added");
  let { appData } = useContext(NeoContext);

  const colorScheme = useColorScheme();
  useEffect(() => {
    fetchBookmarkData();
  }, []);

  useEffect(() => {
    const backbuttonHander = () => {
        props.navigation.navigate("Home");
        return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  })

  const trimText = (desc: string) => {
    let newDesc = desc.split(" ");
    let res = "";
    for (let i = 0; i <= 7; i++) {
      res += newDesc[i] + " ";
    }
    return res + "...";
  };
  const fetchBookmarkData = async () => {
    let getData = await SecureStore.getItemAsync("bookmark");
    if (getData != null) {
      setBookmark(JSON.parse(getData));
    }
  };
  const handleClick = async (
    name: string,
    url: string,
    source: string,
    darksource: string | null,
    navig: string,
    description: string,
    isSelected: boolean,
    isToken: boolean,
    id: number
  ) => {
    const app = {
      name: name,
      url: url,
      source: source,
      dark_source: darksource,
      navig: navig,
      description: description,
      isSelected: isSelected,
      isToken: isToken,
      id: id,
    };
    {
      appData.map((data: AppDataObject2) => {
        if (app.name == data.name) {
          data.is_selected = false;
          setToastMesage("Bookmark Removed");
          setToastActive(true);
          setTimeout(() => {
            setToastActive(false);
          }, 800);
        }
      });
    }
    let updatedBookmark = bookmark.filter(
      (e: AppDataObject2) => e.name != name
    );
    await SecureStore.setItemAsync("bookmark", JSON.stringify(updatedBookmark));
    setBookmark(updatedBookmark);
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
      {toastActive && <Toast message={toastMessage} />}
      <Header title="Bookmarked Apps" type="Back" />
      {bookmark.length > 0 ? (
        <>
          <FlatList
            data={bookmark}
            contentContainerStyle={bookmarkScreenStyles.list}
            renderItem={({ item }) => {
              return (
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
                      Linking.openURL(item.url).catch((err) => {
                        Linking.openURL(
                          `http://play.google.com/store/apps/details?id=${item.url}`
                        ).catch((err) =>
                          console.error("An error occurred", err)
                        );
                      });
                    } else {
                      props.navigation.navigate(item.navig as never, {
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
                        style={bookmarkScreenStyles.icon}
                      />
                    </View>
                    <View
                      style={[
                        CommonStyle.pAbsolute,
                        Styles.modalTextContainer,
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
                    >
                      <Nav
                        name={item.name}
                        navig={item.navig}
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
                        isToken={item.isToken}
                      />
                    </View>
                    <View
                      style={[
                        CommonStyle.pAbsolute,
                        Styles.modalDescriptionContainer,
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
                        {trimText(item.description)}
                      </Text>
                    </View>
                    <View
                      style={[
                        CommonStyle.bg_1C2024,
                        CommonStyle.pAbsolute,
                        Styles.SaveBtn,
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
                    >
                      <TouchableOpacity
                        onPress={() => {
                          handleClick(
                            item.name,
                            item.url,
                            item.source,
                            item.dark_source,
                            item.webview,
                            item.description,
                            item.isToken,
                            (item.is_selected = !item.is_selected),
                            item.id
                          );
                        }}
                      >
                        <svgImports.Star size={22} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      ) : (
        <>
          <View
            style={[
              CommonStyle.as_center,
              CommonStyle.jc_center,
              CommonStyle.bg_1C2024,
              bookmarkScreenStyles.GenericMsgCntr,
              colorScheme === "dark"
                ? { ...CommonStyle.bg_1C2024, ...CommonStyle.c_FFFFFF }
                : { ...CommonStyle.bg_FAFAFB, ...CommonStyle.c_000000 },
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserrat,
                CommonStyle.as_center,
                CommonStyle.c_747B84,
                bookmarkScreenStyles.genericMsg,
              ]}
            >
              No Bookmarked Apps
            </Text>
          </View>
        </>
      )}
    </View>
  );
};
export default BookmarkScreen;
