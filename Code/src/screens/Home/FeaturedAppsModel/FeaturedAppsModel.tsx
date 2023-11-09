import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  Image,
  FlatList,
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
import { featuredModelsStyles } from "./FeaturesAppsModelStyles";

const FeaturedeAppsModel = (props: any) => {
  const [bookmark, setBookmark] = useState<AppDataObject[]>([]);
  const [toastActive, setToastActive] = useState(false);
  const [toastMessage, setToastMesage] = useState("Bookmark Added");
  let { appData } = useContext(NeoContext);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      fetchBookmarkData();
    });
  }, [props.navigation]);

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
  bookmark.map((bookmarkApp: AppDataObject) => {
    appData.map((app: AppDataObject) => {
      if (bookmarkApp.name == app.name) {
        app.is_selected = true;
      }
    });
  });
  let allBookmark: AppDataObject[] = [];
  const colorScheme = useColorScheme();

  type AppDataObject = {
    dark_source: string;
    description: string;
    is_selected: boolean;
    name: string;
    navig: string;
    source: string;
    url: string;
  };

  let fetchBookmarkData = async () => {
    const getData = await SecureStore.getItemAsync("bookmark");
    if (getData != null) {
      setBookmark(JSON.parse(getData));
      allBookmark = [...bookmark];
    }
    let showData = allBookmark.filter(
      (bokkMarkApp: AppDataObject) => bokkMarkApp.is_selected == true
    );
    allBookmark = [...showData, appData];
  };

  const handleClick = async (
    name: string,
    url: string,
    source: string,
    darksource: string,
    navig: string,
    description: string,
    isSelected: boolean,
    id: number
  ) => {
    const apps = {
      name: name,
      url: url,
      source: source,
      dark_source: darksource,
      navig: navig,
      description: description,
      is_selected: isSelected,
      id: id,
    };
    let updatedBookmark: AppDataObject[] | [] = [...bookmark, apps];
    if (isSelected == true) {
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
        (bookMarkApp: AppDataObject) => bookMarkApp.name != name
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
      {toastActive && <Toast message={toastMessage} />}
      <Header title="Featured Apps" type="Back" />
      <FlatList
        data={appData}
        contentContainerStyle={featuredModelsStyles.flatListContainer}
        renderItem={({ item }) => (
          <>
            {item.is_slider_list && (
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
                      ).catch((err) => console.error("An error occurred", err));
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
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate(
                          item.navig as never,
                          {
                            url: item.url,
                            name: item.name,
                            description: item.description,
                            source: item.source,
                            darksource: item.dark_source,
                            Screenshots: item.screenshots,
                            size: item.size,
                            category: item.category,
                            id: item.id,
                          } as never
                        )
                      }
                    >
                      <Image
                        source={
                          colorScheme === "dark"
                            ? item.dark_source
                              ? appImage[item.dark_source]
                              : appImage[item.source]
                            : appImage[item.source]
                        }
                        style={featuredModelsStyles.icons}
                      />
                    </TouchableOpacity>
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
                      {trimText(item.description)}
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
                          item.dark_source,
                          item.webview,
                          item.description,
                          (item.is_selected = !item.is_selected),
                          item.id
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

export default FeaturedeAppsModel;
