import React from "react";
import { View, Text, Image } from "react-native";
import { detailedStatsStyles } from "./DetailedStatsStyles";
import useColorScheme from "../../../../hooks/useColorScheme";
import CommonStyle from "../../../../styles/Global";

const DetailedStats = ({ data, index }: any) => {
  let colorScheme = useColorScheme();
  let generateQuestion = (quesNo: number, currentQuestion: string) => {
    // Check if the question ends with a question mark
    const endsWithQuestionMark = currentQuestion.trim().endsWith("?");
    // Combine the question number and question text
    return `Q${quesNo}. ${currentQuestion} ${endsWithQuestionMark ? "" : "?"}`;
  };
  return (
    <View
      style={[
        CommonStyle.w100,
        detailedStatsStyles.container,
        colorScheme === "dark" ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFEFE,
      ]}
    >
      <Text
        allowFontScaling={false}
        style={[
          CommonStyle.montserrat,
          CommonStyle.fs_15,
          detailedStatsStyles.questions,
          colorScheme === "dark" ? CommonStyle.c_D1CDCD : CommonStyle.c_666262,
        ]}
      >
        {generateQuestion(index + 1, data.ques)}
      </Text>
      {data.correctAns == data.userAns ? (
        <View
          style={[
            CommonStyle.flexDRow,
            CommonStyle.jc_spaceBTW,
            CommonStyle.ai_center,
            detailedStatsStyles.correctanswer1,
            CommonStyle.bg_D8FEE6,
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              CommonStyle.montserrat,
              CommonStyle.fs_15,
              detailedStatsStyles.correctanswerstext1,
              CommonStyle.c_21272E,
            ]}
          >
            {data.correctAns}
          </Text>
          <View
            style={[
              CommonStyle.flexDRow,
              CommonStyle.jc_center,
              CommonStyle.ai_center,
              detailedStatsStyles.correctImg,
            ]}
          >
            <Image
              style={detailedStatsStyles.iconCorrect}
              source={require("../../../../../assets/images/correct.png")}
              resizeMode="contain"
            />
          </View>
        </View>
      ) : (
        <View>
          <View
            style={[
              CommonStyle.flexDRow,
              CommonStyle.jc_spaceBTW,
              CommonStyle.ai_center,
              detailedStatsStyles.correctanswers2,
              CommonStyle.bg_D8FEE6,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserrat,
                CommonStyle.fs_15,
                detailedStatsStyles.correctanswerstext2,
                CommonStyle.c_21272E,
              ]}
            >
              {data.correctAns}
            </Text>
            <View
              style={[
                CommonStyle.flexDRow,
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                detailedStatsStyles.correctImg,
              ]}
            >
              <Image
                style={detailedStatsStyles.iconCorrect}
                source={require("../../../../../assets/images/correct.png")}
                resizeMode="contain"
              />
            </View>
          </View>
          <View
            style={[
              CommonStyle.flexDRow,
              CommonStyle.jc_spaceBTW,
              CommonStyle.ai_center,
              detailedStatsStyles.useranswer,
              CommonStyle.bg_FEDDDD,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserrat,
                CommonStyle.fs_15,
                detailedStatsStyles.useranswertext,
                CommonStyle.c_21272E,
              ]}
            >
              {data.userAns}
            </Text>
            <View
              style={[
                CommonStyle.flexDRow,
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                detailedStatsStyles.wrongImg,
              ]}
            >
              <Image
                style={detailedStatsStyles.icon}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/753/753345.png",
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};


export default DetailedStats;
