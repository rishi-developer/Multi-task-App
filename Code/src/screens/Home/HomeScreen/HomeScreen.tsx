import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Image,
  TouchableOpacity,
  FlatList,
  BackHandler,
  Modal,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Alert,
  Dimensions,
  RefreshControl,
  Platform,
  Linking,
} from "react-native";
import { homeScreenStyles } from "./HomeScreenStyles";
import registerNNPushToken from "native-notify";
import QRCode from "react-native-qrcode-svg";
import moment from "moment";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as SecureStore from "expo-secure-store";
import { appImage } from "../../../data/ImageData";
import { Categ } from "../../../data/Category";
import CommonStyle from "../../../styles/Global";
import CommonModal from "../../../shared/CommonModal";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import Nav from "../../../shared/Nav";
import { AppDataObject, RootTabScreenProps } from "../../../../types";
import Styles from "../../../styles/Styles";
import { svgImports } from "../../../data/Imports";
import useColorScheme from "../../../hooks/useColorScheme";
import socket from "../../../services/socket";
const { height, width } = Dimensions.get("screen");
import { ResizeMode, Video } from "expo-av";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
const splashHome = require("../../../../assets/lottie/splashHome.mp4");
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      Alert.alert("Alert", "Neo wants you to enable  notification permission", [
        {
          text: "Yes",
          onPress: () => {
            Linking.openSettings();
          },
        },
      ]);
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert("Must use physical device for Push Notifications");
  }
  return token;
}

