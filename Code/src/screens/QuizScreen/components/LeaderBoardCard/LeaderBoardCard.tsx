import {
  Image,
  View,
  Text,
  Platform,
} from "react-native";
import { leaderBoardCardStyles } from "./LeaderBoardCardStyles";
import { svgImports } from "../../../../data/Imports";
import useColorScheme from "../../../../hooks/useColorScheme";
import CommonStyle from "../../../../styles/Global";
import React from "react";
let LeaderBoardCard = ({ userData, rank, image }: any) => {
  let smallName = (name: string) => {
    let nameArray = name.split(" ");
    return nameArray[0] + " " + nameArray[1];
  };
  let colorScheme = useColorScheme();
  return (
    <>
      {userData.total_points != 0 && (
        <View
          style={[
            CommonStyle.flexDRow,
            CommonStyle.as_center,
            leaderBoardCardStyles.scoreCard,
            Platform.OS == "android" ? null : leaderBoardCardStyles.iosShadow,
            colorScheme === "dark"
              ? CommonStyle.bg_2E343C
              : [CommonStyle.bg_FFFFFF, leaderBoardCardStyles.lightscoreCard],
          ]}
        >
          {rank > 2 ? (
            <View
              style={[
                CommonStyle.pAbsolute,
                CommonStyle.as_center,
                CommonStyle.jc_center,
                CommonStyle.bg_F8C67C,
                leaderBoardCardStyles.rank,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratSemiBold,
                  CommonStyle.c_FFFFFF,
                  CommonStyle.as_center,
                  CommonStyle.fs_15,
                ]}
              >
                {rank + 1}
              </Text>
            </View>
          ) : rank == 0 ? (
            <svgImports.GoldMedal
              style={[CommonStyle.pAbsolute, leaderBoardCardStyles.rankImage]}
              size={23}
            />
          ) : rank == 1 ? (
            <svgImports.BlueMedal
              style={[CommonStyle.pAbsolute, leaderBoardCardStyles.rankImage]}
              size={23}
            />
          ) : (
            <svgImports.BronzeMedal
              style={[CommonStyle.pAbsolute, leaderBoardCardStyles.rankImage]}
              size={23}
            />
          )}

          <Image
            source={{
              uri: userData.photo_url,
            }}
            style={[CommonStyle.as_center, leaderBoardCardStyles.userImage]}
            resizeMode="cover"
          />
          <View
            style={[
              CommonStyle.as_center,
              CommonStyle.dflex,
              CommonStyle.jc_center,
              leaderBoardCardStyles.nameContainer,
            ]}
          >
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratBold,
                leaderBoardCardStyles.userName,
                colorScheme === "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_666262,
              ]}
            >
              {userData.name.length <= 27
                ? userData.name
                : smallName(userData.name)}{" "}
              {"\n"}
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserrat,
                  leaderBoardCardStyles.userDepartmant,
                  colorScheme === "dark"
                    ? CommonStyle.c_D1D0D0
                    : CommonStyle.c_5F656C,
                ]}
              >
                {userData.department}
              </Text>
            </Text>
          </View>
          <View
            style={[
              CommonStyle.flexDRow,
              CommonStyle.pAbsolute,
              CommonStyle.jc_center,
              CommonStyle.ai_center,
              CommonStyle.bg_FFF8DB,
              leaderBoardCardStyles.scoreContainer,
            ]}
          >
            <svgImports.Diamond style={leaderBoardCardStyles.diamond} />
            <Text
              allowFontScaling={false}
              style={[
                CommonStyle.montserratSemiBold,
                CommonStyle.c_E5A13B,
                CommonStyle.fs_15,
                leaderBoardCardStyles.points,
              ]}
            >
              {userData.total_points} pts
            </Text>
          </View>
        </View>
      )}
    </>
  );
};



export default LeaderBoardCard;
