import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  Pressable,
  Modal,
  Image,
  ImageBackground,
  AppState,
} from "react-native";
import { quizStyles } from "./QuizStyles";
import { svgImports } from "../../../data/Imports";
import useColorScheme from "../../../hooks/useColorScheme";
import CommonStyle from "../../../styles/Global";
import * as SecureStore from "expo-secure-store";
import { TypeQuesStatusArray } from "../../../../types";
import QuizTimer from "../components/QuizTimer/QuizTimer";
import QuizTimeline from "../components/QuizTimeline/QuizTimeline";
function shuffleArray(arrayToShuffle: string[]) {
  for (
    let startingindex = arrayToShuffle.length - 1;
    startingindex >= 1;
    startingindex--
  ) {
    let shuffledIndex = Math.floor(Math.random() * (startingindex + 1));
    let temp = arrayToShuffle[shuffledIndex];
    arrayToShuffle[shuffledIndex] = arrayToShuffle[startingindex];
    arrayToShuffle[startingindex] = temp;
  }
  return arrayToShuffle;
}

let Quiz = ({ navigation, route }: any) => {
  const param = route.params;
  let Quiz_data = param.Questionare;
  const appState = useRef(AppState.currentState);
  const [quesNo, setQuesNo] = useState(1);
  //Selected stores the selected option for a particular question. It will store and update your value whenever you click on any option
  const [selected, setSelected] = useState<string[]>([]);
  //This tells us what is the ques status like 0-> unanswered 1-> Skip 2-> answered
  const [quesStatus, setQuesStatus] = useState<number[]>([]);
  //This is thevalue which helps us to store the question ,User ans and coreect answer for detailed stats section.
  const [stats, setstats] = useState<TypeQuesStatusArray[]>([]);
  const [options, setOptions] = useState(["a", "b", "c", "d"]);
  const [showWarning, setShowWarning] = useState(false);
  const [noOptionSelected, setNoOptionSelected] = useState(false);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [currentTime, setCurrentTime] = useState(param.basic_details.Time * 60);

  enum AppStateValue {
    inactive = "inactive",
    background = "background",
    extension = "extension",
    unknown = "unknown",
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        closeQuiz();
      }
      appState.current = nextAppState;
      switch (nextAppState) {
        case AppStateValue.inactive:
          closeQuiz();
        case AppStateValue.background:
          closeQuiz();
        case AppStateValue.extension:
          closeQuiz();
        case AppStateValue.unknown:
          closeQuiz();
      }
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    Timer();
  }, []);

  const Timer = async () => {
    const interval = setInterval(() => {
      setCurrentTime((currentTime) => currentTime - 1);
    }, 1000);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (currentTime == 0) {
      closeQuiz();
    }
  }, [currentTime]);

  let colorScheme = useColorScheme();

  let generateQuestion = (quesNo: number, currentQuestion: string) => {
    // Check if the question ends with a question mark
    const endsWithQuestionMark = currentQuestion.trim().endsWith("?");
    // Combine the question number and question text
    return `Q${quesNo}. ${currentQuestion} ${endsWithQuestionMark ? "" : "?"}`;
  };

  const closeQuiz = async () => {
    let data: string | null = await SecureStore.getItemAsync("quizData");
    let quizTime = await SecureStore.getItemAsync("quizTime");
    if (data !== null) {
      let newData: string = data?.toString();
      let totalTime: any = quizTime?.toString();
      let dat: TypeQuesStatusArray[] = JSON.parse(newData);
      let timeTaken = JSON.parse(totalTime);
      if (dat == null) {
        dat = stats;
      }
      setShowWarning(false);
      navigation.navigate("CongratsScreen", {
        quizId: param.quizId,
        basic_details: param.basic_details,
        data: dat,
        timeTaken: timeTaken,
      });
    } else {
      setShowWarning(true);
    }
  };

  useEffect(() => {
    generateOptions();
  }, [quesNo]);

  useEffect(() => {
    generateQuesStatus();
  }, []);

  useEffect(() => {
    const backbuttonHander = () => {
      alert();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backbuttonHander);
  }, []);

  const alert = () => {
    setShowWarning(true);
  };

  const showWarningfalse = () => {
    setShowWarning(false);
  };

  const generateOptions = () => {
    let generatingQuestionArray = [...Quiz_data[quesNo - 1].Incorect_Ans];
    generatingQuestionArray.push(Quiz_data[quesNo - 1].CorrectAns);
    generatingQuestionArray = shuffleArray(generatingQuestionArray);
    setOptions(generatingQuestionArray);
  };

  const generateQuesStatus = () => {
    let quesStatsArray: number[] = [];
    for (let i = 0; i < param.basic_details.No_OfQuestions; i++) {
      quesStatsArray.push(0);
    }
    setQuesStatus(quesStatsArray);
  };

  const clkPrevious = () => {
    resetSelected(quesNo - 1);
    if (quesNo > 1) {
      setQuesNo(quesNo - 1);
      generateOptions();
      setNoOptionSelected(false);
    }
  };

  const resetSelected = (index: number) => {
    let val = stats.filter((e) => {
      return e.quesNo == index;
    });
    if (val.length > 0) {
      let ansArray = new Array();
      ansArray = [...selected];
      ansArray[quesNo - 1] = val[0].userAns;
      setSelected(ansArray);
    }
  };

  const clkSkip = () => {
    if (quesNo < param.basic_details.No_OfQuestions) {
      if (quesStatus[quesNo - 1] != 2) {
        let quesStatsArray: number[] = quesStatus;
        quesStatsArray[quesNo - 1] = 1;
        setQuesStatus(quesStatsArray);
        let ansArray = new Array();
        ansArray = [...selected];
        ansArray[quesNo - 1] = undefined;
        setSelected(ansArray);
      } else {
        resetSelected(quesNo - 1);
      }
      setQuesNo(quesNo + 1);
      setNoOptionSelected(false);
    }
  };

  const save = async () => {
    let statisticArray: number[] = quesStatus;
    statisticArray[quesNo - 1] = 2;
    let quesStatusarray: TypeQuesStatusArray[] = stats;
    quesStatusarray[quesNo - 1] = {
      quesNo: quesNo - 1,
      ques: Quiz_data[quesNo - 1].Ques,
      correctAns: Quiz_data[quesNo - 1].CorrectAns,
      userAns: selected[quesNo - 1],
    };
    await SecureStore.setItemAsync("quizData", JSON.stringify(quesStatusarray));
    await SecureStore.setItemAsync(
      "quizTime",
      JSON.stringify(param.basic_details.Time * 60 - currentTime)
    );
    setstats(quesStatusarray);
    setQuesStatus(statisticArray);
    setNoOptionSelected(false);
  };

  const clkSaveAndNext = async () => {
    if (selected[quesNo - 1] == undefined) {
      setNoOptionSelected(true);
    } else if (quesNo == param.basic_details.No_OfQuestions) {
      await save();
      if (Object.keys(stats).length == param.basic_details.No_OfQuestions) {
        setShowWarning(false);
        navigation.navigate("CongratsScreen", {
          quizId: param.quizId,
          basic_details: param.basic_details,
          data: stats,
          timeTaken: param.basic_details.Time * 60 - currentTime,
        });
      } else {
        alert();
      }
    } else {
      save();
      setQuesNo(quesNo + 1);
    }
  };

  const onClickTimeLine = (index: any) => {
    resetSelected(quesNo - 1);
    setQuesNo(index + 1);
    setNoOptionSelected(false);
  };

  return (
    <View style={[CommonStyle.h100, CommonStyle.w100, CommonStyle.bg_6A5AE1]}>
      <ImageBackground
        source={require("../../../../assets/images/quizbg.png")}
        style={[CommonStyle.w100, CommonStyle.h100]}
      >
        <View
          style={[CommonStyle.flexDRow, CommonStyle.jc_spaceBTW, quizStyles.topBar]}
        >
          {/*Quiz  Timer Component */}
          <QuizTimer currentTime={currentTime} />
          <TouchableOpacity
            style={[
              CommonStyle.as_center,
              CommonStyle.jc_center,
              CommonStyle.bg_E46566,
              quizStyles.endBtn,
            ]}
            onPress={() => alert()}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratSemiBold,
                CommonStyle.fs_15,
                CommonStyle.as_center,
                CommonStyle.c_FFFFFF,
              ]}
            >
              End
            </Text>
          </TouchableOpacity>
        </View>
        {/*Quiz TimeLine Component  */}
        <QuizTimeline
          quesNo={quesNo}
          basic_details={param.basic_details}
          onClickTimeLine={onClickTimeLine}
          setQuesNo={setQuesNo}
          quesStatus={quesStatus}
          resetSelected={resetSelected}
        />
        <View
          style={[
            CommonStyle.w100,
            quizStyles.questionContainer,
            colorScheme === "dark"
              ? CommonStyle.bg_1B1F23
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View
            style={[
              CommonStyle.flexDRow,
              CommonStyle.as_center,
              CommonStyle.jc_spaceBTW,
              quizStyles.questionTabContainer,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserrat,
                CommonStyle.fs_15,
                CommonStyle.as_center,
                colorScheme === "dark"
                  ? CommonStyle.c_D0D0D2
                  : CommonStyle.c_5F656C,
              ]}
            >
              Question. {quesNo}/{param.basic_details.No_OfQuestions}
            </Text>
            <TouchableOpacity
              style={
                quesNo == param.basic_details.No_OfQuestions
                  ? quizStyles.skiptextNone
                  : [
                      CommonStyle.h100,
                      CommonStyle.jc_center,
                      CommonStyle.ai_center,
                      quizStyles.skipBtn,
                      quizStyles.lightskipBtn,
                      colorScheme === "dark" && CommonStyle.bg_1B1F23,
                    ]
              }
              onPress={clkSkip}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratSemiBold,
                  CommonStyle.fs_15,
                  CommonStyle.c_F8C67C,
                ]}
              >
                Skip
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            allowFontScaling={false}
            style={[
              CommonStyle.montserratSemiBold,
              CommonStyle.fs_15,
              quizStyles.questionnumber,
              colorScheme === "dark"
                ? CommonStyle.c_D0D0D2
                : CommonStyle.c_414254,
            ]}
          >
            {generateQuestion(quesNo, Quiz_data[quesNo - 1].Ques)}
          </Text>
          {noOptionSelected && (
            <View
              style={[
                CommonStyle.flexDRow,
                CommonStyle.jc_flexStart,
                CommonStyle.ai_center,
                quizStyles.notSelected,
                quizStyles.lightnotSelected,
              ]}
            >
              <Image
                style={[CommonStyle.as_center, quizStyles.info]}
                source={require("../../../../assets/images/info.png")}
                resizeMode="contain"
              />
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserrat,
                  CommonStyle.fs_15,
                  quizStyles.warning,
                  quizStyles.lightwarning,
                ]}
              >
                Please select an option to proceed
              </Text>
            </View>
          )}
          {options.map((option, index) => {
            let optionAlpha = "A";
            return (
              <TouchableOpacity
                key={option.toString()}
                style={[
                  CommonStyle.jc_center,
                  selected[quesNo - 1] === option
                    ? [
                        quizStyles.optionBtnHover,
                        CommonStyle.bg_EFEDFF,
                        quizStyles.lightoptionBtnHover,
                      ]
                    : [
                        quizStyles.optionBtn,
                        colorScheme === "dark"
                          ? [CommonStyle.bg_2E343C, quizStyles.darkoptionBtn]
                          : [CommonStyle.bg_FFFFFF, quizStyles.lightoptionBtn],
                      ],
                ]}
                onPress={() => {
                  let newArray: string[] = new Array();
                  newArray = [...selected];
                  newArray[quesNo - 1] = option;
                  setSelected(newArray);
                  setNoOptionSelected(false);
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserratSemiBold,
                    selected[quesNo - 1] == option
                      ? [
                          CommonStyle.fs_15,
                          CommonStyle.as_FStart,
                          CommonStyle.c_9187E6,
                        ]
                      : [
                          CommonStyle.fs_15,
                          CommonStyle.as_FStart,
                          colorScheme === "dark"
                            ? CommonStyle.c_D1D0D0
                            : CommonStyle.c_666262,
                        ],
                  ]}
                >
                  {String.fromCharCode(
                    optionAlpha.charCodeAt(0) + index
                  ).toString()}
                  . {option}
                </Text>
                {selected[quesNo - 1] == option && (
                  <View
                    style={[
                      CommonStyle.pAbsolute,
                      CommonStyle.jc_center,
                      CommonStyle.ai_center,
                      quizStyles.circle,
                      CommonStyle.bg_9187E6,
                    ]}
                  >
                    <svgImports.TickSelect size={23} />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
          <View
            style={[
              CommonStyle.flexDRow,
              CommonStyle.pAbsolute,
              CommonStyle.w100,
              CommonStyle.jc_spaceEven,
              quizStyles.bottomTab,
            ]}
          >
            <TouchableOpacity
              style={
                quesNo == 1
                  ? quizStyles.previosBtnDisable
                  : [
                      CommonStyle.h100,
                      CommonStyle.jc_center,
                      CommonStyle.ai_center,
                      quizStyles.lightpreviosBtn,
                      quizStyles.previosBtn,
                      colorScheme === "dark" && CommonStyle.bg_1B1F23,
                    ]
              }
              onPress={clkPrevious}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratSemiBold,
                  CommonStyle.fs_15,
                  CommonStyle.c_9187E6,
                ]}
              >
                Previous
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CommonStyle.h100,
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                quizStyles.saveAndNextBtn,
                CommonStyle.bg_9187E6,
              ]}
              onPress={() => {
                clkSaveAndNext();
              }}
            >
              <Text
                allowFontScaling={false}
                style={
                  quesNo == 1
                    ? [
                        CommonStyle.montserratSemiBold,
                        CommonStyle.fs_15,
                        CommonStyle.as_center,
                        CommonStyle.c_FFF9F9,
                      ]
                    : [
                        CommonStyle.montserratSemiBold,
                        CommonStyle.fs_15,
                        CommonStyle.c_FFF9F9,
                      ]
                }
              >
                {quesNo < param.basic_details.No_OfQuestions
                  ? "Save and Next"
                  : "Save and Exit"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {showWarning && (
          <View
            style={[
              CommonStyle.flex1,
              CommonStyle.ai_center,
              CommonStyle.bg_FFFFFF,
            ]}
          >
            <Modal
              visible={showWarning}
              transparent
              onRequestClose={() => showWarningfalse()}
            >
              <View
                style={[
                  CommonStyle.flex1,
                  CommonStyle.h100,
                  CommonStyle.w100,
                  CommonStyle.jc_center,
                  CommonStyle.ai_center,
                  quizStyles.darkcentered_view,
                ]}
              >
                <View
                  style={[
                    quizStyles.warning_modal,
                    colorScheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  <View
                    style={[
                      CommonStyle.as_center,
                      CommonStyle.jc_center,
                      CommonStyle.ai_center,
                      quizStyles.modal_handsEmoji,
                      quizStyles.darkmodal_handsEmoji,
                    ]}
                  >
                    <svgImports.StopHand size={100} />
                  </View>
                  <View style={quizStyles.modal_body}>
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserratSemiBold,
                        CommonStyle.as_center,
                        quizStyles.text,
                        colorScheme === "dark"
                          ? CommonStyle.c_D0D0D2
                          : CommonStyle.c_666262,
                      ]}
                    >
                      Hold up ! Before you go
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.as_center,
                        CommonStyle.fs_15,
                        colorScheme === "dark"
                          ? CommonStyle.c_D0D0D2
                          : CommonStyle.c_636A74,
                      ]}
                    >
                      You have{" "}
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserratSemiBold,
                          CommonStyle.fs_15,
                          CommonStyle.c_9187E6,
                        ]}
                      >
                        {param.basic_details.No_OfQuestions -
                          Object.keys(stats).length}{" "}
                        questions
                      </Text>{" "}
                      remaining{" "}
                    </Text>
                    <View
                      style={[
                        CommonStyle.jc_spaceAround,
                        CommonStyle.flexDRow,
                        CommonStyle.w100,
                        quizStyles.bottombar,
                      ]}
                    >
                      <Pressable
                        onPress={() => {
                          setShowWarning(false);
                          navigation.navigate("CongratsScreen", {
                            quizId: param.quizId,
                            basic_details: param.basic_details,
                            data: stats,
                            timeTaken:
                              param.basic_details.Time * 60 - currentTime,
                          });
                        }}
                      >
                        <View
                          style={[
                            CommonStyle.jc_center,
                            CommonStyle.ac_center,
                            quizStyles.lighttextYes,
                            quizStyles.textYes,
                            colorScheme === "dark" && CommonStyle.bg_1B1F23,
                          ]}
                        >
                          <Text
                            allowFontScaling={false}
                            style={[
                              CommonStyle.montserratSemiBold,
                              CommonStyle.as_center,
                              quizStyles.lightwarning,
                            ]}
                          >
                            Exit Quiz
                          </Text>
                        </View>
                      </Pressable>
                      <Pressable
                        onPress={() => showWarningfalse()}
                        style={quizStyles.notext}
                      >
                        <View
                          style={[
                            CommonStyle.jc_center,
                            CommonStyle.as_center,
                            quizStyles.textNo,
                            CommonStyle.bg_9187E6,
                          ]}
                        >
                          <Text
                            allowFontScaling={false}
                            style={[
                              CommonStyle.montserratSemiBold,
                              CommonStyle.as_center,
                              CommonStyle.c_FFFFFF,
                            ]}
                          >
                            Back to Quiz
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default Quiz;
