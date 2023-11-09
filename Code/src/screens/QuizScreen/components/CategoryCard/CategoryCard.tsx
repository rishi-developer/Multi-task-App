import {
  TouchableOpacity,
  View,
  Text,
  Image,
  Platform,
} from "react-native";
import { Dimensions } from "react-native";
import { categoryCardStyles } from "./CategoryCardStyles";
import useColorScheme from "../../../../hooks/useColorScheme";
import CommonStyle from "../../../../styles/Global";
import React from "react";

let CategoryCard = ({ startQuizModal, data, id }: any) => {
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const colorScheme = useColorScheme();
  return (
    <View
      style={[
        CommonStyle.flexDRow,
        CommonStyle.jc_spaceBTW,
        categoryCardStyles.boxContainer,
        colorScheme === "dark"
          ? [CommonStyle.bg_2B2C41, categoryCardStyles.darkBoxContainer]
          : [CommonStyle.bg_FFFFFF, categoryCardStyles.lightboxContainer],
        Platform.OS === "android"
          ? categoryCardStyles.lightboxContainerAndroid
          : categoryCardStyles.lightboxContainerIos,
      ]}
    >
      <View style={[CommonStyle.h100, CommonStyle.dflex, categoryCardStyles.logoIcon]}>
        <Image
          style={[
            CommonStyle.flex1,
            CommonStyle.h100,
            CommonStyle.w100,
            categoryCardStyles.data,
          ]}
          source={
            data.Topic.split(" ")[0].toLowerCase() == "car"
              ? require("../../../../../assets/images/car.png")
              : require("../../../../../assets/images/sports.png")
          }
        />
      </View>
      <View
        style={[
          CommonStyle.dflex,
          CommonStyle.as_center,
          CommonStyle.ai_Fstart,
          categoryCardStyles.catTextContainer,
        ]}
      >
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserratBold,
            CommonStyle.fs_15,
            colorScheme === "dark"
              ? CommonStyle.c_D1D0D0
              : CommonStyle.c_666262,
          ]}
        >
          {data.Topic}
        </Text>
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserratSemiBold,
            CommonStyle.fs_10,
            categoryCardStyles.time,
            colorScheme === "dark"
              ? CommonStyle.c_B9B3B3
              : CommonStyle.c_5F656C,
          ]}
        >
          Duration
          <Text
            allowFontScaling={false}
            style={[
              CommonStyle.montserratSemiBold,
              categoryCardStyles.timeanddate,
              colorScheme === "dark"
                ? CommonStyle.c_B9B3B3
                : CommonStyle.c_5F656C,
            ]}
          >
            {" "}
            : {data.Time} minutes
          </Text>
        </Text>
        <Text
          allowFontScaling={false}
          style={[
            CommonStyle.montserratSemiBold,
            CommonStyle.fs_10,
            categoryCardStyles.time,
            colorScheme === "dark"
              ? CommonStyle.c_B9B3B3
              : CommonStyle.c_5F656C,
          ]}
        >
          From
          <Text
            allowFontScaling={false}
            style={[
              CommonStyle.montserratSemiBold,
              categoryCardStyles.timeanddate,
              colorScheme === "dark"
                ? CommonStyle.c_B9B3B3
                : CommonStyle.c_5F656C,
            ]}
          >
            {" "}
            : {data.TimePeriod.start.split("-")[0]}{" "}
            {month[data.TimePeriod.start.split("-")[1] - 1]}{" "}
            {data.TimePeriod.start.split("-")[2].substring(2, 4)} -{" "}
            {data.TimePeriod.end.split("-")[0]}{" "}
            {month[data.TimePeriod.end.split("-")[1] - 1]}{" "}
            {data.TimePeriod.end.split("-")[2].substring(2, 4)}
          </Text>
        </Text>
        <TouchableOpacity
          style={[
            CommonStyle.jc_center,
            CommonStyle.ai_center,
            CommonStyle.flexDRow,
            CommonStyle.bg_9187E6,
            categoryCardStyles.startQuizBtn,
          ]}
          onPress={() => {
            startQuizModal(true, data.id);
          }}
        >
          <Image
            source={require("../../../../../assets/images/polygon.png")}
            style={categoryCardStyles.polygon}
          ></Image>
          <Text
            allowFontScaling={false}
            style={[
              CommonStyle.montserratSemiBold,
              CommonStyle.c_FFFFFF,
              CommonStyle.fs_13,
            ]}
          >
            Start Quiz
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryCard;