import * as Updates from "expo-updates";
export default function HomeScreen({
  navigation,
}: RootTabScreenProps<"HomeScreen">) {
  const [showWarning, SetshowWarning] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [qrShow, setqrShow] = useState(false);
  const [transparentLoader, setTransparentLoader] = useState(false);
  const [visible, setVisible] = useState(true);
  const [play, setPlay] = useState(false);
  const [greetings, setGreetings] = useState("");
  const colorscheme = useColorScheme();
  const video = useRef(null);
  const [expoPushToken, setExpoPushToken]: any = useState("");
  const [notification, setNotification]: any = useState(false);
  const notificationListener: any = useRef();
  const responseListener: any = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  let {
    getLoginDetails,
    appData,
    updateTime,
    userDetails,
    setSocketAdd,
    isHomeLoading,
    setSplashScreen,
    homeSplashVisible,
    isDummyUser,
    isGuestLoading,
  }: any = useContext(NeoContext);
  let emptyDataArray = ["No Data Found/Pull to refresh...."];
  React.useEffect(() => {
    reactToUpdates();
  }, []);

  const reactToUpdates = () => {
    Updates.addListener(async (event) => {
      if (event.type === Updates.UpdateEventType.UPDATE_AVAILABLE) {
        await Updates.reloadAsync();
      }
    });
  };
  useEffect(() => {
    formatTime();
  }, [setGreetings]);

  useEffect(() => {
    if (qrShow) {
      let timer = setTimeout(() => updateTime(), 30000);
    }
  }, [qrShow, userDetails]);

  useEffect(() => {
    updateLoginCreds();
  }, []);
  useEffect(() => {
    socket.on("response", (boolean: boolean) => {
      setSocketAdd(boolean);
    });
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      formatTime();
    });
  }, [navigation]);

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  const updateLoginCreds = async () => {
    try {
      const guestUserValue = await SecureStore.getItemAsync("isGuestUser");
      const value = await SecureStore.getItemAsync("refresh_token");
      if (value != null) {
        await getLoginDetails(value, true);
      } else if (guestUserValue === null) {
        logoutButtonHandler();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const OFFSET_TIME = "+05:30";
  const DATE_FORMAT = "dddd, D MMMM";

  const formatTime = () => {
    let time = setInterval(() => {
      const dateMoment = moment().utcOffset(OFFSET_TIME).format(DATE_FORMAT);
      setCurrentDate(dateMoment);
      const hrs = new Date().getHours();
      let greetings = "";
      if (hrs >= 0 && hrs < 12) {
        greetings = "Good Morning";
      }
      if (hrs >= 12 && hrs < 16) {
        greetings = "Good Afternoon";
      }
      if (hrs >= 16) {
        greetings = "Good Evening";
      }
      setGreetings(greetings);
    }, 300);
  };

  const logoutButtonHandler = () => {
    SecureStore.deleteItemAsync("EmailId");
    SecureStore.deleteItemAsync("access_token");
    SecureStore.deleteItemAsync("userDetails");
    navigation.navigate("Login");
    SetshowWarning(false);
  };

  const showWarningfalse = () => {
    SetshowWarning(false);
  };
  registerNNPushToken(6685, "eoqrzFXbDvGGERyYl3Ktbv");

  const splashHandler = () => {
    if (
      (visible || isHomeLoading) &&
      homeSplashVisible &&
      !isDummyUser &&
      !isGuestLoading
    ) {
      return true;
    } else return false;
  };

  return (
    <>
      {splashHandler() && (
        <Modal>
          <View style={homeScreenStyles.splashHandler}>
            <Video
              ref={video}
              style={[
                CommonStyle.pRelative,
                homeScreenStyles.splashScreenVideo,
              ]}
              source={splashHome}
              useNativeControls={false}
              resizeMode={ResizeMode.CONTAIN}
              isLooping={false}
              shouldPlay={play}
              onReadyForDisplay={() => {
                setPlay(true);
                setTimeout(() => {
                  setVisible(false);
                  setSplashScreen(false);
                }, 4500);
              }}
              volume={100}
            />
          </View>
        </Modal>
      )}
      {qrShow && (
        <Modal
          onRequestClose={() => {
            setqrShow(false);
          }}
        >
          <View
            style={[CommonStyle.bg_FFFFFF, CommonStyle.h100, CommonStyle.w100]}
          >
            <TouchableOpacity
              onPress={() => {
                setqrShow(false);
              }}
              style={[
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                CommonStyle.bg_FFFFFF,
                Styles.crossBtnBox,
              ]}
            >
              <FontAwesome
                name="arrow-right"
                style={[Styles.crossBtn, CommonStyle.c_007AFF]}
              ></FontAwesome>
            </TouchableOpacity>
            <>
              {userDetails != null ? (
                <>
                  <View style={Styles.QRCodeBox}>
                    <View
                      style={[
                        CommonStyle.bg_FFFFFF,
                        CommonStyle.w100,
                        CommonStyle.jc_center,
                        CommonStyle.ai_center,
                      ]}
                    >
                      <Text
                        style={[
                          Styles.userNameText,
                          CommonStyle.montserratBold,
                          CommonStyle.c_007AFF,
                        ]}
                      >
                        {userDetails.userName}
                      </Text>
                      <Text
                        style={[
                          Styles.userEmployeeCode,
                          CommonStyle.c_474749,
                          CommonStyle.montserrat,
                        ]}
                      >
                        Employee Code :{" "}
                        <Text
                          style={[
                            Styles.userEmployeeCodeValue,
                            CommonStyle.c_007AFF,
                            CommonStyle.montserratSemiBold,
                          ]}
                        >
                          {userDetails.employeeid}
                        </Text>
                      </Text>
                    </View>
                    <View
                      style={[
                        CommonStyle.jc_center,
                        CommonStyle.ai_center,
                        CommonStyle.bg_FFFFFF,
                      ]}
                    >
                      <QRCode
                        value={JSON.stringify(userDetails)}
                        logo={{ uri: userDetails.photoUrl }}
                        size={250}
                        logoSize={48}
                        logoMargin={6}
                        logoBorderRadius={8}
                      />
                      <Text
                        style={[
                          Styles.QrInfo,
                          CommonStyle.montserrat,
                          CommonStyle.ta_center,
                        ]}
                      >
                        Show this QR at the time of entry
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={require("../../../../assets/images/QRFooter.png")}
                    style={[Styles.footerImage, CommonStyle.w100]}
                  />
                </>
              ) : (
                <>
                  <View
                    style={[
                      CommonStyle.w100,
                      CommonStyle.dflex,
                      CommonStyle.jc_center,
                      CommonStyle.ai_center,
                    ]}
                  >
                    {transparentLoader && Platform.OS == "android" && (
                      <ActivityIndicator
                        color={"#666592"}
                        size={"large"}
                        style={homeScreenStyles.activityIndicator}
                      />
                    )}
                    <FlatList
                      horizontal
                      style={homeScreenStyles.flatlist}
                      refreshing={
                        Platform.OS == "ios" ? transparentLoader : false
                      }
                      progressViewOffset={height * 2}
                      refreshControl={
                        <RefreshControl
                          refreshing={
                            Platform.OS == "ios" ? transparentLoader : false
                          }
                          progressViewOffset={height * 2}
                          onRefresh={async () => {
                            try {
                              setTransparentLoader(true);
                              const value = await SecureStore.getItemAsync(
                                "refresh_token"
                              );
                              if (value != null) {
                                await getLoginDetails(value, false);
                                setTransparentLoader(false);
                              } else {
                                logoutButtonHandler();
                              }
                            } catch (error) {
                              setTransparentLoader(false);
                              logoutButtonHandler();
                            }
                          }}
                          colors={["#498BEA"]}
                        />
                      }
                      data={emptyDataArray}
                      keyExtractor={(item) => item.toString()}
                      renderItem={({ item }) => {
                        const [noDataFound, pullToRefresh] = item.split("/");
                        return (
                          <Text
                            style={[
                              CommonStyle.ta_center,
                              CommonStyle.montserratSemiBold,
                              CommonStyle.fs_15,
                              homeScreenStyles.noData,
                              CommonStyle.c_000000,
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
                </>
              )}
            </>
          </View>
        </Modal>
      )}
      <View
        style={[
          CommonStyle.flex1,
          colorscheme === "dark"
            ? CommonStyle.bg_1B1F23
            : CommonStyle.bg_FFFFFF,
        ]}
      >
        <View
          style={[
            CommonStyle.flexDRow,
            colorscheme === "dark"
              ? CommonStyle.bg_1B1F23
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View
            style={[
              Styles.header,
              colorscheme === "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <View
              style={[
                Styles.dateContainer,
                colorscheme === "dark"
                  ? CommonStyle.bg_1B1F23
                  : CommonStyle.bg_FFFFFF,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratSemiBold,
                  Styles.dateText,
                  colorscheme === "dark"
                    ? CommonStyle.c_D1D0D0
                    : CommonStyle.c_AAA9C9,
                ]}
              >
                {currentDate}
              </Text>
            </View>
            <View
              style={[
                Styles.goodTextContainer,
                colorscheme === "dark"
                  ? CommonStyle.bg_1B1F23
                  : CommonStyle.bg_FFFFFF,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratBold,
                  CommonStyle.c_000000,
                  Styles.goodText,
                  colorscheme === "dark"
                    ? CommonStyle.c_D1D0D0
                    : CommonStyle.c_c666592,
                ]}
              >
                {greetings}
              </Text>
            </View>
          </View>
          <View
            style={[
              Styles.scanCntr,
              colorscheme === "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <TouchableOpacity
              style={[Styles.scanBtn, CommonStyle.jc_center]}
              onPress={() => {
                updateTime();
                setqrShow(true);
              }}
            >
              {colorscheme === "dark" ? (
                <svgImports.ScanIconDarkMode size={22} />
              ) : (
                <svgImports.ScanIcon size={22} />
              )}
            </TouchableOpacity>
          </View>

          <View
            style={[
              Styles.profileCntr,
              colorscheme === "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <TouchableOpacity
              style={[Styles.profileBtn, CommonStyle.jc_center]}
              onPress={() => navigation.navigate("ProfilePage")}
            >
              <Image
                source={require("../../../../assets/images/Profile.png")}
                style={[
                  Styles.profileIcon,
                  colorscheme === "dark"
                    ? Styles.darkprofileicon
                    : Styles.lightprofileIcon,
                ]}
              />
            </TouchableOpacity>
          </View>
        </View>
        {transparentLoader && Platform.OS == "android" && (
          <ActivityIndicator
            color={"#666592"}
            size={"large"}
            style={homeScreenStyles.activityIndicator}
          />
        )}
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={Platform.OS == "ios" ? transparentLoader : false}
              progressViewOffset={height * 2}
              onRefresh={async () => {
                setTransparentLoader(true);
                try {
                  const value = await SecureStore.getItemAsync("refresh_token");

                  if (value != null) {
                    await getLoginDetails(value, false);
                    setTransparentLoader(false);
                  } else {
                    logoutButtonHandler();
                  }
                } catch (error) {
                  setTransparentLoader(false);
                  logoutButtonHandler();
                }
              }}
              colors={["#498BEA"]}
            />
          }
        >
          <View
            style={[
              CommonStyle.jc_center,
              Styles.slider,
              colorscheme === "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            {appData.length >= 1 ? (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={appData}
                renderItem={({ item }) => {
                  return (
                    <>
                      {item.name === "Videocard" && (
                        <TouchableOpacity
                          style={homeScreenStyles.videoCard}
                          onPress={() =>
                            navigation.navigate(item.navig, {
                              id: `${item.id}`,
                            })
                          }
                        >
                          <View
                            style={[
                              CommonStyle.bg_1B1F23,
                              CommonStyle.jc_center,
                              CommonStyle.ai_center,
                              Styles.sliderHolderVideo,
                              colorscheme === "dark"
                                ? CommonStyle.bg_1B1F23
                                : CommonStyle.bg_FFFFFF,
                            ]}
                          >
                            <LinearGradient
                              colors={["#9557F3", "#692FC2"]}
                              style={[Styles.sliderContainer]}
                            >
                              <View
                                style={[
                                  CommonStyle.flexDRow,
                                  CommonStyle.jc_spaceBTW,
                                ]}
                              >
                                <View
                                  style={[
                                    Styles.videoTextContainer,
                                    CommonStyle.flexDRow,
                                    CommonStyle.jc_flexStart,
                                    CommonStyle.ai_center,
                                  ]}
                                >
                                  <Text
                                    allowFontScaling={false}
                                    style={[
                                      Styles.videoText,
                                      CommonStyle.montserratBold,
                                      CommonStyle.c_FFFFFF,
                                    ]}
                                  >
                                    Gemini Introductory Videos
                                  </Text>
                                </View>
                                <Image
                                  source={require("../../../../assets/images/videoImage2.png")}
                                  style={Styles.videoImage}
                                />
                              </View>
                              <View
                                style={[
                                  Styles.videovisitNowbtn,
                                  CommonStyle.pAbsolute,
                                  CommonStyle.ai_center,
                                  CommonStyle.jc_center,
                                ]}
                              >
                                <Nav
                                  text="Visit Now"
                                  navigation={navigation}
                                  id={item.id}
                                  navig={item.navig}
                                  ContainerStyle={Styles.videovisitNowText}
                                  isToken={item.is_token}
                                  description={item.description}
                                  source={item.source}
                                  darksource={item.dark_source}
                                  screenshots={item.screenshots}
                                  size={item.size}
                                  category={item.category}
                                />
                              </View>
                            </LinearGradient>
                          </View>
                        </TouchableOpacity>
                      )}
                      {item.is_banner && item.name !== "Videocard" && (
                        <View
                          style={[
                            CommonStyle.bg_1B1F23,
                            CommonStyle.jc_center,
                            CommonStyle.ai_center,
                            Styles.sliderHolder,
                            colorscheme === "dark"
                              ? CommonStyle.bg_1B1F23
                              : CommonStyle.bg_FFFFFF,
                            { marginTop: -10 },
                          ]}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              if (
                                item.card_name == "Teams" ||
                                item.card_name == "Microsoft Teams" ||
                                item.card_name == "Authenticator" ||
                                item.card_name == "Asana" ||
                                item.card_name == "Microsoft Outlook" ||
                                item.card_name == "Trello" ||
                                item.card_name == "Webex" ||
                                item.card_name == "Zoom"
                              ) {
                                Linking.openURL(item.url).catch((err) => {
                                  Linking.openURL(
                                    `http://play.google.com/store/apps/details?id=${item.url}`
                                  ).catch((err) =>
                                    console.error("An error occurred", err)
                                  );
                                });
                              } else {
                                navigation.navigate(item.webview, {
                                  url: `${item.url}`,
                                  isToken: `${item.is_token}`,
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
                                Styles.sliderContainer,
                                CommonStyle.bg_498BEA,
                              ]}
                            >
                              <View
                                style={[Styles.circle, CommonStyle.bg_FFFFFF]}
                              >
                                <Image
                                  source={appImage[item.banner]}
                                  style={[
                                    item.name === "Contripoint"
                                      ? Styles.ContripointVector
                                      : Styles.vector,
                                  ]}
                                />
                              </View>
                              <View
                                style={[
                                  Styles.misTextContainer,
                                  CommonStyle.flexDRow,
                                  CommonStyle.pAbsolute,
                                  CommonStyle.jc_flexStart,
                                  CommonStyle.ai_center,
                                ]}
                              >
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    Styles.misText,
                                    CommonStyle.montserratBold,
                                    CommonStyle.c_FFFFFF,
                                  ]}
                                >
                                  {item.card_name}
                                </Text>
                              </View>
                              <View
                                style={[
                                  Styles.seperator,
                                  CommonStyle.pAbsolute,
                                  CommonStyle.w100,
                                ]}
                              />
                              <View style={[Styles.messageContainer]}>
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    Styles.message,
                                    CommonStyle.montserrat,
                                    CommonStyle.c_FFFFFF,
                                  ]}
                                >
                                  {item.card_message}
                                </Text>
                              </View>
                              <View
                                style={[
                                  Styles.visitNowbtn,
                                  CommonStyle.pAbsolute,
                                  CommonStyle.ai_center,
                                  CommonStyle.jc_center,
                                ]}
                              >
                                <Nav
                                  text="Visit Now"
                                  url={item.url}
                                  navigation={navigation}
                                  name={item.card_name}
                                  navig={item.webview}
                                  ContainerStyle={Styles.visitNowText}
                                  isToken={item.is_token}
                                  description={item.description}
                                  source={item.source}
                                  darksource={item.dark_source}
                                  screenshots={item.screenshots}
                                  size={item.size}
                                  category={item.category}
                                />
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      )}
                    </>
                  );
                }}
              />
            ) : (
              <View
                style={[
                  CommonStyle.h100,
                  CommonStyle.w100,
                  CommonStyle.dflex,
                  CommonStyle.jc_center,
                  CommonStyle.ai_center,
                  colorscheme === "dark"
                    ? CommonStyle.bg_1B1F23
                    : CommonStyle.bg_FFFFFF,
                ]}
              >
                <FlatList
                  horizontal
                  data={emptyDataArray}
                  keyExtractor={(item) => item.toString()}
                  renderItem={({ item }) => {
                    const [noDataFound, pullToRefresh] = item.split("/");
                    return (
                      <Text
                        style={[
                          CommonStyle.ta_center,
                          CommonStyle.montserratSemiBold,
                          CommonStyle.fs_15,
                          { marginTop: 50 },
                          colorscheme === "dark"
                            ? {
                                ...CommonStyle.bg_1C2024,
                                ...CommonStyle.c_D1D0D0,
                              }
                            : {
                                ...CommonStyle.c_c666592,
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
          </View>

          <View
            style={[
              CommonStyle.w100,
              CommonStyle.jc_center,
              Styles.featuredAppContainer,
              colorscheme === "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <View
              style={[
                Styles.featuredTextCntr,
                CommonStyle.flexDRow,
                CommonStyle.jc_spaceBTW,
                colorscheme === "dark"
                  ? CommonStyle.bg_1B1F23
                  : CommonStyle.bg_FFFFFF,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratBold,
                  Styles.featuredText,
                  colorscheme === "dark"
                    ? CommonStyle.c_D1D0D0
                    : CommonStyle.c_c666592,
                  { marginTop: -15 },
                ]}
              >
                Featured Apps
              </Text>
              <View
                style={[
                  Styles.viewAllContainer,
                  colorscheme === "dark"
                    ? CommonStyle.bg_1B1F23
                    : CommonStyle.bg_FFFFFF,
                  { marginTop: -15, left: "90%" },
                ]}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("FeatureModal")}
                  style={[Styles.viewAllIcon, CommonStyle.flexDRow]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.montserrat,
                      Styles.viewAllText,
                      colorscheme === "dark"
                        ? CommonStyle.c_D1D0D0
                        : CommonStyle.c_8584A5,
                    ]}
                  >
                    View All
                  </Text>
                  <FontAwesome
                    name="arrow-right"
                    style={[
                      Styles.arrowContainer,
                      colorscheme === "dark"
                        ? CommonStyle.c_D1D0D0
                        : CommonStyle.c_498BEA,
                    ]}
                  ></FontAwesome>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={[
                CommonStyle.w100,
                CommonStyle.flexDRow,
                Styles.featuredAppSLider,
                colorscheme === "dark"
                  ? CommonStyle.bg_1B1F23
                  : CommonStyle.bg_FFFFFF,
              ]}
            >
              {appData.length >= 1 ? (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={appData.sort(
                    (a: AppDataObject, b: AppDataObject) =>
                      a.order_no - b.order_no
                  )}
                  renderItem={({ item }) => {
                    return (
                      <>
                        {item.is_slider_list && (
                          <View
                            style={[
                              Styles.featuredAppSliderItemCntr,
                              colorscheme === "dark"
                                ? CommonStyle.bg_1B1F23
                                : CommonStyle.bg_FFFFFF,
                            ]}
                          >
                            <View
                              style={[
                                Styles.featuredAppSliderItem,
                                CommonStyle.ai_center,
                                colorscheme === "dark"
                                  ? CommonStyle.bg_1B1F23
                                  : CommonStyle.bg_FFFFFF,
                              ]}
                            >
                              <View
                                style={[
                                  CommonStyle.jc_center,
                                  Styles.featureimageContainer,
                                  colorscheme === "dark"
                                    ? {
                                        ...CommonStyle.bg_2E343C,
                                        ...Styles.darkfeatureimageContainer,
                                      }
                                    : {
                                        ...CommonStyle.bg_FFFFFF,
                                        ...Styles.lightfeatureimageContainer,
                                      },
                                ]}
                              >
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate(
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
                                      colorscheme === "dark"
                                        ? item.dark_source
                                          ? appImage[item.dark_source]
                                          : appImage[item.source]
                                        : appImage[item.source]
                                    }
                                    style={[
                                      CommonStyle.as_center,
                                      Styles.featureAppImage,
                                    ]}
                                  />
                                </TouchableOpacity>
                              </View>
                              <View
                                style={[
                                  CommonStyle.as_center,
                                  Styles.featureAppTextContainer,
                                  colorscheme == "dark"
                                    ? CommonStyle.bg_1B1F23
                                    : CommonStyle.bg_FFFFFF,
                                ]}
                              >
                                <TouchableOpacity
                                  onPress={() =>
                                    navigation.navigate(
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
                                  <Text
                                    allowFontScaling={false}
                                    style={[
                                      CommonStyle.montserrat,
                                      Styles.featureAppText,
                                      colorscheme === "dark"
                                        ? CommonStyle.c_D1D0D0
                                        : CommonStyle.c_c666592,
                                    ]}
                                  >
                                    {item.name}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        )}
                      </>
                    );
                  }}
                />
              ) : (
                <View
                  style={[
                    CommonStyle.h100,
                    CommonStyle.w100,
                    CommonStyle.dflex,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    colorscheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  <FlatList
                    horizontal
                    data={emptyDataArray}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => {
                      const [noDataFound, pullToRefresh] = item.split("/");
                      return (
                        <Text
                          style={[
                            CommonStyle.ta_center,
                            CommonStyle.montserratSemiBold,
                            CommonStyle.fs_15,
                            { marginTop: 50 },
                            colorscheme === "dark"
                              ? {
                                  ...CommonStyle.bg_1C2024,
                                  ...CommonStyle.c_D1D0D0,
                                }
                              : {
                                  ...CommonStyle.c_c666592,
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
            </View>
          </View>
          <View
            style={[
              CommonStyle.w100,
              Styles.catContainer,
              colorscheme === "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <View
              style={[
                Styles.catHeader,
                colorscheme === "dark"
                  ? CommonStyle.bg_1B1F23
                  : CommonStyle.bg_FFFFFF,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratBold,
                  Styles.catText,
                  colorscheme === "dark"
                    ? CommonStyle.c_D1D0D0
                    : CommonStyle.c_c666592,
                ]}
              >
                App Categories
              </Text>
            </View>
            <View
              style={[
                Styles.catHeading,
                colorscheme === "dark"
                  ? CommonStyle.bg_1B1F23
                  : CommonStyle.bg_FFFFFF,
              ]}
            >
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={Categ}
                contentContainerStyle={homeScreenStyles.flatListCategoryname}
                renderItem={({ item }) => (
                  <View
                    style={[
                      CommonStyle.jc_center,
                      Styles.catListHolder,
                      colorscheme === "dark"
                        ? CommonStyle.bg_1B1F23
                        : CommonStyle.bg_FFFFFF,
                    ]}
                  >
                    <View
                      style={[
                        CommonStyle.bg_2E343C,
                        CommonStyle.ai_center,
                        CommonStyle.jc_center,
                        Styles.catListContainer,
                        colorscheme === "dark"
                          ? CommonStyle.bg_2E343C
                          : CommonStyle.bg_FFFFFF,
                      ]}
                    >
                      <TouchableOpacity
                        style={[Styles.catListItem, CommonStyle.jc_center]}
                        onPress={() => navigation.navigate(item.navig as never)}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[
                            CommonStyle.montserrat,
                            CommonStyle.as_center,
                            Styles.catListText,
                            colorscheme === "dark"
                              ? CommonStyle.c_D1D0D0
                              : CommonStyle.c_c666592,
                            { fontWeight: "500" },
                          ]}
                        >
                          {item.categoryName}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>

      {showWarning && (
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.ai_center,
            colorscheme === "dark"
              ? CommonStyle.bg_1B1F23
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <CommonModal
            showWarning={showWarning}
            logoutButtonHandler={logoutButtonHandler}
            showWarningfalse={showWarningfalse}
            typeOf="warning"
            message="Session Expired"
          />
        </View>
      )}
    </>
  );
}
