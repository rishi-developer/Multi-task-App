import React from "react";
import { Text, View, Image } from "react-native";
import { quizHistoryStatsStyles } from "./QuizHistoryStatsStyles";
import CommonStyle from "../../../../styles/Global";
const QuizHistoryStats = ({ data, emoji, containerBackground, text }: any) => {
  return (
    <View
      style={[
        quizHistoryStatsStyles.statsContainer,
        CommonStyle.ai_center,
        containerBackground,
      ]}
    >
      <View
        style={[
          CommonStyle.jc_center,
          CommonStyle.ai_center,
          quizHistoryStatsStyles.emojiContainer,
        ]}
      >
        <View
          style={[
            CommonStyle.jc_center,
            CommonStyle.ai_center,
            quizHistoryStatsStyles.circularContainer,
          ]}
        >
          <Image
            style={[CommonStyle.w100, CommonStyle.h100]}
            source={emoji}
          ></Image>
        </View>
      </View>
      <View style={quizHistoryStatsStyles.statsTitleContainer}>
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserrat,
            CommonStyle.c_666262,
            quizHistoryStatsStyles.statsTitle1,
            CommonStyle.ta_center,
          ]}
        >
          {text[0]}
        </Text>
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserratSemiBold,
            CommonStyle.fs_10,
            CommonStyle.c_666262,
            CommonStyle.ta_center,
            ,
          ]}
        >
          {data > 2 ? text[1] : text[1].substring(0, text[1].length - 1)}
        </Text>
      </View>
      <Text
        allowFontScaling={false}
        style={[
          CommonStyle.montserratSemiBold,
          CommonStyle.fs_15,
          CommonStyle.c_666262,
          quizHistoryStatsStyles.statsData,
          CommonStyle.ta_center,
          ,
        ]}
      >
        {data}
      </Text>
    </View>
  );
};

export default QuizHistoryStats;
