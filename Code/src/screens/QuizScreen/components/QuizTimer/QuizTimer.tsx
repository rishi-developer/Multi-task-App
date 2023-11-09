import React from "react";
import { Text } from "react-native";
import { quizTimerStyles } from "./QuizTimerStyles";
import CommonStyle from "../../../../styles/Global";

let QuizTimer = ({ currentTime }: any) => {
  let getTime = () => {
    // fetching minutes and seconds
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    // formatiing minutes and minutes
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <Text
      style={[
        quizTimerStyles.usercontainer,
        CommonStyle.c_FFFFFF,
        CommonStyle.fs_20,
        CommonStyle.as_center,
      ]}
    >
      {getTime()}
    </Text>
  );
};



export default QuizTimer;
