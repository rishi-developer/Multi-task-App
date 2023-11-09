import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import CheckBox from "expo-checkbox";
import CommonStyle from "../../../styles/Global";
import useColorScheme from "../../../hooks/useColorScheme";
const height = Dimensions.get("window").height;
import { guestUserTypeObj } from "../../../../types";
import { eventDropDownStyles } from "./EventDropDownStyles";

const EventDropDown = (props: any) => {
  const colorScheme = useColorScheme();
  return (
    <>
      {props.type == "guest" && (
        <View style={eventDropDownStyles.guestDropControl}>
          {props.data.map((event: guestUserTypeObj, index: number) => {
            return (
              <TouchableOpacity
                style={[
                  eventDropDownStyles.checkboxHolder,
                  CommonStyle.flexDRow,
                  CommonStyle.ai_center,
                ]}
                key={index}
                onPress={async () => {
                  props.onaddItem(event.user_name);
                }}
              >
                <CheckBox
                  value={event.checked}
                  color="#007AFF"
                  onValueChange={() => props.onaddItem(event.user_name)}
                />
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserratSemiBold,
                    CommonStyle.fs_13,
                    eventDropDownStyles.dropDownText,
                    colorScheme == "dark"
                      ? CommonStyle.c_D1D0D0
                      : CommonStyle.c_black,
                  ]}
                >
                  {event.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      {props.type === "drop" && (
        <View style={eventDropDownStyles.dropDownCntr}>
          {props.data.map((event: guestUserTypeObj, index: number) => {
            return (
              <TouchableOpacity
                style={[
                  !props.isMultiSelect && CommonStyle.jc_center,
                  eventDropDownStyles.contentHolder,
                  props.isMultiSelect && {
                    ...CommonStyle.ai_center,
                    ...CommonStyle.flexDRow,
                    ...eventDropDownStyles.checkboxHolder,
                  },
                ]}
                key={index}
                onPress={async () => {
                  props.isMultiSelect
                    ? props.onaddItem(event.id)
                    : props.onTouch(event, "eventType");
                }}
              >
                {props.isMultiSelect && (
                  <CheckBox
                    value={event.checked}
                    color="#007AFF"
                    onValueChange={() => props.onaddItem(event.id)}
                  />
                )}
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserratSemiBold,
                    CommonStyle.fs_13,
                    eventDropDownStyles.dropDownText,
                    colorScheme == "dark"
                      ? CommonStyle.c_D1D0D0
                      : CommonStyle.c_black,
                  ]}
                >
                  {props.isMultiSelect ? event.name : event}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </>
  );
};

export default EventDropDown;
