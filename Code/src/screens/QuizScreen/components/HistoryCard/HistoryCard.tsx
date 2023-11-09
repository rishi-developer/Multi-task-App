import { Text, View, Image, TouchableOpacity } from "react-native";
import { historyCardStyles } from "./HistoryCardStyles";
import { QuizHistoryType, QuestionareType } from "../../../../../types";
import React from "react";
import useColorScheme from "../../../../hooks/useColorScheme";
import CommonStyle from "../../../../styles/Global";

const HistoryCard = ({ navigation, quizData }: any) => {
  const colorScheme = useColorScheme();
  const correctStatusBarStyle = (quizData: QuizHistoryType) => {
    let correctStatusBarBackgroundColor = "";
    let borderRadius = {
      borderBottomLeftRadius: 3,
      borderTopLeftRadius: 3,
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
    };
    if (quizData.correctAnswers <= 9) {
      correctStatusBarBackgroundColor = "#F0A347";
    } else {
      correctStatusBarBackgroundColor = "#36E748";
    }
    if (quizData.totalQuestions === quizData.correctAnswers) {
      borderRadius.borderBottomRightRadius = 3;
      borderRadius.borderTopRightRadius = 3;
    }
    return {
      width: quizData.correctAnswers * 10 + "%",
      height: "100%",
      backgroundColor: correctStatusBarBackgroundColor,
      ...borderRadius,
    };
  };
  const questionStatusBarData = (quizData: QuizHistoryType) => {
    if (quizData.totalQuestions === quizData.correctAnswers) {
      return "Completed";
    }
    return quizData.correctAnswers + "/" + quizData.totalQuestions;
  };

  const wrongStatusBarStyle = (quizData: QuizHistoryType) => {
    let borderRadius = {
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
    };
    if (quizData.correctAnswers === 0) {
      borderRadius.borderBottomLeftRadius = 3;
      borderRadius.borderTopLeftRadius = 3;
    }
    return {
      width: (quizData.totalQuestions - quizData.correctAnswers) * 10 + "%",
      height: "100%",
      backgroundColor: "#D9D9D9",
      ...borderRadius,
    };
  };

  const viewStatsBtn = (allViewStats: QuestionareType) => {
    navigation.navigate("ViewAnswers", {
      data: allViewStats,
    });
  };
  return (
    <View
      style={[
        CommonStyle.bg_FFFFFF,
        historyCardStyles.givenQuizContainer,
        colorScheme === "dark"
          ? [CommonStyle.bg_2E343C, historyCardStyles.darkThemeQuizContainer]
          : [CommonStyle.bg_FFFFFF, historyCardStyles.lightThemeQuizContainer],
      ]}
    >
      <View
        style={[
          CommonStyle.ai_center,
          CommonStyle.bg_FFF8DB,
          CommonStyle.pAbsolute,
          CommonStyle.flexDRow,
          historyCardStyles.pointsBox,
        ]}
      >
        <View
          style={[
            CommonStyle.h100,
            CommonStyle.jc_center,
            CommonStyle.ai_center,
            historyCardStyles.smallDiamondContainer,
          ]}
        >
          <Image
            style={historyCardStyles.smallDiamond}
            source={require("../../../../../assets/images/3dDiamondEmoji.png")}
          ></Image>
        </View>
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserratSemiBold,
            CommonStyle.c_F0A347,
            historyCardStyles.pointData,
          ]}
        >
          {"+" + quizData.points}{" "}
        </Text>
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserrat,
            CommonStyle.fs_15,
            CommonStyle.c_827E7E,
          ]}
        >
          points
        </Text>
      </View>
      <View style={historyCardStyles.spacingAfterPoints}></View>
      <View style={[CommonStyle.flexDRow, historyCardStyles.header]}>
        <View
          style={[
            CommonStyle.ai_center,
            CommonStyle.jc_center,
            historyCardStyles.imageContainer,
          ]}
        >
          <Image
            style={[
              CommonStyle.h100,
              CommonStyle.h100,
              CommonStyle.bg_FFF8EC,
              historyCardStyles.imageBox,
            ]}
            source={
              quizData.quizName.split(" ")[0].toLowerCase() == "car"
                ? require("../../../../../assets/images/car.png")
                : require("../../../../../assets/images/sports.png")
            }
          />
        </View>
        <View
          style={[
            CommonStyle.jc_center,
            historyCardStyles.quizNameTimeTakenQuestionContainer,
          ]}
        >
          <View style={[CommonStyle.flexDRow, historyCardStyles.quizComponentField]}>
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserrat,
                historyCardStyles.quizNameTimeTakenQuestionTitle,
                colorScheme === "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_5F656C,
              ]}
            >
              Name :{" "}
            </Text>
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratSemiBold,
                historyCardStyles.quizNameTimeTakenQuestionData,
                colorScheme === "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_666262,
              ]}
            >
              {quizData.quizName}
            </Text>
          </View>
          <View style={[CommonStyle.flexDRow, historyCardStyles.quizComponentField]}>
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserrat,
                historyCardStyles.quizNameTimeTakenQuestionTitle,
                colorScheme === "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_5F656C,
              ]}
            >
              Time Taken :{" "}
            </Text>
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratSemiBold,
                historyCardStyles.quizNameTimeTakenQuestionData,
                colorScheme === "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_666262,
              ]}
            >
              {Math.floor(quizData.timeTaken / 60) +
                "m " +
                Math.round(quizData.timeTaken % 60) +
                "sec"}
            </Text>
          </View>
          <View style={[CommonStyle.flexDRow, historyCardStyles.quizComponentField]}>
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserrat,
                historyCardStyles.quizNameTimeTakenQuestionTitle,
                colorScheme === "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_5F656C,
              ]}
            >
              Questions :{" "}
            </Text>
            <View
              style={[
                CommonStyle.ai_center,
                CommonStyle.flexDRow,
                historyCardStyles.questionStatusBar,
              ]}
            >
              <View style={correctStatusBarStyle(quizData)}></View>
              <View style={wrongStatusBarStyle(quizData)}></View>
              <View
                style={[
                  CommonStyle.pAbsolute,
                  CommonStyle.ai_center,
                  CommonStyle.jc_center,
                  historyCardStyles.questionStatusBarData,
                ]}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserratSemiBold,
                    CommonStyle.c_FFFFFF,
                    CommonStyle.fs_10,
                  ]}
                >
                  {questionStatusBarData(quizData)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {quizData.points > 0 &&  (
        <View style={[historyCardStyles.participatedQuizButtons, CommonStyle.flexDRow]}>
          <TouchableOpacity
            onPress={() => viewStatsBtn(quizData.stats)}
            style={[
              CommonStyle.ai_center,
              CommonStyle.jc_center,
              historyCardStyles.viewStatsBtn,
              colorScheme === "dark"
                ? CommonStyle.bg_2E343C
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratSemiBold,
                CommonStyle.c_9187E6,
                historyCardStyles.viewStatsBtnText,
              ]}
            >
              View Stats
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HistoryCard;
