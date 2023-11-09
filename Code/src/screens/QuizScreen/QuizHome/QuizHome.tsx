import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Modal,
  ImageBackground,
  Platform,
  BackHandler
} from "react-native";
import { quizHomeStyles } from "./QuizHomeStyles";
import { Audio } from "expo-av";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import { svgImports } from "../../../data/Imports";
import useColorScheme from "../../../hooks/useColorScheme";
import socket from "../../../services/socket";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import CommonStyle from "../../../styles/Global";

const QuizHome = ({ navigation, route }: any) => {
  let { userDetails, fetchQuizData, quizData } = useContext(NeoContext);
  const [quizid, setquizid] = useState(0);
  const [allQuizInfo, setAllQuizInfo]: any = useState([]);
  const [modalVis, setModalVis] = useState(true);
  const [quizConfirmModal, setQuizConfirmModal] = useState(false);
  const [socketUpdate, setSocketUpdate] = useState(false);
  const colorScheme = useColorScheme();
  const darkModeOn = colorScheme === "dark";
  const rulesArray = [
    "Putting the app in background will result in ending of the quiz",
    "10 points for every correct answer",
    "If you start the quiz +5 points",
    "If all questions are answered +5 points",
    "If all questions are correct +20 points",
  ];

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    socket.on("quiz_response", (boolean: boolean) => {
      setSocketUpdate(boolean);
    });
  }, []);
  useEffect(() => {
    if (socketUpdate) {
      fetchQuizData();
      setSocketUpdate(false);
    }
  }, [socketUpdate]);

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    fetchQuiz();
  }, [quizData]);

  const fetchQuiz = async () => {
    if (quizData != undefined && quizData.length >= 1) {
      let allQuizData: string[] = [];
      quizData.map((e: typeof quizData) => {
        if (!e.submitted_user.includes(userDetails.email.toLowerCase())) {
          if (
            Number(e.basic_details.TimePeriod.end.split("-")[2]) >
            new Date().getFullYear()
          ) {
            allQuizData.push(e.basic_details);
          } else if (
            Number(e.basic_details.TimePeriod.end.split("-")[2]) ==
            new Date().getFullYear()
          ) {
            if (
              Number(e.basic_details.TimePeriod.end.split("-")[1]) >
              new Date().getMonth() + 1
            ) {
              allQuizData.push(e.basic_details);
            } else if (
              Number(e.basic_details.TimePeriod.end.split("-")[1]) ==
              new Date().getMonth() + 1
            ) {
              if (
                Number(e.basic_details.TimePeriod.end.split("-")[0]) >=
                new Date().getDate()
              ) {
                allQuizData.push(e.basic_details);
              }
            }
          }
        }
      });
      setAllQuizInfo(allQuizData);
    }
  };

  const play = async () => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const playBackObject = new Audio.Sound();
    const { sound } = await Audio.Sound.createAsync(
      require("../../../../assets/sound/splashSound.mp3")
    );
    await sound.playAsync();
  };

  useEffect(() => {
    play();
    let timer = setTimeout(function () {
      setModalVis(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  function startQuizModal(value: boolean, id: number) {
    let selectedQuiz = id;
    let index = quizData.findIndex((quiz: any) => {
      return quiz.basic_details.id === selectedQuiz;
    });
    setquizid(index);
    setQuizConfirmModal(value);
  }
  if (!modalVis && quizData != undefined) {
    return (
      <React.Fragment>
        {allQuizInfo && (
          <View
            style={[
              CommonStyle.w100,
              CommonStyle.h100,
              darkModeOn ? CommonStyle.bg_171827 : CommonStyle.bg_FFFFFF,
            ]}
          >
            {quizConfirmModal && (
              <Modal
                visible={quizConfirmModal}
                transparent={true}
                onRequestClose={() => setQuizConfirmModal(false)}
              >
                <View
                  style={[
                    CommonStyle.h100,
                    CommonStyle.w100,
                    CommonStyle.pAbsolute,
                    quizHomeStyles.quizConfirmModalContainer,
                    darkModeOn ? CommonStyle.bg_1C2024 : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  {darkModeOn ? (
                    <svgImports.DarkPopUpImage
                      style={[CommonStyle.w100, quizHomeStyles.popup]}
                      resizeMode=""
                    ></svgImports.DarkPopUpImage>
                  ) : (
                    <svgImports.PopUpImage
                      style={[CommonStyle.w100, quizHomeStyles.popup]}
                      resizeMode=""
                    ></svgImports.PopUpImage>
                  )}
                  <TouchableOpacity
                    style={quizHomeStyles.backBtnArea}
                    onPress={() => setQuizConfirmModal(false)}
                  >
                    <View style={quizHomeStyles.backBtn}></View>
                  </TouchableOpacity>
                  <Image
                    source={require("../../../../assets/images/popupdesign.png")}
                    style={[CommonStyle.pAbsolute, quizHomeStyles.popupimage]}
                  ></Image>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.fs_20,
                      quizHomeStyles.designquiztext,
                      CommonStyle.montserratBold,
                      darkModeOn ? CommonStyle.c_D1D0D0 : CommonStyle.c_414254,
                    ]}
                  >
                    {quizData[quizid].basic_details.Topic}
                  </Text>
                  <View style={[CommonStyle.flexDRow, quizHomeStyles.pointsview]}>
                    <View
                      style={[
                        CommonStyle.ai_center,
                        CommonStyle.jc_center,
                        CommonStyle.flexDRow,
                        quizHomeStyles.imagepointsview,
                        darkModeOn
                          ? CommonStyle.bg_7C672F
                          : CommonStyle.bg_FFEEC1,
                      ]}
                    >
                      <Image
                        style={quizHomeStyles.pointsandtimerimage}
                        source={require("../../../../assets/images/diamond.png")}
                      ></Image>
                      <Text
                        allowFontScaling={false}
                        style={[
                          quizHomeStyles.pointstext,
                          CommonStyle.montserrat,
                          darkModeOn
                            ? CommonStyle.c_D1D0D0
                            : CommonStyle.c_414254,
                        ]}
                      >
                        {quizData[quizid].basic_details.No_OfQuestions *
                          quizData[quizid].basic_details.pointsPerQuestion}{" "}
                        pts
                      </Text>
                    </View>
                    <View
                      style={[
                        CommonStyle.ai_center,
                        CommonStyle.jc_center,
                        CommonStyle.flexDRow,
                        quizHomeStyles.timerview,
                      ]}
                    >
                      {darkModeOn ? (
                        <Image
                          style={quizHomeStyles.pointsandtimerimage}
                          source={require("../../../../assets/images/clockDark.png")}
                        ></Image>
                      ) : (
                        <Image
                          style={quizHomeStyles.pointsandtimerimage}
                          source={require("../../../../assets/images/timer.png")}
                        ></Image>
                      )}

                      <Text
                        allowFontScaling={false}
                        style={[
                          quizHomeStyles.timertext,
                          CommonStyle.montserrat,
                          darkModeOn
                            ? CommonStyle.c_D1D0D0
                            : CommonStyle.c_414254,
                        ]}
                      >
                        {quizData[quizid].basic_details.Time} mins
                      </Text>
                    </View>
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.fs_15,
                      quizHomeStyles.modalwelcometext,
                      CommonStyle.montserrat,
                      darkModeOn ? CommonStyle.c_D1D0D0 : CommonStyle.c_414254,
                    ]}
                  >
                    Take this basic{" "}
                    {quizData[quizid].basic_details.Topic.toLowerCase()} to test
                    your{" "}
                    {
                      quizData[quizid].basic_details.Topic.toLowerCase().split(
                        " "
                      )[0]
                    }{" "}
                    knowledge.
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.c_414254,
                      CommonStyle.fs_15,
                      quizHomeStyles.rules,
                      CommonStyle.montserratBold,
                      darkModeOn ? CommonStyle.c_D1D0D0 : CommonStyle.c_414254,
                    ]}
                  >
                    Rules for you
                  </Text>
                  <ScrollView>
                    {rulesArray.map((ruleText, index) => {
                      return (
                        <View
                          key={index}
                          style={[
                            CommonStyle.flexDRow,
                            CommonStyle.ai_center,
                            quizHomeStyles.rulesview1,
                          ]}
                        >
                          <View
                            style={[
                              CommonStyle.bg_E3E1F4,
                              CommonStyle.ai_center,
                              CommonStyle.jc_center,
                              quizHomeStyles.circle1,
                            ]}
                          >
                            <Text
                              allowFontScaling={false}
                              style={[
                                CommonStyle.montserrat,
                                CommonStyle.ta_center,
                                CommonStyle.fs_15,
                                CommonStyle.c_9187E6,
                                quizHomeStyles.circledata,
                              ]}
                            >
                              {index + 1}
                            </Text>
                          </View>
                          <Text
                            allowFontScaling={false}
                            style={[
                              quizHomeStyles.rule1,
                              CommonStyle.montserrat,
                              darkModeOn
                                ? CommonStyle.c_D1D0D0
                                : CommonStyle.c_414254,
                            ]}
                          >
                            {ruleText}
                          </Text>
                        </View>
                      );
                    })}
                    <TouchableOpacity
                      style={[
                        CommonStyle.jc_center,
                        CommonStyle.bg_9187E6,
                        CommonStyle.ai_center,
                        CommonStyle.as_center,
                        CommonStyle.flexDRow,
                        quizHomeStyles.finalStartBtn,
                      ]}
                      onPress={() => {
                        setQuizConfirmModal(false);
                        navigation.navigate("Quiz", {
                          quizId:quizData[quizid].id,
                          basic_details: quizData[quizid].basic_details,
                          Questionare: quizData[quizid].questionare,
                        });
                      }}
                    >
                      <Image
                        source={require("../../../../assets/images/polygon.png")}
                        style={quizHomeStyles.polygon}
                      ></Image>
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.c_FFFFFF,
                          CommonStyle.fs_15,
                          quizHomeStyles.startquiz,
                          CommonStyle.montserratSemiBold,
                        ]}
                      >
                        Start Your Quiz
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </Modal>
            )}
            <View
              style={[
                CommonStyle.w100,
                CommonStyle.flexDRow,
                CommonStyle.jc_center,
                CommonStyle.bg_6A5AE1,
                CommonStyle.ai_center,
                quizHomeStyles.header,
              ]}
            >
              <View
                style={[
                  CommonStyle.flexDRow,
                  CommonStyle.jc_spaceEven,
                  CommonStyle.as_center,
                  quizHomeStyles.headerContainer,
                ]}
              >
                <View
                  style={[
                    CommonStyle.jc_center,
                    CommonStyle.dflex,
                    CommonStyle.as_center,
                    quizHomeStyles.UserImage,
                  ]}
                >
                  {userDetails.photoUrl ? (
                    <Image
                      style={[
                        CommonStyle.pAbsolute,
                        CommonStyle.as_center,
                        quizHomeStyles.userImg,
                      ]}
                      key={userDetails.photoUrl}
                      source={{ uri: userDetails.photoUrl }}
                    ></Image>
                  ) : (
                    <Image
                      style={[
                        CommonStyle.pAbsolute,
                        CommonStyle.as_center,
                        quizHomeStyles.userImg,
                      ]}
                      source={{
                        uri: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png",
                      }}
                      resizeMode="contain"
                    />
                  )}
                </View>
                <View
                  style={[
                    CommonStyle.dflex,
                    CommonStyle.h100,
                    CommonStyle.flexDRow,
                    quizHomeStyles.welcomeBar,
                  ]}
                >
                  <View
                    style={[
                      CommonStyle.dflex,
                      CommonStyle.as_center,
                      quizHomeStyles.welcomeText,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.fs_13,
                        CommonStyle.c_F8F8F8,
                        quizHomeStyles.welcome,
                      ]}
                    >
                      Welcome to Quiz
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserratBold,
                        CommonStyle.c_FFFFFF,
                        quizHomeStyles.userName,
                      ]}
                    >
                      {userDetails.userName.split(" ")[0]}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      CommonStyle.h100,
                      CommonStyle.dflex,
                      CommonStyle.jc_center,
                      CommonStyle.ai_center,
                      quizHomeStyles.closeBtn,
                    ]}
                    onPress={() => {
                      navigation.navigate("Home");
                    }}
                  >
                    <Image
                      style={[CommonStyle.as_center, quizHomeStyles.blank]}
                      source={require("../../../../assets/images/Blank1.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text
                allowFontScaling={false}
                style={[
                  quizHomeStyles.dashboardtext,
                  CommonStyle.montserratSemiBold,
                  darkModeOn ? CommonStyle.c_DDD7D7 : CommonStyle.c_414254,
                ]}
              >
                Your Dashboard
              </Text>
              <View
                style={[
                  CommonStyle.flexDRow,
                  CommonStyle.w100,
                  CommonStyle.ai_center,
                  quizHomeStyles.dashboard,
                ]}
              >
                <TouchableOpacity
                  style={[
                    CommonStyle.ai_center,
                    CommonStyle.jc_center,
                    quizHomeStyles.dashboardBox,
                    darkModeOn
                      ? [CommonStyle.bg_292A3E, quizHomeStyles.darkdashboardBox]
                      : [CommonStyle.bg_FFFFFF, quizHomeStyles.lightdashboardBox],
                    Platform.OS === "android"
                      ? null
                      : quizHomeStyles.lightdashboardBoxIos,
                  ]}
                  onPress={() => {
                    navigation.navigate("HistoryScreen");
                  }}
                >
                  <View
                    style={[
                      quizHomeStyles.circle,
                      darkModeOn
                        ? CommonStyle.bg_3E405B
                        : quizHomeStyles.lightLogoBackground,
                    ]}
                  >
                    {darkModeOn ? (
                      <svgImports.HistoryDark
                        style={[CommonStyle.as_center, quizHomeStyles.iconimage]}
                      ></svgImports.HistoryDark>
                    ) : (
                      <Image
                        style={[CommonStyle.as_center, quizHomeStyles.iconimage]}
                        source={require("../../../../assets/images/history.png")}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.fs_10,
                      quizHomeStyles.dashboardText,
                      CommonStyle.montserratSemiBold,
                      darkModeOn ? CommonStyle.c_D7D5D5 : CommonStyle.c_666262,
                    ]}
                  >
                    View History
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    CommonStyle.ai_center,
                    CommonStyle.jc_center,
                    quizHomeStyles.dashboardBox,
                    darkModeOn
                      ? [CommonStyle.bg_292A3E, quizHomeStyles.darkdashboardBox]
                      : [CommonStyle.bg_FFFFFF, quizHomeStyles.lightdashboardBox],
                    Platform.OS === "android"
                      ? null
                      : quizHomeStyles.lightdashboardBoxIos,
                  ]}
                  onPress={() => {
                    navigation.navigate("Leaderboard");
                  }}
                >
                  <View
                    style={[
                      quizHomeStyles.circle,
                      darkModeOn
                        ? CommonStyle.bg_3E405B
                        : quizHomeStyles.lightLogoBackground,
                    ]}
                  >
                    {darkModeOn ? (
                      <svgImports.LeaderboardDark
                        style={[CommonStyle.as_center, quizHomeStyles.iconimage]}
                      ></svgImports.LeaderboardDark>
                    ) : (
                      <Image
                        style={[CommonStyle.as_center, quizHomeStyles.iconimage]}
                        source={require("../../../../assets/images/leaderboard.png")}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.fs_10,
                      quizHomeStyles.dashboardText,
                      CommonStyle.montserratSemiBold,
                      darkModeOn ? CommonStyle.c_D7D5D5 : CommonStyle.c_666262,
                    ]}
                  >
                    Leaderboard
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.fs_15,
                  quizHomeStyles.dashboardtext,
                  CommonStyle.montserratSemiBold,
                  darkModeOn ? CommonStyle.c_DDD7D7 : CommonStyle.c_414254,
                ]}
              >
                Quiz Categories
              </Text>
              {allQuizInfo === null ||
              allQuizInfo === undefined ||
              allQuizInfo.length === 0 ? (
                <View
                  style={[
                    CommonStyle.ai_center,
                    CommonStyle.jc_center,
                    quizHomeStyles.noquizview,
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.fs_15,
                      CommonStyle.montserrat,
                      darkModeOn
                        ? [CommonStyle.bg_171827, CommonStyle.c_D0D0D2]
                        : CommonStyle.c_666262,
                    ]}
                  >
                    No Quiz for you
                  </Text>
                </View>
              ) : (
                <></>
              )}
              <View style={[CommonStyle.w100, CommonStyle.ai_center]}>
                {allQuizInfo.map((quizInfo: typeof allQuizInfo, id: number) => {
                  return (
                    <CategoryCard
                      startQuizModal={startQuizModal}
                      data={quizInfo}
                      id={id}
                      key={id}
                    />
                  );
                })}
              </View>
              <View style={quizHomeStyles.footer}>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.fs_20,
                    quizHomeStyles.quizHomeText,
                    CommonStyle.montserratSemiBold,
                    quizHomeStyles.quizhomemaintext,
                    darkModeOn ? CommonStyle.c_D0D0D2 : CommonStyle.c_414254,
                  ]}
                >
                  Are you ready to get to the
                </Text>
                <View style={[CommonStyle.flexDRow, quizHomeStyles.secondBoxContainer]}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.fs_20,
                      quizHomeStyles.quizHomeText,
                      CommonStyle.montserratSemiBold,
                      darkModeOn ? CommonStyle.c_D0D0D2 : CommonStyle.c_414254,
                    ]}
                  >
                    top of the{" "}
                  </Text>

                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.fs_20,
                      CommonStyle.c_F3AE33,
                      CommonStyle.montserratSemiBold,
                    ]}
                    onPress={() => {
                      navigation.navigate("Leaderboard");
                    }}
                  >
                    leaderboards ?
                  </Text>
                </View>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.fs_15,
                    quizHomeStyles.quizhometext,
                    CommonStyle.montserrat,
                    darkModeOn
                      ? CommonStyle.c_F6F6F6
                      : quizHomeStyles.lightquizhometext,
                  ]}
                >
                  Answer questions in any order{"\n"}within the time limit.{" "}
                </Text>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.fs_15,
                    quizHomeStyles.quizhometext,
                    CommonStyle.montserrat,
                    darkModeOn
                      ? CommonStyle.c_F6F6F6
                      : quizHomeStyles.lightquizhometext,
                  ]}
                >
                  Collect points and climb the{"\n"}leaderboard !{" "}
                </Text>
                {darkModeOn ? (
                  <Image
                    style={[
                      CommonStyle.h100,
                      CommonStyle.w100,
                      CommonStyle.pAbsolute,
                      quizHomeStyles.quizhomedesign,
                    ]}
                    source={require("../../../../assets/images/quizHomeBgDark.png")}
                    resizeMode="contain"
                  />
                ) : (
                  <Image
                    style={[
                      CommonStyle.h100,
                      CommonStyle.w100,
                      CommonStyle.pAbsolute,
                      quizHomeStyles.quizhomedesign,
                    ]}
                    source={require("../../../../assets/images/homescreendesign.png")}
                    resizeMode="contain"
                  />
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <Modal visible={modalVis}>
        <ImageBackground
          source={require("../../../../assets/images/splash.png")}
          style={[CommonStyle.w100, CommonStyle.h100, CommonStyle.pAbsolute]}
        >
          <svgImports.QuizIconSplash
            style={[
              CommonStyle.pAbsolute,
              CommonStyle.jc_center,
              quizHomeStyles.splashtext,
            ]}
          />
        </ImageBackground>
      </Modal>
    );
  }
};



export default QuizHome;
