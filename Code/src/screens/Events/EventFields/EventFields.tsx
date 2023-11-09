import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import CommonStyle from "../../../styles/Global";
import useColorScheme from "../../../hooks/useColorScheme";
import { eventFieldsStyles } from "./EventFieldsStyles";

const EventFields = (props: any) => {
  const colorScheme = useColorScheme();
  return (
    <>
      <Text
        allowFontScaling={false}
        style={[
          CommonStyle.montserratBold,
          eventFieldsStyles.content,
          colorScheme == "dark" ? CommonStyle.c_F3F3F3 : CommonStyle.c_black,
        ]}
      >
        {props.title}{" "}
        {props.required && (
          <Text allowFontScaling={false} style={eventFieldsStyles.required}>
            *
          </Text>
        )}
      </Text>
      {props.type === "text" && (
        <ScrollView
          contentContainerStyle={[{ paddingBottom: props.isMulti ? "5%" : 0 }]}
        >
          <TextInput
            allowFontScaling={false}
            placeholder={"Enter " + props.title + " Here"}
            multiline={props.isMulti}
            onChangeText={(text) => {
              props.change(text, props.pointer);
            }}
            value={props.value}
            style={[
              CommonStyle.montserrat,
              CommonStyle.fs_14,
              props.isMulti ? eventFieldsStyles.onDescChange : eventFieldsStyles.textInputStyling,
              props.errPoint && eventFieldsStyles.errBox,
              ,
            ]}
          />
        </ScrollView>
      )}
      {props.type === "drop" && (
        <View>
          <TouchableOpacity
            onPress={() => {
              props.onDrop(props.pointer);
              Keyboard.dismiss;
            }}
          >
            <TextInput
              allowFontScaling={false}
              placeholder=""
              caretHidden={true}
              value={props.value}
              editable={false}
              selectTextOnFocus={false}
              style={[
                CommonStyle.montserrat,
                CommonStyle.fs_14,
                eventFieldsStyles.textInputStyling,
                props.errPoint && eventFieldsStyles.errBox,
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              eventFieldsStyles.dropIconContainer,
              CommonStyle.pAbsolute,
              CommonStyle.dflex,
              colorScheme == "dark"
                ? eventFieldsStyles.darkThemeBackground
                : eventFieldsStyles.dropIconContainerLight,
            ]}
            onPress={() => {
              props.onDrop(props.pointer);
            }}
            activeOpacity={0.9}
          >
            <AntDesign name="caretdown"></AntDesign>
          </TouchableOpacity>
        </View>
      )}
      {props.type == "date" && (
        <View style={eventFieldsStyles.dateStyle}>
          <TextInput
            allowFontScaling={false}
            placeholder=""
            onFocus={() => {
              props.selectEventDate("startDate");
            }}
            value={`${props.startDate} ${props.startTime}`}
            style={[
              CommonStyle.montserrat,
              CommonStyle.fs_14,
              eventFieldsStyles.textInputStyling,
              { width: "47%" },
              props.errStart && eventFieldsStyles.errBox,
            ]}
          />
          <TouchableOpacity
            style={[eventFieldsStyles.calendarPos, CommonStyle.pRelative]}
            onPress={() => {
              props.selectEventDate("startDate");
              props.changeCalen("startDate");
            }}
          >
            <AntDesign name="calendar"></AntDesign>
          </TouchableOpacity>
          <TextInput
            allowFontScaling={false}
            placeholder=""
            onFocus={() => {
              props.selectEventDate("endDate");
            }}
            value={`${props.endDate} ${props.endTime}`}
            style={[
              CommonStyle.montserrat,
              CommonStyle.fs_14,
              eventFieldsStyles.textInputStyling,
              { width: "47%" },
              (props.errEnd || props.errTime) && eventFieldsStyles.errBox,
            ]}
          />
          <TouchableOpacity
            style={[eventFieldsStyles.calendarPos, CommonStyle.pRelative]}
            onPress={() => {
              props.selectEventDate("endDate");
              props.changeCalen("endDate");
            }}
          >
            <AntDesign name="calendar"></AntDesign>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={props.showDatePicker}
            mode="date"
            onConfirm={props.onConfirmDate}
            minimumDate={
              props.dateTime == "startDate" ? new Date() : props.minEndDate
            }
            onCancel={() => props.onCancel("date")}
          />
          <DateTimePickerModal
            isVisible={props.showTimePicker}
            mode="time"
            onConfirm={props.onConfirmTime}
            onCancel={() => props.onCancel("time")}
          />
        </View>
      )}

      {props.type === "adminText" && (
        <View>
          <TextInput
            allowFontScaling={false}
            placeholder="Enter Full Email Of User"
            value={props.textVal}
            onChangeText={(text) => props.changeVal(text)}
            style={[
              CommonStyle.montserrat,
              CommonStyle.fs_14,
              eventFieldsStyles.textInputStyling,
            ]}
          />
          <TouchableOpacity
            style={[
              CommonStyle.pAbsolute,
              CommonStyle.bg_007AFF,
              eventFieldsStyles.fieldButton,
            ]}
            onPress={() => {
              props.addChange(props.textVal);
            }}
          >
            <AntDesign name="check" color="white" />
          </TouchableOpacity>
          {props.adminErr && (
            <Text
              allowFontScaling={false}
              style={[CommonStyle.montserrat, eventFieldsStyles.errText]}
            >
              {props.existErr
                ? "Email ID already exist"
                : "This field is required"}
            </Text>
          )}
        </View>
      )}
    </>
  );
};

export default EventFields;

