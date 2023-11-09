import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Badge } from "react-native-elements";
import CommonStyle from "../../../styles/Global";
import useColorScheme from "../../../hooks/useColorScheme";
import { badgesStyles } from "./BadgesStyles";

const Badges = (props: any) => {
  const colorScheme = useColorScheme();
  return (
    <View style={badgesStyles.badgeHolder}>
      {props.data.map((gemAdmin: string) => {
        return (
          <TouchableOpacity onPress={() => props.onTouch(gemAdmin, true)}>
            <View
              style={[
                badgesStyles.badgeContainer,
                CommonStyle.flexDRow,
                CommonStyle.ai_center,
              ]}
            >
              <Text
                style={[
                  CommonStyle.montserratSemiBold,
                  CommonStyle.c_000000,
                  badgesStyles.badgeName,
                  colorScheme === "dark" && CommonStyle.c_FFFFFF,
                ]}
              >
                {gemAdmin}
              </Text>
              <TouchableOpacity
                style={[
                  badgesStyles.cancelIcon,
                  CommonStyle.ai_center,
                  CommonStyle.jc_center,
                  CommonStyle.pAbsolute,
                ]}
                onPress={() => {
                  props.onTouch(gemAdmin, false);
                }}
              >
                <Badge
                  status="error"
                  value="X"
                  style={badgesStyles.badge}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Badges;
