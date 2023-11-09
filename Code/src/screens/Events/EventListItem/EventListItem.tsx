import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import CommonStyle from "../../../styles/Global";
import { svgImports } from "../../../data/Imports";
import useColorScheme from "../../../hooks/useColorScheme";
import { eventListItemStyles } from "./EventListItemStyles";

const EventListItem = ({ navigation, eventId, eventData }: any) => {
  const [isParticipated, setIsParticipated] = useState(false);
  const [validEvent, setValidEvent] = useState(false);
  const colorScheme = useColorScheme();
  useEffect(() => {
    eventValid();
  });
  const eventValid = () => {
    const date = Date.now();
    let endData = getEventDates();
    let startData = getEventStartDates();
    if (endData[0] > date) {
      setValidEvent(true);
    }
    if (startData[0] < date && date < endData[0]) {
      setIsParticipated(true);
    }
  };
  function getEventStartDates() {
    let eventStartDate: Date = new Date(
      eventData.start_date.split("/").join("-")
    );
    eventStartDate.setHours(
      eventData.start_time.split(":")[0],
      eventData.start_time.split(":")[1]
    );
    let StartDate = Date.parse(eventStartDate.toString());
    return [StartDate];
  }
  function getEventDates() {
    let eventEndDate: Date = new Date(eventData.end_date.split("/").join("-"));
    eventEndDate.setHours(
      eventData.end_time.split(":")[0],
      eventData.end_time.split(":")[1]
    );
    let EndDate = Date.parse(eventEndDate.toString());
    return [EndDate];
  }
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("EventDetails", { eventId: eventId });
        }}
        style={[
          eventListItemStyles.container,
          CommonStyle.flexDRow,
          CommonStyle.w100,
          colorScheme == "dark"
            ? [CommonStyle.bg_2E343C, eventListItemStyles.darkBorder]
            : [CommonStyle.bg_FFFFFF, eventListItemStyles.lightBorder],
        ]}
      >
        <View style={[CommonStyle.jc_center, eventListItemStyles.CardTextCntr]}>
          <View
            style={[
              eventListItemStyles.cardTimeCntr,
              CommonStyle.jc_flexStart,
              CommonStyle.as_center,
            ]}
          >
            <View
              style={[
                CommonStyle.flexDRow,
                CommonStyle.ai_center,
                CommonStyle.jc_flexStart,
              ]}
            >
              <svgImports.EventSymbol
                size={24}
                color={colorScheme == "dark" ? "#D1D0D0" : "#636A74"}
              ></svgImports.EventSymbol>
              <Text
                allowFontScaling={false}
                style={[
                  eventListItemStyles.venueText,
                  CommonStyle.c_636A74,
                  colorScheme == "dark"
                    ? CommonStyle.c_D1D0D0
                    : CommonStyle.c_636A74,
                ]}
              >
                {eventData.start_date == eventData.end_date ? (
                  <>
                    <Text allowFontScaling={false}>
                      {eventData.start_date.slice(4, 6)}{" "}
                      {eventData.start_date.slice(0, 3)},{" "}
                    </Text>
                    {parseInt(eventData.start_time.slice(0, 2)) > 12 ? (
                      <Text>
                        {parseInt(eventData.start_time.slice(0, 2)) - 12}:
                        {eventData.start_time.slice(3)} pm -{" "}
                      </Text>
                    ) : parseInt(eventData.start_time.slice(0, 2)) == 12 ? (
                      <Text>
                        {parseInt(eventData.start_time.slice(0, 2))}:
                        {eventData.start_time.slice(3)} pm -{" "}
                      </Text>
                    ) : (
                      <Text>
                        {parseInt(eventData.start_time.slice(0, 2))}:
                        {eventData.start_time.slice(3)} am -{" "}
                      </Text>
                    )}

                    <Text allowFontScaling={false}>
                      {eventData.start_date.slice(4, 6)}{" "}
                      {eventData.start_date.slice(0, 3)},{" "}
                    </Text>
                    {parseInt(eventData.end_time.slice(0, 2)) > 12 ? (
                      <Text>
                        {parseInt(eventData.end_time.slice(0, 2)) - 12}:
                        {eventData.end_time.slice(3)} pm
                      </Text>
                    ) : parseInt(eventData.end_time.slice(0, 2)) == 12 ? (
                      <Text>
                        {parseInt(eventData.end_time.slice(0, 2))}:
                        {eventData.end_time.slice(3)} pm
                      </Text>
                    ) : (
                      <Text>
                        {parseInt(eventData.end_time.slice(0, 2))}:
                        {eventData.end_time.slice(3)} am
                      </Text>
                    )}
                  </>
                ) : (
                  <>
                    {eventData.start_date.slice(0, 3) ==
                    eventData.end_date.slice(0, 3) ? (
                      <>
                        <Text allowFontScaling={false}>
                          {eventData.start_date.slice(4, 6)}{" "}
                          {eventData.start_date.slice(0, 3)},{" "}
                        </Text>
                        {parseInt(eventData.start_time.slice(0, 2)) > 12 ? (
                          <Text>
                            {parseInt(eventData.start_time.slice(0, 2)) - 12}:
                            {eventData.start_time.slice(3)} pm -{" "}
                          </Text>
                        ) : parseInt(eventData.start_time.slice(0, 2)) == 12 ? (
                          <Text>
                            {parseInt(eventData.start_time.slice(0, 2))}:
                            {eventData.start_time.slice(3)} pm -{" "}
                          </Text>
                        ) : (
                          <Text>
                            {parseInt(eventData.start_time.slice(0, 2))}:
                            {eventData.start_time.slice(3)} am -{" "}
                          </Text>
                        )}

                        <Text>
                          {eventData.end_date.slice(4, 6)}{" "}
                          {eventData.start_date.slice(0, 3)},{" "}
                        </Text>
                        {parseInt(eventData.end_time.slice(0, 2)) > 12 ? (
                          <Text>
                            {parseInt(eventData.end_time.slice(0, 2)) - 12}:
                            {eventData.end_time.slice(3)} pm
                          </Text>
                        ) : parseInt(eventData.end_time.slice(0, 2)) == 12 ? (
                          <Text>
                            {parseInt(eventData.end_time.slice(0, 2))}:
                            {eventData.end_time.slice(3)} pm
                          </Text>
                        ) : (
                          <Text>
                            {parseInt(eventData.end_time.slice(0, 2))}:
                            {eventData.end_time.slice(3)} am
                          </Text>
                        )}
                      </>
                    ) : (
                      <>
                        <Text allowFontScaling={false}>
                          {eventData.start_date.slice(4, 6)}{" "}
                          {eventData.start_date.slice(0, 3)},{" "}
                        </Text>
                        {parseInt(eventData.start_time.slice(0, 2)) > 12 ? (
                          <Text>
                            {parseInt(eventData.start_time.slice(0, 2)) - 12}:
                            {eventData.start_time.slice(3)} pm -{" "}
                          </Text>
                        ) : parseInt(eventData.start_time.slice(0, 2)) == 12 ? (
                          <Text>
                            {parseInt(eventData.start_time.slice(0, 2))}:
                            {eventData.start_time.slice(3)} pm -{" "}
                          </Text>
                        ) : (
                          <Text>
                            {parseInt(eventData.start_time.slice(0, 2))}:
                            {eventData.start_time.slice(3)} am -{" "}
                          </Text>
                        )}
                        <Text>
                          {eventData.end_date.slice(4, 6)}{" "}
                          {eventData.end_date.slice(0, 3)},{" "}
                        </Text>
                        {parseInt(eventData.end_time.slice(0, 2)) > 12 ? (
                          <Text>
                            {parseInt(eventData.end_time.slice(0, 2)) - 12}:
                            {eventData.end_time.slice(3)} pm
                          </Text>
                        ) : parseInt(eventData.end_time.slice(0, 2)) == 12 ? (
                          <Text>
                            {parseInt(eventData.end_time.slice(0, 2))}:
                            {eventData.end_time.slice(3)} pm
                          </Text>
                        ) : (
                          <Text>
                            {parseInt(eventData.end_time.slice(0, 2))}:
                            {eventData.end_time.slice(3)} am
                          </Text>
                        )}
                      </>
                    )}
                  </>
                )}
              </Text>
            </View>
            <Text
              allowFontScaling={false}
              style={[
                eventListItemStyles.eventName,
                CommonStyle.c_09101D,
                colorScheme == "dark" && CommonStyle.c_D1D0D0,
              ]}
            >
              {eventData.name.length < 25
                ? eventData.name
                : eventData.name.substring(0, 25) + "..."}
            </Text>
            <View
              style={[
                CommonStyle.flexDRow,
                CommonStyle.ai_center,
                CommonStyle.jc_flexStart,
              ]}
            >
              <svgImports.Location
                size={22}
                color={colorScheme == "dark" ? "#D1D0D0" : "#636A74"}
              />
              <Text
                allowFontScaling={false}
                style={[
                  eventListItemStyles.venueText,
                  CommonStyle.c_636A74,
                  colorScheme == "dark"
                    ? CommonStyle.c_D1D0D0
                    : CommonStyle.c_636A74,
                ]}
              >
                {eventData.venue.length < 25
                  ? eventData.venue
                  : eventData.venue.substring(0, 25) + "..."}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            eventListItemStyles.imageCntr,
            colorScheme === "dark" && eventListItemStyles.imgOpacity,
          ]}
        >
          <svgImports.EventImage
            style={[CommonStyle.w100, CommonStyle.h100, eventListItemStyles.eventImg]}
          />
          {validEvent == false && (
            <View
              style={[
                CommonStyle.pAbsolute,
                CommonStyle.as_Fend,
                CommonStyle.jc_center,
                eventListItemStyles.attendingEventStatusCntr,
                eventListItemStyles.valid,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.c_FFFFFF,
                  CommonStyle.fs_10,
                  CommonStyle.as_center,
                  CommonStyle.montserrat,
                ]}
              >
                Expired
              </Text>
            </View>
          )}
          {isParticipated && validEvent && (
            <View
              style={[
                CommonStyle.pAbsolute,
                CommonStyle.as_Fend,
                CommonStyle.jc_center,
                eventListItemStyles.attendingEventStatusCntr,
                eventListItemStyles.attending,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.c_FFFFFF,
                  CommonStyle.fs_10,
                  CommonStyle.as_center,
                  CommonStyle.montserrat,
                ]}
              >
                OnGoing
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};


export default EventListItem;
