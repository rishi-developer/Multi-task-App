import { useContext, useEffect, useState } from "react";
import React from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  BackHandler,
  Platform,
  ActivityIndicator,
} from "react-native";
import { historyScreenStyles } from "./HistoryScreenStyles";
import HistoryCard from "../components/HistoryCard/HistoryCard";
import QuizHistoryStats from "../components/QuizHistoryStats/QuizHistoryStats";

import useColorScheme from "../../../hooks/useColorScheme";
import CommonStyle from "../../../styles/Global";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import { UserDetailsType } from "../../../../types";

const HistoryScreen = ({ navigation, route }: any) => {
  type FetchHistoryDataType = () => void;
  const {
    userDetails,
    userHistory,
    fetchHistoryData,
    historyLoader,
  }: {
    userDetails: UserDetailsType;
    userHistory: any;
    fetchHistoryData: FetchHistoryDataType;
    historyLoader:boolean
  } = useContext(NeoContext);
  const [detailStats, setdetailStats] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
    totalPoints: 0,
  });
  const colorScheme = useColorScheme();
  useEffect(() => {
    fetchHistoryData();
  }, []);

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    let pointsEarned = 0,
      incorrectAnswers = 0,
      rightAnswers = 0;
    for (let i = 0; i < userHistory.length; i++) {
      pointsEarned += userHistory[i].points;
      rightAnswers += userHistory[i].correctAnswers;
      incorrectAnswers += userHistory[i].wrongAnswer;
    }
    setdetailStats((prevState) => {
      return {
        ...prevState,
        correctAnswers: rightAnswers,
        wrongAnswers: incorrectAnswers,
        totalPoints: pointsEarned,
      };
    });
  }, [userHistory]);

  return (
    <>
      <View
        style={[
          CommonStyle.h100,
          colorScheme === "dark"
            ? CommonStyle.bg_1B1F23
            : CommonStyle.bg_FAF8FF,
        ]}
      >
        <View
          style={[
            CommonStyle.w100,
            CommonStyle.bg_6A5AE1,
            CommonStyle.jc_center,
            historyScreenStyles.toolbar,
          ]}
        >
          <View style={[CommonStyle.pAbsolute, historyScreenStyles.circle1]}></View>
          <View style={[CommonStyle.pAbsolute, historyScreenStyles.circle2]}></View>
          <View style={[CommonStyle.pAbsolute, historyScreenStyles.circle3]}></View>
          <View style={[CommonStyle.pAbsolute, historyScreenStyles.circle4]}></View>
          <View
            style={[
              CommonStyle.pAbsolute,
              CommonStyle.dflex,
              CommonStyle.flexDRow,
              CommonStyle.ai_center,
              historyScreenStyles.quizHistoryTitleContainer,
            ]}
          >
            {Platform.OS == "android" ? (
              <TouchableOpacity
                style={[
                  CommonStyle.jc_center,
                  CommonStyle.ai_center,
                  historyScreenStyles.backBtnArea,
                ]}
                onPress={() => navigation.navigate("QuizHomeMain")}
              >
                <View
                  style={[
                    CommonStyle.dflex,
                    CommonStyle.flexDRow,
                    historyScreenStyles.backBtnCntr,
                  ]}
                >
                  <Text style={historyScreenStyles.backBtn}></Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[
                  CommonStyle.jc_center,
                  CommonStyle.ai_center,
                  historyScreenStyles.backBtnArea,
                ]}
                onPress={() => navigation.navigate("QuizHomeMain")}
              >
                <View style={historyScreenStyles.backBtn}></View>
              </TouchableOpacity>
            )}
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratSemiBold,
                CommonStyle.dflex,
                CommonStyle.fs_20,
                CommonStyle.c_FFFFFF,
                CommonStyle.jc_center,
                historyScreenStyles.quizHistoryTitle,
              ]}
            >
              My Quiz History
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={CommonStyle.bg_6A5AE1}>
            <View
              style={[
                CommonStyle.ai_center,
                historyScreenStyles.yourDetailSmallContainer,
                colorScheme === "dark"
                  ? CommonStyle.bg_1B1F23
                  : CommonStyle.bg_FFFFFF,
              ]}
            >
              <View style={[CommonStyle.flexDRow, historyScreenStyles.profile]}>
                <View
                  style={[CommonStyle.ai_center, historyScreenStyles.profileImgContainer]}
                >
                  {userDetails.photoUrl ? (
                    <Image
                      style={historyScreenStyles.profileImg}
                      key={userDetails.photoUrl}
                      source={{ uri: userDetails.photoUrl }}
                    ></Image>
                  ) : (
                    <Image
                      style={historyScreenStyles.profileImg}
                      source={require("../../../../assets/images/Unknown_person.jpg")}
                    ></Image>
                  )}
                </View>
                <View
                  style={[
                    CommonStyle.jc_center,
                    historyScreenStyles.profileDetailsContainer,
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.montserratBold,
                      CommonStyle.fs_15,
                      historyScreenStyles.yourDetailTitle,
                      colorScheme === "dark"
                        ? CommonStyle.c_D1D0D0
                        : CommonStyle.c_414254,
                    ]}
                  >
                    {userDetails.userName}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.montserrat,
                      CommonStyle.fs_15,
                      historyScreenStyles.yourDetailSubTitle,
                      colorScheme === "dark"
                        ? CommonStyle.c_D1D0D0
                        : CommonStyle.c_5F656C,
                    ]}
                  >
                    {userDetails.description}
                  </Text>
                </View>
              </View>
              <View style={[CommonStyle.flexDRow, historyScreenStyles.allStatsContainer]}>
                <QuizHistoryStats
                  data={
                    userHistory.length > 0 ? detailStats.correctAnswers : "--"
                  }
                  emoji={require("../../../../assets/images/RightAnsEmoji.png")}
                  containerBackground={CommonStyle.bg_D8FEE6}
                  text={["Correct", "Answers"]}
                />

                <QuizHistoryStats
                  data={
                    userHistory.length > 0 ? detailStats.wrongAnswers : "--"
                  }
                  emoji={require("../../../../assets/images/WrongAnsEmoji.png")}
                  containerBackground={CommonStyle.bg_FEDDDD}
                  text={["Wrong", "Answers"]}
                />

                <QuizHistoryStats
                  data={userHistory.length > 0 ? detailStats.totalPoints : "--"}
                  emoji={require("../../../../assets/images/3dDiamondEmoji.png")}
                  containerBackground={CommonStyle.bg_FFF1AA}
                  text={["Total", "Points"]}
                />
              </View>
            </View>
          </View>
          <View
            style={
              colorScheme === "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF
            }
          >
            <Image
              style={[
                CommonStyle.pAbsolute,
                historyScreenStyles.cloudBackgorund,
                colorScheme === "dark"
                  ? [CommonStyle.bg_1B1F23, historyScreenStyles.darkCloudImgHeight]
                  : [CommonStyle.bg_FFFFFF, historyScreenStyles.lightCloudImgHeight],
              ]}
              source={
                colorScheme === "dark"
                  ? require("../../../../assets/images/DarkCloudImage.png")
                  : require("../../../../assets/images/CloudBackground.png")
              }
            />
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratSemiBold,
                CommonStyle.fs_15,
                historyScreenStyles.paricipatedQuizTitle,
                colorScheme === "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_414254,
              ]}
            >
              Your Quiz History ({userHistory.length})
            </Text>
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserrat,
                CommonStyle.fs_10,
                historyScreenStyles.paricipatedQuizSubTitle,
                colorScheme === "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_5F656C,
              ]}
            >
              Check all your quiz history here for ease
            </Text>
            {
              historyLoader === true ?
              <ActivityIndicator size="large" color={"#666592"} />
              :
              <>
              {
                userHistory.length === 0 ? 
                <>
               <View
              style={[
                CommonStyle.ai_center,
                CommonStyle.bg_FAF8FF,
                historyScreenStyles.noQuizContainer,
                colorScheme === "dark"
                  ? CommonStyle.bg_282C2F
                  : CommonStyle.bg_FAF8FF,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratSemiBold,
                  CommonStyle.fs_15,
                  colorScheme === "dark"
                    ? CommonStyle.c_D1D0D0
                    : CommonStyle.c_666262,
                ]}
              >
                No Quiz Found
              </Text>
            </View>
                </>
                :

                <View
                style={[CommonStyle.ai_center, historyScreenStyles.historyCardContainer]}
              >
                {userHistory.reverse().map((quizData: [], index: number) => {
                  return (
                    <HistoryCard
                      key={index}
                      navigation={navigation}
                      quizData={quizData}
                    />
                  );
                })}
              </View>
              }
              </>
            }
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default HistoryScreen;
