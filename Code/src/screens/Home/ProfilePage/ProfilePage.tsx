import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
  RefreshControl,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from "react-native";
import { profilePageStyles } from "./ProfilePageStyles";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import CommonStyle from "../../../styles/Global";
import Nav from "../../../shared/Nav";
import { Text, View } from "../../../shared/Themed";
import useColorScheme from "../../../hooks/useColorScheme";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import CommonModal from "../../../shared/CommonModal";

const { height } = Dimensions.get("screen");

const ProfilePage = (props: any) => {
  const { userDetails, updateUserDetails, getLoginDetails, isDummyUser }: any =
    useContext(NeoContext);
  const [showWarning, SetshowWarning] = useState(false);
  const [transparentLoader, setTransparentLoader] = useState(false);
  const colorscheme = useColorScheme();
  let theme = colorscheme === "dark";
  let emptyDataArray = ["No Data Found/Pull to refresh...."];

  const handleOnPress = () => {
    props.navigation.navigate("QuizScreen");
  };
  const logoutButtonHandler = async () => {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("userDetails");
    await updateUserDetails([]);
    props.navigation.navigate("Login");
    showWarningfalse();
  };
  const showWarningfalse = () => {
    SetshowWarning(false);
  };
  useEffect(() => {
    const backbuttonHander = () => {
      props.navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });
  return (
    <View
      style={[
        CommonStyle.flex1,
        profilePageStyles.mainContainer,
        theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
      ]}
    >
      <View style={[profilePageStyles.navbar, CommonStyle.bg_498BEA]}>
        {transparentLoader && Platform.OS == "android" && (
          <ActivityIndicator color={"#666592"} size={"large"} />
        )}
      </View>
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
            profilePageStyles.accountView,
            theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View
            style={[
              CommonStyle.w100,
              CommonStyle.ai_center,
              CommonStyle.bg_498BEA,
              CommonStyle.as_center,
              profilePageStyles.container,
            ]}
          >
            <View
              style={[
                profilePageStyles.headerContainer,
                CommonStyle.dflex,
                CommonStyle.flexDRow,
                CommonStyle.bg_498BEA,
                CommonStyle.jc_spaceBTW,
                CommonStyle.w100,
                CommonStyle.ai_center,
              ]}
            >
              <TouchableOpacity
                style={[
                  profilePageStyles.backBtnCntr,
                  CommonStyle.dflex,
                  CommonStyle.ai_center,
                  CommonStyle.jc_center,
                ]}
                onPress={() => props.navigation.goBack()}
              >
                <FontAwesome
                  name="arrow-left"
                  style={[profilePageStyles.backBtn, CommonStyle.c_FFFFFF]}
                ></FontAwesome>
              </TouchableOpacity>
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratBold,
                  CommonStyle.c_FFFFFF,
                  CommonStyle.pAbsolute,
                  CommonStyle.as_center,
                  profilePageStyles.pageInfo,
                ]}
              >
                My Account
              </Text>
              {!isDummyUser && (
                <Nav
                  name={"Feedback form"}
                  navig={"Web"}
                  text="Feedback Form"
                  url={
                    "https://forms.office.com/Pages/ResponsePage.aspx?id=fWyAuYCSRE6v6m3A_0lcL-N65LpYMXlEl6syOpGR-F9UNjM2TjlYUUlTTU1KU01VVUpZVUtBNEZHRC4u"
                  }
                  ContainerStyle={[
                    CommonStyle.montserratBold,
                    CommonStyle.ta_center,
                    CommonStyle.c_FFFFFF,
                    CommonStyle.jc_center,
                    CommonStyle.dflex,
                    CommonStyle.ai_center,
                  ]}
                  navigation={props.navigation}
                />
              )}
            </View>
            <View
              style={[profilePageStyles.profilePageCntr, CommonStyle.bg_498BEA]}
            >
              <Image
                style={[
                  profilePageStyles.bgImg1,
                  CommonStyle.pAbsolute,
                  CommonStyle.ai_center,
                  CommonStyle.as_center,
                ]}
                source={require("../../../../assets/images/Ellipse10.png")}
              />
              <Image
                style={[
                  profilePageStyles.bgImg2,
                  CommonStyle.pAbsolute,
                  CommonStyle.as_center,
                  CommonStyle.ai_center,
                ]}
                source={require("../../../../assets/images/Ellipse11.png")}
              />
              {userDetails.photoUrl ? (
                <Image
                  style={[
                    profilePageStyles.userImg,
                    CommonStyle.pAbsolute,
                    CommonStyle.as_center,
                    CommonStyle.bg_FFFFFF,
                  ]}
                  key={userDetails.photoUrl}
                  source={{ uri: userDetails.photoUrl }}
                ></Image>
              ) : (
                <Image
                  style={[
                    profilePageStyles.userImg,
                    CommonStyle.pAbsolute,
                    CommonStyle.as_center,
                    CommonStyle.bg_FFFFFF,
                  ]}
                  source={require("../../../../assets/images/user.jpg")}
                />
              )}
            </View>

            <>
              {userDetails.userName ? (
                <View
                  style={[
                    profilePageStyles.userDetailsCntr,
                    CommonStyle.jc_center,
                    CommonStyle.bg_trans,
                  ]}
                >
                  <View
                    style={[
                      profilePageStyles.userDetails,
                      CommonStyle.w100,
                      CommonStyle.bg_498BEA,
                      CommonStyle.dflex,
                      CommonStyle.flexDCol,
                      CommonStyle.ai_center,
                      CommonStyle.as_center,
                      CommonStyle.jc_center,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserratBold,
                        CommonStyle.c_FFFFFF,
                        CommonStyle.ta_center,
                        CommonStyle.as_center,
                        profilePageStyles.userName,
                      ]}
                    >
                      {userDetails.userName}
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.c_FFFFFF,
                        CommonStyle.ta_center,
                        CommonStyle.as_center,
                        profilePageStyles.userDescription,
                      ]}
                    >
                      {userDetails.description}
                    </Text>
                    <View
                      style={[
                        CommonStyle.as_center,
                        CommonStyle.flexDRow,
                        CommonStyle.bg_trans,
                      ]}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          profilePageStyles.infoDataMail1,
                          CommonStyle.montserrat,
                          CommonStyle.c_FFFFFF,
                          CommonStyle.as_FStart,
                        ]}
                      >
                        {userDetails.email}
                      </Text>
                    </View>
                  </View>
                  {!isDummyUser && (
                    <View
                      style={[
                        CommonStyle.as_center,
                        CommonStyle.bg_trans,
                        CommonStyle.ai_center,
                        profilePageStyles.startQuizCnt,
                      ]}
                    >
                      <TouchableOpacity
                        onPress={handleOnPress}
                        style={[
                          CommonStyle.border_w_1,
                          CommonStyle.bg_FFFFFF,
                          profilePageStyles.startQuizBtn,
                        ]}
                      >
                        <Text
                          allowFontScaling={false}
                          style={[
                            CommonStyle.montserratBold,
                            CommonStyle.c_498BEA,
                            CommonStyle.ta_center,
                            profilePageStyles.startQuizBtn,
                          ]}
                        >
                          Start Quiz
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              ) : (
                <View
                  style={[
                    CommonStyle.w100,
                    CommonStyle.dflex,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    profilePageStyles.noDataFoundBox,
                    CommonStyle.bg_498BEA,
                    colorscheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  <FlatList
                    data={emptyDataArray}
                    keyExtractor={(item) => item.toString()}
                    style={[CommonStyle.bg_498BEA]}
                    renderItem={({ item }) => {
                      const [noDataFound, pullToRefresh] = item.split("/");
                      return (
                        <Text
                          style={[
                            CommonStyle.ta_center,
                            CommonStyle.montserratSemiBold,
                            CommonStyle.fs_15,
                            profilePageStyles.noData,
                            colorscheme === "dark"
                              ? {
                                  ...CommonStyle.c_D1D0D0,
                                }
                              : {
                                  ...CommonStyle.c_FFFFFF,
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
          </View>

          <View
            style={[
              CommonStyle.jc_center,
              CommonStyle.as_center,
              profilePageStyles.contactDetails,
              theme
                ? CommonStyle.bg_2E343C
                : profilePageStyles.lightcontactDetails,
            ]}
          >
            <View
              style={[
                CommonStyle.as_center,
                CommonStyle.flexDCol,
                CommonStyle.jc_center,
                CommonStyle.w100,
                CommonStyle.h100,
                CommonStyle.border_w_1,
                profilePageStyles.container1,
                theme
                  ? {
                      ...CommonStyle.bg_2E343C,
                      ...profilePageStyles.darkcontainer1,
                    }
                  : {
                      ...CommonStyle.bg_FFFFFF,
                      ...profilePageStyles.lightcontainer1,
                    },
              ]}
            >
              <View
                style={[
                  CommonStyle.flexDRow,
                  profilePageStyles.contact,
                  theme ? CommonStyle.bg_2E343C : CommonStyle.bg_FFFFFF,
                ]}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserratBold,
                    profilePageStyles.infoNum,
                    theme ? CommonStyle.bg_2E343C : CommonStyle.c_black,
                  ]}
                >
                  Contact Number
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserrat,
                    profilePageStyles.infoDataContact,
                    theme ? CommonStyle.bg_2E343C : CommonStyle.c_black,
                  ]}
                >
                  {userDetails.mobilenumber
                    ? userDetails.mobilenumber
                    : "No Data Found"}
                </Text>
              </View>
              <View
                style={[
                  CommonStyle.flexDRow,
                  profilePageStyles.department,
                  theme ? CommonStyle.bg_2E343C : CommonStyle.bg_FFFFFF,
                ]}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserratBold,
                    profilePageStyles.infoDepart,
                    theme ? CommonStyle.bg_2E343C : CommonStyle.c_black,
                  ]}
                >
                  Department
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserrat,
                    profilePageStyles.infoDataDepart,
                    theme ? CommonStyle.bg_2E343C : CommonStyle.c_black,
                  ]}
                >
                  {userDetails.department
                    ? userDetails.department
                    : "No Data Found"}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={[
              CommonStyle.jc_center,
              profilePageStyles.logoutCntr,
              theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
            ]}
          >
            <TouchableOpacity
              onPress={logoutButtonHandler}
              style={[
                profilePageStyles.logoutBtn,
                CommonStyle.ai_center,
                CommonStyle.as_center,
                CommonStyle.jc_center,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratBold,
                  CommonStyle.ta_center,
                  CommonStyle.c_FFFFFF,
                  CommonStyle.jc_center,
                  profilePageStyles.logoutText,
                ]}
              >
                Logout{" "}
                <FontAwesome
                  name="sign-out"
                  style={[CommonStyle.c_FFFFFF, CommonStyle.fs_20]}
                ></FontAwesome>
              </Text>
            </TouchableOpacity>
            {showWarning && (
              <View
                style={[
                  CommonStyle.flex1,
                  CommonStyle.ai_center,
                  theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfilePage;
