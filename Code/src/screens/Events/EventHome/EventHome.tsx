import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  BackHandler,
  Platform,
  ActivityIndicator,
  RefreshControl,
  Keyboard,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import CommonStyle from "../../../styles/Global";
import EventForm from "../EventForm/EventForm";
import EventListItem from "../EventListItem/EventListItem";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import GuestApiService from "../../../services/api/GuestApi/guestApiServices";
import useColorScheme from "../../../hooks/useColorScheme";
import useDebounce from "../../../shared/debounce";
import SearchBar from "../../../shared/SearchBar";
import { svgImports } from "../../../data/Imports";
const { height } = Dimensions.get("screen");
import Header from "../../../shared/Header";
import { EventDataObject } from "../../../../types";
import adminData from "../../../data/AdminData";
import {
  eventHomeFilterBar,
  eventHomeNavBar,
  eventHomeStyles,
} from "./EventHomeStyles";

export default function EventHome({ navigation, route }: any) {
  let GuestService = new GuestApiService();
  const [showForm, setShowForm] = useState(false);
  const [iSGuestUser, setIsGuestUser] = useState(false);
  const [guestId, setGuestId] = useState("");
  const [filterData, setFilterData] = useState<EventDataObject[]>([]);
  const [searchQuery, setSearchQurey] = useState("");
  const [activeTab, setActiveTab] = useState("Event");
  const [filterDate, setFilterDate] = useState("");
  const tabs = ["Event", "Attendance", "Lunch"];
  const filter = ["Today", "Tomorrow", "This week"];
  const [emailId, setEmail] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  let emptyDataArray = ["No Data Found/Pull to refresh...."];
  let [transparentLoader, setTransparentLoader] = useState(false);
  let {
    updateUserEvents,
    fetchUserEventsList,
    fetchGuestEvent,
    userDetails,
    eventsList,
    backupList,
    socketAdd,
    setSocketAdd,
    eventError,
    isDummyUser,
    setGuestLoading,
  } = useContext(NeoContext);
  const [updateEvent, setUpdateEvent] = useState(0);
  const colorScheme = useColorScheme();

  const [keyboardStatus, setKeyboardStatus] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  useEffect(() => {
    if (socketAdd) {
      if (!iSGuestUser) {
        fetchUserEventsList();
        setSocketAdd(false);
      }
    }
  }, [socketAdd]);

  useEffect(() => {
    const backbuttonHander = () => {
      if (iSGuestUser) {
        navigation.navigate("Events");
        return true;
      } else {
        navigation.navigate("Home");
        return true;
      }
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setUpdateEvent(updateEvent + 1);
    });
  }, [navigation]);

  useEffect(() => {
    if (emailId !== undefined) {
      if (emailId.length > 0 && !iSGuestUser) {
        fetchUserEventsList();
      }
    }
  }, [iSGuestUser, emailId]);
  useEffect(() => {
    if (debouncedSearchTerm) {
      SearchEvents();
    } else {
      setFilterData([]);
    }
  }, [debouncedSearchTerm]);
  const SearchEvents = () => {
    let filteredEvent = eventsList.filter((event: EventDataObject) => {
      if (
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        event.event_type == activeTab
      ) {
        return event;
      }
    });
    setFilterData(filteredEvent);
  };
  useEffect(() => {
    if (filterDate === "none") updateUserEvents(backupList);
    else if (filterDate == "Today") filterForToday();
    else if (filterDate == "Tomorrow") filterForTomorrow();
    else if (filterDate == "This week") filterForWeek();
  }, [filterDate]);

  let onRefreshFunction = async () => {
    setTransparentLoader(true);
    await fetchUserEventsList();
    setTransparentLoader(false);
  };

  let filterForToday = () => {
    let newList: EventDataObject[] = [];
    let [todatStartTime, todayEndTime] = getTodayDates();
    backupList.map((todayEvent: EventDataObject) => {
      let [StartDate, EndDate] = getEventDates(todayEvent);
      let result: boolean = chkActiveEvent(
        StartDate,
        EndDate,
        todatStartTime,
        todayEndTime
      );
      if (result) newList.push(todayEvent);
    });
    updateUserEvents(newList);
  };

  let filterForTomorrow = () => {
    let newList: EventDataObject[] = [];
    let [todatStartTime, todayEndTime] = getTomorrowDates();
    backupList.map((tomorrowEvent: EventDataObject) => {
      let [StartDate, EndDate] = getEventDates(tomorrowEvent);
      let result: boolean = chkActiveEvent(
        StartDate,
        EndDate,
        todatStartTime,
        todayEndTime
      );
      if (result) newList.push(tomorrowEvent);
    });
    updateUserEvents(newList);
  };
  let filterForWeek = () => {
    let newList: EventDataObject[] = [];
    let [start, end] = getWeekDates();
    backupList.map((weeksEvent: EventDataObject) => {
      let [StartDate, EndDate] = getEventDates(weeksEvent);
      let result: boolean = chkActiveEvent(StartDate, EndDate, start, end);
      if (result) newList.push(weeksEvent);
    });
    updateUserEvents(newList);
  };

  const eventTypeLength = () => {
    let arr = eventsList.filter((event: EventDataObject) => {
      return event.event_type == activeTab;
    });
    return arr.length > 0 ? true : false;
  };

  function getEventDates(dates: EventDataObject) {
    let eventStartDate = new Date(dates.start_date.split("/").join("-"));
    eventStartDate.setHours(
      parseInt(dates.start_time.split(":")[0]),
      parseInt(dates.start_time.split(":")[1])
    );
    let StartDate = Date.parse(eventStartDate.toString());
    let eventEndDate = new Date(dates.end_date.split("/").join("-"));
    eventEndDate.setHours(
      parseInt(dates.end_time.split(":")[0]),
      parseInt(dates.end_time.split(":")[1])
    );

    let EndDate = Date.parse(eventEndDate.toString());
    return [StartDate, EndDate];
  }

  function getTodayDates() {
    const now = Date.now();
    const todatStartTime = new Date(now).setHours(0, 0, 0, 0);
    const todayEndTime = new Date(now).setHours(23, 59, 59, 999);
    return [todatStartTime, todayEndTime];
  }

  function getTomorrowDates() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const todatStartTime = tomorrow.getTime();
    const todayEndTime = todatStartTime + 24 * 60 * 60 * 1000 - 1;
    return [todatStartTime, todayEndTime];
  }

  function getWeekDates() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const start = new Date(today);
    start.setDate(today.getDate() - dayOfWeek);
    start.setHours(0, 0, 0, 0);
    const end = new Date(today);
    end.setDate(today.getDate() + (7 - dayOfWeek));
    end.setHours(23, 59, 59, 999);
    return [start.getTime(), end.getTime()];
  }

  let chkActiveEvent = (
    eventStartTime: number,
    eventEndTime: number,
    timeRangeStart: number,
    timeRangeEnd: number
  ) => {
    return eventStartTime < timeRangeEnd && eventEndTime > timeRangeStart;
  };

  const getData = async () => {
    try {
      if (Object.keys(userDetails).length !== 0) {
        setEmail(userDetails.email);
      } else {
        const data = await SecureStore.getItemAsync("GuestUser");
        if (data) {
          const res = JSON.parse(data);
          setGuestLoading(false);
          await fetchGuestEvent(res.emailId);
          setGuestId(res.emailId);
          setIsGuestUser(res.isGuestUser);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  const logout = async () => {
    await SecureStore.deleteItemAsync("isGuestUser");
    await SecureStore.deleteItemAsync("GuestUser");
    await SecureStore.deleteItemAsync("access_token");
    GuestService.updateGuestUser(guestId, "").catch((err) =>
      console.log(err.message)
    );
    navigation.navigate("Login");
  };
  const onClear = () => {
    setSearchQurey("");
    setFilterData([]);
  };
  const handleChangeText = (text: string) => {
    setSearchQurey(text);
    if (!text.trim()) {
      setSearchQurey("");
    }
  };
  const closeForm = () => {
    setShowForm(false);
    onClear();
  };
  const checkUserAutorize = () => {
    if (Object.keys(userDetails).length !== 0) {
      let data = adminData.filter((e) => {
        return e === userDetails.email.toLowerCase();
      });
      return data.length > 0 ? true : false;
    }
  };
  return (
    <View
      style={[
        eventHomeStyles.eventContainer,
        colorScheme == "dark" ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
      ]}
    >
      <View
        style={[
          CommonStyle.w100,
          CommonStyle.h100,
          colorScheme == "dark" ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
        ]}
      >
        <Header title="Gemini Events" type="Event" />
        <View
          style={[
            eventHomeStyles.navigator,
            CommonStyle.flexDRow,
            CommonStyle.ai_center,
          ]}
        >
          {tabs.map((tab: string) => (
            <TouchableOpacity
              key={tab}
              style={[
                eventHomeStyles.navigationItem,
                CommonStyle.ai_center,
                colorScheme == "dark"
                  ? eventHomeNavBar(tab, activeTab).darkBorder
                  : eventHomeNavBar(tab, activeTab).lightBorder,
              ]}
              onPress={() => {
                setSearchQurey("");
                setActiveTab(tab);
              }}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratSemiBold,
                  eventHomeStyles.navigText,
                  colorScheme == "dark"
                    ? eventHomeNavBar(tab, activeTab).darkText
                    : eventHomeNavBar(tab, activeTab).lightText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View
          style={[
            eventHomeStyles.body,
            CommonStyle.as_center,
            CommonStyle.jc_center,
          ]}
        >
          <View style={[eventHomeStyles.searchBarCntr, CommonStyle.w100]}>
            <SearchBar
              value={searchQuery}
              onChangeText={handleChangeText}
              placeholder="Search for events"
              openInputModal={null}
              onClear={onClear}
              typeOf={"event"}
            />
          </View>
          <View
            style={[
              eventHomeStyles.filterEventCntr,
              CommonStyle.flexDRow,
              CommonStyle.jc_spaceBTW,
              CommonStyle.w100,
            ]}
          >
            {filter.map((filterItem) => (
              <TouchableOpacity
                key={filterItem}
                onPress={() => {
                  if (filterDate === filterItem) {
                    setFilterDate("none");
                  } else {
                    setFilterDate(filterItem);
                  }
                }}
                style={[
                  eventHomeStyles.filterEventItem,
                  CommonStyle.ai_center,
                  CommonStyle.jc_spaceAround,
                  colorScheme == "dark"
                    ? CommonStyle.bg_414B57
                    : CommonStyle.bg_FFFFFF,
                  filterItem == filterDate
                    ? { ...CommonStyle.bg_007AFF, ...CommonStyle.c_FFFFFF }
                    : null,
                ]}
              >
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyle.montserratSemiBold,
                    CommonStyle.fs_13,
                    CommonStyle.as_center,
                    colorScheme == "dark"
                      ? eventHomeFilterBar(filterItem, filterDate).darkText
                      : eventHomeFilterBar(filterItem, filterDate).lightText,
                  ]}
                >
                  {filterItem}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {transparentLoader && Platform.OS == "android" && (
            <ActivityIndicator color={"#666592"} size={"large"} />
          )}

          {searchQuery.length > 0 ? (
            <>
              {filterData.length > 0 ? (
                <>
                  <FlatList
                    data={filterData}
                    refreshing={
                      Platform.OS == "ios" ? transparentLoader : false
                    }
                    progressViewOffset={height * 2}
                    refreshControl={
                      <RefreshControl
                        refreshing={
                          Platform.OS == "ios" ? transparentLoader : false
                        }
                        progressViewOffset={height * 2}
                        onRefresh={() => {
                          onRefreshFunction();
                        }}
                      />
                    }
                    contentContainerStyle={eventHomeStyles.flatListContainer}
                    renderItem={({ item }) => {
                      let id = item.id;
                      let { attendees_list, event_type }: EventDataObject =
                        item;
                      if (event_type == activeTab) {
                        return (
                          <>
                            <TouchableWithoutFeedback
                              key={id}
                              onPress={() => {}}
                            >
                              <EventListItem
                                eventId={id}
                                navigation={navigation}
                                emailId={emailId}
                                eventData={item}
                                users={attendees_list}
                              />
                            </TouchableWithoutFeedback>
                          </>
                        );
                      } else {
                        return null;
                      }
                    }}
                  />
                </>
              ) : (
                <>
                  <Text
                    style={[
                      CommonStyle.montserrat,
                      eventHomeStyles.genericMsg,
                      colorScheme == "dark"
                        ? eventHomeStyles.darkText
                        : eventHomeStyles.lightText,
                    ]}
                  >
                    No Event Found
                  </Text>
                </>
              )}
            </>
          ) : (
            <>
              {eventsList.length >= 1 && eventTypeLength() ? (
                <FlatList
                  data={eventsList} //secnd use State eventData
                  refreshing={Platform.OS == "ios" ? transparentLoader : false}
                  progressViewOffset={height * 2}
                  refreshControl={
                    <RefreshControl
                      refreshing={
                        Platform.OS == "ios" ? transparentLoader : false
                      }
                      progressViewOffset={height * 2}
                      onRefresh={() => {
                        onRefreshFunction();
                      }}
                    />
                  }
                  extraData={updateEvent}
                  keyExtractor={(item) => item.id}
                  contentContainerStyle={eventHomeStyles.flatListContainer}
                  renderItem={({ item }) => {
                    let id = item.id;
                    let { attendees_list, event_type }: any = item;
                    if (event_type == activeTab) {
                      return (
                        <>
                          <TouchableWithoutFeedback key={id} onPress={() => {}}>
                            <EventListItem
                              extraData={updateEvent}
                              eventId={id}
                              navigation={navigation}
                              emailId={emailId}
                              eventData={item}
                              users={attendees_list}
                            />
                          </TouchableWithoutFeedback>
                        </>
                      );
                    } else {
                      return null;
                    }
                  }}
                />
              ) : !eventError || !eventTypeLength() ? (
                <View
                  style={[
                    CommonStyle.w100,
                    CommonStyle.jc_center,
                    CommonStyle.ai_center,
                    eventHomeStyles.noEvent,
                    colorScheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  <Text
                    style={[
                      CommonStyle.montserrat,
                      eventHomeStyles.genericMsgGuest,
                      colorScheme == "dark"
                        ? eventHomeStyles.darkText
                        : eventHomeStyles.lightText,
                    ]}
                  >
                    No Event Found
                  </Text>
                </View>
              ) : (
                <View
                  style={[
                    eventHomeStyles.noDataView,
                    colorScheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  <FlatList
                    data={emptyDataArray}
                    refreshing={
                      Platform.OS == "ios" ? transparentLoader : false
                    }
                    progressViewOffset={height * 2}
                    refreshControl={
                      <RefreshControl
                        refreshing={
                          Platform.OS == "ios" ? transparentLoader : false
                        }
                        progressViewOffset={height * 2}
                        onRefresh={() => {
                          onRefreshFunction();
                        }}
                      />
                    }
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => {
                      const [noDataFound, pullToRefresh] = item.split("/");
                      return (
                        <Text
                          style={[
                            CommonStyle.ta_center,
                            CommonStyle.montserratSemiBold,
                            CommonStyle.fs_15,
                            eventHomeStyles.netWorkIssueText,
                            colorScheme === "dark"
                              ? {
                                  ...CommonStyle.bg_1C2024,
                                  ...CommonStyle.c_D1D0D0,
                                }
                              : {
                                  ...CommonStyle.bg_FAFAFB,
                                  ...CommonStyle.c_666262,
                                },
                          ]}
                          allowFontScaling={false}
                        >
                          {noDataFound}
                          {"\n"} {pullToRefresh}
                        </Text>
                      );
                    }}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </View>
      {iSGuestUser == false && !isDummyUser && checkUserAutorize() && (
        <>
          <TouchableOpacity
            style={[
              eventHomeStyles.addEventCntr,
              keyboardStatus
                ? eventHomeStyles.hiddenTopForAddEventBtn
                : eventHomeStyles.topForAddEventBtn,
              CommonStyle.ai_center,
              CommonStyle.jc_center,
            ]}
            onPress={() => {
              setShowForm(true);
            }}
          >
            <View>
              <svgImports.PlusEvent />
            </View>
          </TouchableOpacity>
          {showForm && (
            <EventForm
              visible={showForm}
              closeForm={closeForm}
              emailId={emailId}
              event={[]}
              isEdit={false}
            />
          )}
        </>
      )}
      {iSGuestUser && (
        <TouchableOpacity
          style={[
            eventHomeStyles.logout,
            CommonStyle.pAbsolute,
            CommonStyle.as_center,
            CommonStyle.ai_center,
            CommonStyle.jc_center,
            CommonStyle.bg_007AFF,
          ]}
          onPress={logout}
        >
          <View
            style={[
              CommonStyle.dflex,
              CommonStyle.flexDRow,
              CommonStyle.w100,
              CommonStyle.h100,
              CommonStyle.jc_center,
              CommonStyle.ai_center,
            ]}
          >
            <svgImports.SignOutIcon
              style={[
                colorScheme == "dark"
                  ? CommonStyle.c_D1D0D0
                  : CommonStyle.c_474749,
              ]}
              size={18}
            />
            <Text
              style={[
                CommonStyle.montserrat,
                eventHomeStyles.logoutTxt,
                CommonStyle.c_FFFFFF,
              ]}
            >
              {"   "}Logout
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
