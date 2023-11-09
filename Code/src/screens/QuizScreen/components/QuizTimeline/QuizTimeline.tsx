import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { quizTimelineStyles } from "./QuizTimelineStyles";
import { svgImports } from "../../../../data/Imports";
import CommonStyle from "../../../../styles/Global";
import useColorScheme from "../../../../hooks/useColorScheme";

let QuizTimeline = ({
  quesNo,
  basic_details,
  onClickTimeLine,
  setQuesNo,
  quesStatus,
  resetSelected,
}: any) => {
  const [ref, setRef] = useState<any>(null);
  const [dataSourceCords, setDataSourceCords] = useState<number[]>([]);
  const [scrollToIndex, setScrollToIndex] = useState(0);
  let colorScheme = useColorScheme();

  useEffect(() => {
    setScrollToIndex(quesNo - 1);
    scrollHandler();
  }, [quesNo]);

  const scrollHandler = () => {
    if (dataSourceCords.length > scrollToIndex) {
      ref.scrollTo({
        x: dataSourceCords[scrollToIndex - 1],
        y: 0,
        animated: true,
      });
    }
  };

  return (
    <View style={[CommonStyle.w100, quizTimelineStyles.timeline]}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        ref={(ref) => {
          setRef(ref);
        }}
      >
        {Array.from(Array(basic_details.No_OfQuestions), (e, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                CommonStyle.as_center,
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                quizTimelineStyles.timelineBtn,
              ]}
              onPress={() => {
                resetSelected(quesNo - 1);
                onClickTimeLine(index);
              }}
              onLayout={(event) => {
                const layout = event.nativeEvent.layout;
                dataSourceCords[index] = layout.x;
                setDataSourceCords(dataSourceCords);
              }}
            >
              <Text
                allowFontScaling={false}
                style={[CommonStyle.fs_20, CommonStyle.c_FFFFFF]}
              >
                {index + 1}
              </Text>
              {quesNo == index + 1 ? (
                <TouchableOpacity
                  style={[
                    CommonStyle.h100,
                    CommonStyle.pAbsolute,
                    CommonStyle.as_center,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    quizTimelineStyles.timelineBtnHover,
                    CommonStyle.bg_FFFFFF,
                  ]}
                  onPress={() => {
                    resetSelected(quesNo - 1);
                    setQuesNo(index + 1);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyle.fs_20, CommonStyle.c_666262]}
                  >
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              ) : quesStatus[index] == 2 ? (
                <TouchableOpacity
                  style={[
                    CommonStyle.w100,
                    CommonStyle.h100,
                    CommonStyle.pAbsolute,
                    CommonStyle.as_center,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    quizTimelineStyles.timelineBtnEmpty,
                    colorScheme === "dark"
                      ? quizTimelineStyles.darktimelineBtnEmpty
                      : quizTimelineStyles.lighttimelineBtnEmpty,
                  ]}
                  onPress={() => {
                    resetSelected(quesNo - 1);
                    setQuesNo(index + 1);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyle.fs_20, CommonStyle.c_FFFFFF]}
                  >
                    {index + 1}
                  </Text>
                  <View
                    style={[
                      CommonStyle.pAbsolute,
                      CommonStyle.jc_center,
                      CommonStyle.ai_center,
                      quizTimelineStyles.tickBtn,
                      CommonStyle.bg_FFFFFF,
                    ]}
                  >
                    <svgImports.Tick
                      style={[quizTimelineStyles.tick, quizTimelineStyles.lighttick]}
                      size={22}
                    />
                  </View>
                </TouchableOpacity>
              ) : quesStatus[index] == 1 ? (
                <TouchableOpacity
                  style={[
                    CommonStyle.h100,
                    CommonStyle.w100,
                    CommonStyle.pAbsolute,
                    CommonStyle.as_center,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    quizTimelineStyles.timelineBtnHoverFlag,
                    CommonStyle.bg_F8C67C,
                  ]}
                  onPress={() => {
                    resetSelected(quesNo - 1);
                    setQuesNo(index + 1);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyle.fs_20, CommonStyle.c_FFFFFF]}
                  >
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  key={index}
                  style={[
                    CommonStyle.w100,
                    CommonStyle.h100,
                    CommonStyle.pAbsolute,
                    CommonStyle.as_center,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    quizTimelineStyles.timelineBtnEmpty,
                    colorScheme === "dark"
                      ? quizTimelineStyles.darktimelineBtnEmpty
                      : quizTimelineStyles.lighttimelineBtnEmpty,
                  ]}
                  onPress={() => {
                    resetSelected(quesNo - 1);
                    setQuesNo(index + 1);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyle.fs_20, CommonStyle.c_FFFFFF]}
                  >
                    {index + 1}
                  </Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};



export default QuizTimeline;
