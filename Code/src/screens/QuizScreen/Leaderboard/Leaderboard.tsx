import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  BackHandler,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Platform,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { leaderboardStyles } from "./LeaderboardStyles";
import LeaderBoardCard from "../components/LeaderBoardCard/LeaderBoardCard";

import { svgImports } from "../../../data/Imports";
import useColorScheme from "../../../hooks/useColorScheme";
import socket from "../../../services/socket";
import CommonStyle from "../../../styles/Global";
import { NeoContext } from "../../../NeoProvider/NeoProvider";

const { height, width } = Dimensions.get("screen");
let Leaderboard = ({ navigation }: any) => {
  let { leaderBoardData, fetchLeaderboard, getQuizError } =
    useContext(NeoContext);
  let [isLoading, setIsLoading] = useState(false);
  let [transparentLoader, setTransparentLoader] = useState(false);
  let [socketUpdate, setSocketUpdate] = useState(false);
  let colorScheme = useColorScheme();
  let emptyDataArray = ["No Data Found/Pull to refresh...."];

  const [updatedLeaderboardData, setupdatedLeaderboardData] = useState([]);

  useEffect(() => {
    let filteredLeaderboardData = leaderBoardData.filter(
      (leaderBoardUser: { total_points: number }) => {
        return leaderBoardUser.total_points != 0;
      }
    );
    setupdatedLeaderboardData(filteredLeaderboardData);
  }, [leaderBoardData]);

  useEffect(() => {
    socket.on("quiz_response", (boolean: boolean) => {
      setSocketUpdate(boolean);
    });
  }, []);

  useEffect(() => {
    if (socketUpdate) {
      fetchLeaderboard();
      setSocketUpdate(false);
    }
  }, [socketUpdate]);

  useEffect(() => {
    fetchingLeaderBoard();
  }, []);

  let fetchingLeaderBoard = () => {
    setIsLoading(true);
    fetchLeaderboard();
    setIsLoading(false);
  };

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  return (
    <>
      <SafeAreaView>
        {isLoading ? (
          <View
            style={[
              CommonStyle.flex1,
              CommonStyle.ai_center,
              CommonStyle.jc_center,
              colorScheme === "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <ActivityIndicator size="large" color={"#666592"} />
          </View>
        ) : (
          <View
            style={[CommonStyle.h100, CommonStyle.w100, CommonStyle.bg_6A5AE1]}
          >
            <Image
              source={require("../../../../assets/images/leaderboardbg.png")}
              style={[
                CommonStyle.h100,
                CommonStyle.w100,
                CommonStyle.dflex,
                CommonStyle.pAbsolute,
                leaderboardStyles.topperBackgroundImage,
              ]}
            />
            <View
              style={[
                CommonStyle.dflex,
                CommonStyle.flexDCol,
                CommonStyle.w100,
                leaderboardStyles.headerContainer,
              ]}
            >
              {height > 800 ? (
                <View
                  style={[
                    CommonStyle.w100,
                    leaderboardStyles.ImageContainer,
                    { bottom: -11 },
                  ]}
                >
                  <View
                    style={[
                      CommonStyle.flexDRow,
                      CommonStyle.pAbsolute,
                      { top: -15 },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        CommonStyle.jc_center,
                        CommonStyle.ai_center,
                        leaderboardStyles.backBtnArea,
                      ]}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <View style={[leaderboardStyles.backBtn]}></View>
                    </TouchableOpacity>
                    <View
                      style={[
                        CommonStyle.dflex,
                        CommonStyle.flexDRow,
                        CommonStyle.ai_center,
                        CommonStyle.h100,
                        leaderboardStyles.topBar,
                      ]}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserratSemiBold,
                          leaderboardStyles.leaderboardHeading,
                        ]}
                      >
                        Leaderboard
                      </Text>
                    </View>
                  </View>
                  <svgImports.LeaderBoardBG
                    style={[CommonStyle.as_center, leaderboardStyles.tooperBackgroundIcon]}
                  />
                  {updatedLeaderboardData.length > 0 ? (
                    <Image
                      source={{
                        uri:
                          updatedLeaderboardData.length > 0
                            && leaderBoardData[0].photo_url
                            ,
                      }}
                      style={[
                        CommonStyle.pAbsolute,
                        CommonStyle.as_center,
                        leaderboardStyles.topperImage,
                      ]}
                      resizeMode="cover"
                    />
                  ) : (
                    <Image
                      source={require("../../../../assets/images/user.jpg")}
                      style={[
                        CommonStyle.pAbsolute,
                        CommonStyle.as_center,
                        leaderboardStyles.topperImage,
                      ]}
                      resizeMode="cover"
                    />
                  )}
                </View>
              ) : (
                <View
                  style={[
                    CommonStyle.w100,
                    leaderboardStyles.ImageContainer,
                    { marginTop: 5 },
                  ]}
                >
                  <View
                    style={[
                      CommonStyle.flexDRow,
                      CommonStyle.pAbsolute,
                      { top: -15 },
                    ]}
                  >
                    <TouchableOpacity
                      style={[
                        CommonStyle.jc_center,
                        CommonStyle.ai_center,
                        leaderboardStyles.backBtnArea,
                      ]}
                      onPress={() => {
                        navigation.goBack();
                      }}
                    >
                      <View style={[leaderboardStyles.backBtn]}></View>
                    </TouchableOpacity>
                    <View
                      style={[
                        CommonStyle.dflex,
                        CommonStyle.flexDRow,
                        CommonStyle.ai_center,
                        CommonStyle.h100,
                        leaderboardStyles.topBar,
                      ]}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserratSemiBold,
                          leaderboardStyles.leaderboardHeading,
                        ]}
                      >
                        Leaderboard
                      </Text>
                    </View>
                  </View>
                  <svgImports.LeaderBoardBG
                    style={[CommonStyle.as_center, leaderboardStyles.tooperBackgroundIcon]}
                  />
                  <Image
                    source={{
                      uri:
                        leaderBoardData.length > 0
                          && leaderBoardData[0].photoUrl
                          ,
                    }}
                    style={[
                      CommonStyle.pAbsolute,
                      CommonStyle.as_center,
                      leaderboardStyles.topperImage,
                    ]}
                    resizeMode="cover"
                  />
                </View>
              )}
            </View>
            <View
              style={[
                CommonStyle.w100,
                leaderboardStyles.userContainer,
                colorScheme === "dark"
                  ? CommonStyle.bg_1B1F23
                  : CommonStyle.bg_FFFFFF,
              ]}
            >
              {transparentLoader && Platform.OS == "android" && (
                <ActivityIndicator color={"#666592"} size={"large"} />
              )}
              {getQuizError ? (
                <View
                  style={[
                    CommonStyle.h100,
                    CommonStyle.w100,
                    CommonStyle.dflex,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    colorScheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  <FlatList
                    data={emptyDataArray}
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
                          setTransparentLoader(true);
                          await fetchLeaderboard();
                          setTransparentLoader(false);
                        }}
                        colors={["#498BEA"]}
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
                            leaderboardStyles.netWorkIssueText,
                            colorScheme === "dark"
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
              ) : leaderBoardData.length < 1 ? (
                <View
                  style={[
                    CommonStyle.h100,
                    CommonStyle.w100,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    colorScheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  <ActivityIndicator size="large" color={"#666592"} />
                </View>
              ) : (
                <>
                  {updatedLeaderboardData.length > 0 ? (
                    <FlatList
                      data={leaderBoardData}
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
                            setTransparentLoader(true);
                            await fetchLeaderboard();
                            setTransparentLoader(false);
                          }}
                          colors={["#498BEA"]}
                        />
                      }
                      keyExtractor={(item) => item.email_id}
                      renderItem={({ item, index }) => {
                        if (index < 10) {
                          return (
                            <LeaderBoardCard
                              key={item.emailId}
                              userData={item}
                              rank={index}
                            />
                          );
                        }
                      }}
                    />
                  ) : (
                    <View
                      style={[CommonStyle.ai_center, leaderboardStyles.noQuizContainer]}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserratSemiBold,
                          CommonStyle.fs_20,
                          colorScheme === "dark"
                            ? CommonStyle.c_D1D0D0
                            : CommonStyle.c_666262,
                        ]}
                      >
                        Be the Leader, take the quiz now
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};



export default Leaderboard;
