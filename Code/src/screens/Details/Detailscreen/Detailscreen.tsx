import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  BackHandler,
  Platform,
  ActivityIndicator,
  RefreshControl,
  FlatList,
  Dimensions,
} from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import Swiper from "react-native-swiper";
import { FontAwesome } from "@expo/vector-icons";
import { appImage } from "../../../data/ImageData";
import CommonStyles from "../../../styles/Global";
import Nav from "../../../shared/Nav";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import {detailScreenStyles} from "./DetailscreenStyles";
import useColorScheme from "../../../hooks/useColorScheme";
import { ImageType, AppDataObject, appDocObj } from "../../../../types";
import Styles from "../../../styles/Styles";
import CommonStyle from "../../../styles/Global";
import { svgImports } from "../../../data/Imports";
const { height } = Dimensions.get("screen");

const Detailscreen = ({ navigation, route }: any) => {
  let {
    appData,
    fetchAppDocs,
    appDoc,
    setDetailsLoading,
    isDetailsLoading,
    isDummyUser,
    detailError,
  } = useContext(NeoContext);

  const [visible, setvisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [transparentLoader, setTransparentLoader] = useState(false);

  const emptyDataArray = ["No Data Found/Pull to refresh...."];
  const colorscheme = useColorScheme();
  const video = useRef(null);

  let index = appData.findIndex((app: AppDataObject) => {
    return app.name === route.params.name;
  });

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
  useEffect(() => {
    setDetailsLoading(true);
    fetchAppDocs(route.params.id);
  }, []);

  let onRefreshFunction = async () => {
    setTransparentLoader(true);
    await fetchAppDocs();
    setTransparentLoader(false);
  };

  return (
    <>
      {isDetailsLoading ? (
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.ai_center,
            CommonStyle.jc_center,
          ]}
        >
          <ActivityIndicator size="large" color={"#666592"} />
        </View>
      ) : !detailError ? (
        <ScrollView
          style={[
            CommonStyles.w100,
            CommonStyles.flex1,
            colorscheme === "dark"
              ? (CommonStyles.c_FFFFFF, CommonStyles.bg_1B1F23)
              : (CommonStyles.c_000000, CommonStyles.bg_FFFFFF),
          ]}
        >
          <View style={detailScreenStyles.mainContainer}>
            <TouchableOpacity
              style={detailScreenStyles.backButton}
              onPress={() => navigation.goBack()}
            >
              <FontAwesome
                name="arrow-left"
                style={[
                  detailScreenStyles.leftArrow,
                  colorscheme === "dark"
                    ? (CommonStyles.bg_1B1F23, CommonStyles.c_FFFFFF)
                    : (CommonStyles.bg_FFFFFF, CommonStyles.c_000000),
                ]}
              ></FontAwesome>
            </TouchableOpacity>
          </View>
          <View style={[CommonStyles.flex1, detailScreenStyles.holder]}>
            <View style={[CommonStyles.flexDRow]}>
              <View
                style={[
                  detailScreenStyles.Containers,
                  CommonStyles.jc_center,
                  Platform.OS === "ios" && detailScreenStyles.imgContainerShadow,
                  colorscheme === "dark"
                    ? (CommonStyles.c_FFFFFF, CommonStyles.bg_2E343C)
                    : (CommonStyles.c_000000, CommonStyles.bg_FFFFFF),
                ]}
              >
                <Image
                  source={
                    colorscheme === "dark"
                      ? appImage[
                          route.params.darksource
                            ? route.params.darksource
                            : route.params.source
                        ]
                      : appImage[route.params.source]
                  }
                  style={[
                    CommonStyles.ai_center,
                    CommonStyles.as_center,
                    CommonStyles.jc_center,
                    detailScreenStyles.logo,
                  ]}
                ></Image>
              </View>
              <View style={[CommonStyles.flexDCol, detailScreenStyles.containerName]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyles.montserratSemiBold,
                    detailScreenStyles.textstyle,
                    colorscheme === "dark"
                      ? CommonStyles.c_FFFFFF
                      : CommonStyles.c_09101D,
                  ]}
                >
                  {route.params.name}
                  {route.params.name === "MIS" && (
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyles.c_858C94,
                        CommonStyles.montserrat,
                        detailScreenStyles.SSOwarning,
                      ]}
                    >
                      {" "}
                      (SSO not enabled)
                    </Text>
                  )}
                </Text>
                {!isDummyUser && (
                  <View
                    style={[
                      CommonStyles.pAbsolute,
                      CommonStyles.ai_center,
                      CommonStyles.jc_center,
                      detailScreenStyles.ContinuebtnContainer,
                      colorscheme === "dark"
                        ? CommonStyles.bg_1B1F23
                        : CommonStyles.bg_498BEA,
                    ]}
                  >
                    <Nav
                      text="Open"
                      name={appData[index].name}
                      navigation={navigation}
                      url={appData[index].url}
                      navig={appData[index].webview}
                      isToken={appData[index].is_token}
                      ContainerStyle={[
                        CommonStyles.montserrat,
                        CommonStyles.ta_center,
                        detailScreenStyles.btnText,
                        colorscheme === "dark"
                          ? CommonStyles.c_498BEA
                          : CommonStyles.c_FFFFFF,
                      ]}
                    />
                  </View>
                )}
              </View>
            </View>
            {visible ? (
              <GestureRecognizer
                style={CommonStyle.flex1}
                onSwipeUp={() => setvisible(false)}
                onSwipeDown={() => setvisible(false)}
              >
                <Modal
                  onRequestClose={() => setvisible(false)}
                  animationType={"slide"}
                >
                  <View
                    style={[
                      CommonStyles.as_center,
                      detailScreenStyles.modelview,
                      CommonStyles.flex1,
                      colorscheme == "dark"
                        ? detailScreenStyles.darkmodelview
                        : detailScreenStyles.lightmodelview,
                    ]}
                  >
                    {Platform.OS === "ios" && (
                      <View style={detailScreenStyles.imgPopup}>
                        <TouchableOpacity
                          style={detailScreenStyles.backButton}
                          onPress={() => setvisible(false)}
                        >
                          <FontAwesome
                            name="arrow-left"
                            style={[
                              detailScreenStyles.leftArrow,
                              colorscheme === "dark"
                                ? (CommonStyles.bg_1B1F23,
                                  CommonStyles.c_FFFFFF)
                                : (CommonStyles.bg_FFFFFF,
                                  CommonStyles.c_000000),
                            ]}
                          ></FontAwesome>
                        </TouchableOpacity>
                      </View>
                    )}
                    <Swiper loop={false} index={selectedIndex}>
                      {route.params.Screenshots.map(
                        (image: ImageType, index: Number) => {
                          return (
                            <View
                              key={index.toString()}
                              style={[
                                CommonStyles.flex1,
                                CommonStyles.flexDRow,
                              ]}
                            >
                              <Image
                                source={appImage[image.image]}
                                style={[
                                  CommonStyles.as_center,
                                  detailScreenStyles.popupimageview,
                                ]}
                              ></Image>
                            </View>
                          );
                        }
                      )}
                    </Swiper>
                  </View>
                </Modal>
              </GestureRecognizer>
            ) : (
              <View style={detailScreenStyles.imagemainview}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={[CommonStyles.flexDRow, detailScreenStyles.scrollview]}>
                    {route.params.Screenshots.map(
                      (image: ImageType, index: number) => (
                        <TouchableOpacity
                          key={index.toString()}
                          onPress={() => {
                            setvisible(true);
                            setSelectedIndex(index);
                          }}
                        >
                          <Image
                            source={appImage[image.image]}
                            style={[
                              detailScreenStyles.imageview,
                              colorscheme === "dark"
                                ? detailScreenStyles.darkimageview
                                : detailScreenStyles.lightimageview,
                            ]}
                          ></Image>
                        </TouchableOpacity>
                      )
                    )}
                  </View>
                </ScrollView>
              </View>
            )}
            <View
              style={[
                detailScreenStyles.secondmargin,
                colorscheme === "dark"
                  ? detailScreenStyles.darksecondmarging
                  : detailScreenStyles.lightsecondmargin,
              ]}
            />
            <View>
              {appDoc.length !== 0 && (
                <>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyles.montserratSemiBold,
                      detailScreenStyles.firstheading,
                      colorscheme === "dark"
                        ? CommonStyles.c_FFFFFF
                        : CommonStyles.c_484848,
                    ]}
                  >
                    Available Files ({appDoc.length})
                  </Text>

                  <View style={detailScreenStyles.container}>
                    {appDoc.slice(0, 3).map((item: appDocObj) => {
                      return (
                        <TouchableOpacity
                          style={[
                            detailScreenStyles.videoItems,
                            CommonStyles.flexDRow,
                            CommonStyles.ai_center,
                          ]}
                          onPress={() =>
                            item.type.toLowerCase() === "document" ||
                            item?.source?.toLowerCase() === "youtube"
                              ? navigation.navigate("Web" as never, {
                                  url: `${item.path}`,
                                })
                              : navigation.navigate("Videoplayer" as never, {
                                  url: `${item.path}`,
                                })
                          }
                          key={item.id}
                        >
                          <View
                            style={[
                              detailScreenStyles.circle,
                              CommonStyles.bg_DDEBFF,
                              CommonStyle.ai_center,
                              CommonStyle.jc_center,
                            ]}
                          >
                            {item.type === "document" ? (
                              <svgImports.document />
                            ) : (
                              <svgImports.video />
                            )}
                          </View>
                          <Text
                            allowFontScaling={false}
                            numberOfLines={1}
                            style={[
                              CommonStyles.montserrat,
                              CommonStyles.as_center,
                              detailScreenStyles.catListText,
                              colorscheme === "dark"
                                ? CommonStyles.c_D1D0D0
                                : CommonStyles.c_858C94,
                            ]}
                          >
                            {item.file_name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                    {appDoc.length > 3 && (
                      <View
                        style={[
                          Styles.viewAllDetails,
                          CommonStyles.ai_center,
                          colorscheme === "dark"
                            ? CommonStyles.bg_1B1F23
                            : CommonStyles.bg_FFFFFF,
                        ]}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Detailscreenfiles", {
                              id: route.params.id,
                              limit: 0,
                              appData: appData[index],
                            } as never)
                          }
                          style={[Styles.viewAllIcon, CommonStyles.flexDRow]}
                        >
                          <Text
                            allowFontScaling={false}
                            style={[
                              CommonStyles.montserrat,
                              Styles.viewAllText,
                              colorscheme === "dark"
                                ? CommonStyles.c_D1D0D0
                                : CommonStyles.c_c666592,
                            ]}
                          >
                            View All
                          </Text>
                          <FontAwesome
                            name="arrow-right"
                            style={[
                              Styles.arrowContainer,
                              colorscheme === "dark"
                                ? CommonStyles.c_D1D0D0
                                : CommonStyles.c_498BEA,
                            ]}
                          ></FontAwesome>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </>
              )}
            </View>
            <View
              style={
                appDoc.length === 0 ? detailScreenStyles.noVideoDetail : detailScreenStyles.videoDetail
              }
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyles.montserrat,
                  detailScreenStyles.detailsFirstheading,
                  colorscheme === "dark"
                    ? CommonStyles.c_FFFFFF
                    : CommonStyles.c_484848,
                ]}
              >
                Details
              </Text>
              <View style={[detailScreenStyles.detailtext]}>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyles.c_858C94,
                    CommonStyles.montserrat,
                    detailScreenStyles.description,
                  ]}
                >
                  {route.params.description}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={[
            detailScreenStyles.trandparentLoaderView,
            colorscheme === "dark"
              ? CommonStyle.bg_1B1F23
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          {transparentLoader && Platform.OS == "android" && (
            <ActivityIndicator color={"#666592"} size={"large"} />
          )}
          <FlatList
            data={emptyDataArray}
            refreshing={Platform.OS == "ios" ? transparentLoader : false}
            progressViewOffset={height * 2}
            refreshControl={
              <RefreshControl
                refreshing={Platform.OS == "ios" ? transparentLoader : false}
                progressViewOffset={height * 2}
                onRefresh={() => {
                  onRefreshFunction();
                }}
              />
            }
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => {
              const [noDataFound, pullToRefresh] = item.split("/");
              return (
                <Text
                  style={[
                    CommonStyle.ta_center,
                    CommonStyle.montserratSemiBold,
                    CommonStyle.fs_15,
                    detailScreenStyles.netWorkIssueText,
                    colorscheme === "dark"
                      ? {
                          ...CommonStyle.bg_1C2024,
                          ...CommonStyle.c_D1D0D0,
                        }
                      : {
                          ...CommonStyle.bg_FAFAFB,
                          ...CommonStyle.c_666262,
                        },
                  ]}
                  allowFontScaling={false}
                >
                  {noDataFound}
                  {"\n"} {pullToRefresh}
                </Text>
              );
            }}
          />
        </View>
      )}
    </>
  );
};
export default Detailscreen;
