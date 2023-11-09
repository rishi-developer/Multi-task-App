import React, { useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  BackHandler,
} from "react-native";
import { viewAnswersStyles } from "./ViewAnswersStyles";
import DetailedStats from "../components/DetailedStats/DetailedStats";
import CommonStyle from "../../../styles/Global";
import useColorScheme from "../../../hooks/useColorScheme";

const ViewAnswers = ({ navigation, route }: any) => {
  const QuizData = route.params.data;
  let colorScheme = useColorScheme();
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backbuttonHander);
  }, []);
  return (
    <View
      style={[
        CommonStyle.flex1,
        CommonStyle.w100,
        colorScheme === "dark" ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFEFE,
      ]}
    >
      <View
        style={[
          CommonStyle.flexDRow,
          CommonStyle.as_center,
          CommonStyle.ai_center,
          CommonStyle.jc_spaceBTW,
          viewAnswersStyles.header,
        ]}
      >
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserratBold,
            CommonStyle.fs_15,
            colorScheme === "dark"
              ? CommonStyle.c_D1CDCD
              : CommonStyle.c_414254,
          ]}
        >
          Detailed Stats
        </Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={viewAnswersStyles.close}
        >
          <Image
            style={viewAnswersStyles.icon}
            source={{
              uri: "https://cdn-icons-png.flaticon.com/128/753/753345.png",
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <View
        style={[
          viewAnswersStyles.secondmargin,
          colorScheme === "dark"
            ? viewAnswersStyles.darksecondmargin
            : viewAnswersStyles.lightsecondmargin,
        ]}
      />
      <View style={[CommonStyle.w100, viewAnswersStyles.scrollview]}>
        {QuizData.length <= 0 ? (
          <Text
            style={[
              CommonStyle.montserrat,
              CommonStyle.jc_center,
              CommonStyle.as_center,
              CommonStyle.fs_20,
              viewAnswersStyles.noquestionsselected,
              colorScheme === "dark"
                ? CommonStyle.c_D1CDCD
                : CommonStyle.c_747B84,
            ]}
            allowFontScaling={false}
          >
            You haven't attempted any question
          </Text>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {QuizData.map((quizDataValue: typeof QuizData, index: number) => {
              return (
                quizDataValue != null && (
                  <DetailedStats
                    key={index}
                    data={quizDataValue}
                    index={index}
                  />
                )
              );
            })}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
export default ViewAnswers;
