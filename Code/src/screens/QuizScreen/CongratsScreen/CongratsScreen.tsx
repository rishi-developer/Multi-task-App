import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from "react-native";
import { congratsScreenStyles } from "./CongratsScreenStyles";
import * as SecureStore from "expo-secure-store";
import LottieView from "lottie-react-native";

import useColorScheme from "../../../hooks/useColorScheme";
import Service from "../../../services/api/QuizApi/quizApiService";
import socket from "../../../services/socket";
import CommonStyle from "../../../styles/Global";
import { NeoContext } from "../../../NeoProvider/NeoProvider";

const backgroundImage = require("../../../../assets/images/congratscard.png");
const darkbackgroundImage = require("../../../../assets/images/darkCongratsBG.png");

const CongratsScreen = ({ navigation, route }: any) => {
  let quizService = new Service();
  let { userDetails }: any = useContext(NeoContext);
  const param = route.params;
  let QuizData = param.data;
  const [ansStats, setAnsStats] = useState<number[]>([]);
  const colorscheme = useColorScheme();
  useEffect(() => {
    findTotalScore();
  }, []);

  useEffect(() => {
    const backbuttonHander = () => {
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backbuttonHander);
  }, []);

  useEffect(() => {
    if (ansStats[0] != undefined) {
      saveToDatabse();
    }
  }, [ansStats]);

  const findTotalScore = async () => {
    await calculateScore();
  };

  let calculateScore = async () => {
    let correctAnswer = 0;
    let wronAnswer = 0;
    let ToalaQuizStatsArray: number[] = [];
    let totalPoints = 0;
    QuizData.forEach((e: typeof QuizData) => {
      e.correctAns == e.userAns ? correctAnswer++ : wronAnswer++;
    });
    totalPoints = correctAnswer * 10;
    if (correctAnswer >= 1 || wronAnswer >= 1) {
      totalPoints += 5;
    }
    if (correctAnswer == param.basic_details.No_OfQuestions) {
      totalPoints += 20;
    }
    if (correctAnswer + wronAnswer == param.basic_details.No_OfQuestions) {
      totalPoints += 5;
    }
    ToalaQuizStatsArray = [correctAnswer, wronAnswer, totalPoints];
    await setAnsStats([...ansStats, ...ToalaQuizStatsArray]);
  };

  const saveToDatabse = async () => {
    let data = {
      emailId: userDetails.email,
      quizId: param.quizId,
      correctAnswers: ansStats[0],
      wrongAnswer: ansStats[1],
      points: ansStats[2],
      quizName: param.basic_details.Topic,
      stats: QuizData,
      timeTaken: param.timeTaken,
      totalQuestions: param.basic_details.No_OfQuestions,
      quizLogo: param.basic_details.logoUrl,
    };
    quizService.submitQuizDetails(data);
    socket.emit("quiz", true);
  };

  return (
    <View style={[CommonStyle.flex1, CommonStyle.bg_FFFFFF]}>
      <ImageBackground
        source={colorscheme === "dark" ? darkbackgroundImage : backgroundImage}
        style={[CommonStyle.w100, CommonStyle.h100, CommonStyle.ai_center]}
      >
        <View style={congratsScreenStyles.trophyview}>
          <LottieView
            source={require("../../../../assets/lottie/congrats.json")}
            style={[congratsScreenStyles.trophy, CommonStyle.as_center, CommonStyle.h100]}
            autoPlay
            loop
          />
        </View>
        <View style={congratsScreenStyles.yougotpoints}>
          <Text
            allowFontScaling={false}
            style={[
              CommonStyle.montserratBold,
              CommonStyle.c_666262,
              CommonStyle.fs_20,
              colorscheme === "dark" && CommonStyle.c_D1CDCD,
            ]}
          >
            You got{" "}
          </Text>
          <Text
            allowFontScaling={false}
            style={[
              CommonStyle.montserratBold,
              CommonStyle.c_F3AE33,
              CommonStyle.fs_20,
            ]}
          >
            +{ansStats[2]} points !
          </Text>
        </View>
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserrat,
            CommonStyle.c_636A74,
            CommonStyle.fs_15,
            CommonStyle.ai_center,
            congratsScreenStyles.participatingtext,
            colorscheme === "dark" && congratsScreenStyles.lighttext,
          ]}
        >
          Thank you for taking time to participate {"\n"}Now let us see how you
          have performed
        </Text>
        <View
          style={[
            CommonStyle.flexDRow,
            CommonStyle.jc_spaceEven,
            congratsScreenStyles.correctincorrectview,
          ]}
        >
          <View
            style={[
              congratsScreenStyles.correct,
              CommonStyle.bg_D8FEE6,
              CommonStyle.ai_center,
              CommonStyle.jc_spaceEven,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[CommonStyle.montserratBold, congratsScreenStyles.textcorrect]}
            >
              Correct
            </Text>
            <Text
              allowFontScaling={false}
              style={[CommonStyle.montserratBold, congratsScreenStyles.correctscore]}
            >
              {ansStats[0]}
            </Text>
          </View>
          <View
            style={[
              congratsScreenStyles.incorrect,
              CommonStyle.bg_FEDDDD,
              CommonStyle.ai_center,
              CommonStyle.jc_spaceEven,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[CommonStyle.montserratBold, congratsScreenStyles.textincorrect]}
            >
              Incorrect
            </Text>
            <Text
              allowFontScaling={false}
              style={[CommonStyle.montserratBold, congratsScreenStyles.incorrectscore]}
            >
              {ansStats[1]}
            </Text>
          </View>
        </View>
        <View
          style={[
            CommonStyle.flexDCol,
            CommonStyle.jc_spaceEven,
            CommonStyle.ai_center,
            congratsScreenStyles.detailedandhomenav,
          ]}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ViewAnswers", { data: QuizData })
            }
            style={[
              congratsScreenStyles.viewstats,
              CommonStyle.bg_9187E6,
              CommonStyle.ai_center,
              CommonStyle.jc_center,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                CommonStyle.c_FFFFFF,
                CommonStyle.fs_15,
              ]}
            >
              View Detailed Stats
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              congratsScreenStyles.goback,
              CommonStyle.ai_center,
              CommonStyle.jc_center,
            ]}
            onPress={() => {
              SecureStore.deleteItemAsync("quizData");
              navigation.navigate("QuizHomeMain");
            }}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                CommonStyle.c_9187E6,
                CommonStyle.fs_15,
              ]}
            >
              Go to Homepage
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CongratsScreen;
