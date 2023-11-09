import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Modal,
  Image,
  ScrollView,
  ActivityIndicator,
  Share,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Clipboard from "expo-clipboard";
import CommonStyles from "../../../styles/Global";
import EventApiService from "../../../services/api/EventApi/eventApiService";
import GuestApiService from "../../../services/api/GuestApi/guestApiServices";
import { svgImports } from "../../../data/Imports";
import useDebounce from "../../../shared/debounce";
import { addUserStyles } from "./AddUserStyles";

let AddUser = ({ navigation }: any) => {
  const filter = ["Today", "Tomorrow", "This week"];
  const colorScheme = useColorScheme();
  const [eventState, setAllEventListtate]: any = useState({
    userName: "",
    selectedEvents: [],
  });
  const [detailModal, setDetailModal] = useState(false);
  const [detailUser, setDetailUser]: any = useState({});
  const [allEventList, setAllEventList]: any = useState([]);
  const [errorActive, setErrorActive] = useState(false);
  const [loader, setLoader] = useState(false);
  const [alreadyPresentUser, setALreadyPresentUser] = useState([]);
  const [allGuestUser, setAllGuestUser] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [backupList, setBackupList]: any = useState([]);
  const [searchQuery, setSearchQurey] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [filterData, setFilterData]: any = useState([]);
  const [message, setMessage] = useState("");
  const eventService = new EventApiService();
  const guestService = new GuestApiService();

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setFilterDate("none");
    }, 300);
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm) {
      SearchEvents();
    } else {
      setFilterData([]);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (filterDate === "none") setAllEventList(backupList);
    else if (filterDate == "Today") filterForToday();
    else if (filterDate == "Tomorrow") filterForTomorrow();
    else if (filterDate == "This week") filterForWeek();
  }, [filterDate]);

  useEffect(() => {
    if (selectAll) {
      let find = allEventList.find((event: { isChecked: boolean }) => {
        return event.isChecked == false;
      });
      if (find != undefined) {
        setSelectAll(false);
      }
    }
  }, [allEventList]);

  const SearchEvents = () => {
    let filteredEvent = backupList.filter((event: any) => {
      if (event.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return event;
      }
    });
    setFilterData(filteredEvent);
  };

  const handleChangeText = (text: string) => {
    setSearchQurey(text);
    if (!text.trim()) {
      setSearchQurey("");
    }
  };

  const copyToClipboard = async () => {
    await Clipboard.setString(message);
  };

  const fetchData = async () => {
    await fetchEvents();
    await fetchGuests();
  };

  const fetchEvents = async () => {
    const res = await eventService.getEventList();
    let { data } = res.data;
    setAllEventList(data);
    setBackupList(data);
  };

  const fetchGuests = async () => {
    guestService
      .getGuestList()
      .then((res) => {
        let { data } = res.data;
        setAllGuestUser(data);
      })
      .catch((err) => console.log(err.message));
  };

  const filterForToday = () => {
    let newList: any = [];
    let [todatStartTime, todayEndTime] = getTodayDates();
    backupList.map((todayEvent: any) => {
      let [StartDate, EndDate] = getEventDates(todayEvent);
      let result: any = chkActiveEvent(
        StartDate,
        EndDate,
        todatStartTime,
        todayEndTime
      );
      if (result) newList.push(todayEvent);
    });
    setAllEventList(newList);
  };

  const filterForTomorrow = () => {
    let newList: any = [];
    let [todatStartTime, todayEndTime] = getTomorrowDates();
    backupList.map((tomorrowEvent: any) => {
      let [StartDate, EndDate] = getEventDates(tomorrowEvent);
      let result: any = chkActiveEvent(
        StartDate,
        EndDate,
        todatStartTime,
        todayEndTime
      );
      if (result) newList.push(tomorrowEvent);
    });
    setAllEventList(newList);
  };

  const filterForWeek = () => {
    let newList: any = [];
    let [start, end] = getWeekDates();
    backupList.map((weeksEvent: any) => {
      let [StartDate, EndDate] = getEventDates(weeksEvent);
      let result: any = chkActiveEvent(StartDate, EndDate, start, end);
      if (result) newList.push(weeksEvent);
    });
    setAllEventList(newList);
  };

  function getEventDates(dates: any) {
    let eventStartDate: any = new Date(dates.startDate.split("/").join("-"));
    eventStartDate.setHours(
      dates.startTime.split(":")[0],
      dates.startTime.split(":")[1]
    );
    let StartDate = Date.parse(eventStartDate);
    let eventEndDate: any = new Date(dates.endDate.split("/").join("-"));
    eventEndDate.setHours(
      dates.endTime.split(":")[0],
      dates.endTime.split(":")[1]
    );

    let EndDate = Date.parse(eventEndDate);
    return [StartDate, EndDate];
  }

  function getTodayDates() {
    let currDAte: any = new Date();
    currDAte.setHours(0, 0, 0, 0);
    let todatStartTime = Date.parse(currDAte);
    let nextDay = currDAte.getDate() + 1;
    currDAte.setDate(nextDay);
    currDAte.setHours(0, 0, 0, 0);
    let todayEndTime = Date.parse(currDAte);
    return [todatStartTime, todayEndTime];
  }

  function getTomorrowDates() {
    let currDAte: any = new Date();
    let nextDay = currDAte.getDate() + 1;
    currDAte.setDate(nextDay);
    currDAte.setHours(0, 0, 0, 0);
    let todatStartTime = Date.parse(currDAte);
    let nextDay2 = currDAte.getDate() + 2;
    currDAte.setDate(nextDay2);
    currDAte.setHours(0, 0, 0, 0);
    let todayEndTime = Date.parse(currDAte);
    return [todatStartTime, todayEndTime];
  }

  function getWeekDates() {
    let now = new Date();
    let dayOfWeek = now.getDay();
    let numDay = now.getDate();
    let start: any = new Date(now);
    start.setDate(numDay - dayOfWeek);
    start.setHours(0, 0, 0, 0);
    let end: any = new Date(now);
    end.setDate(numDay + (7 - dayOfWeek));
    end.setHours(0, 0, 0, 0);
    start = start.toString().split(" ");
    end = end.toString().split(" ");
    start = start[1] + " " + start[2] + " " + start[3];
    end = end[1] + " " + end[2] + " " + end[3];
    start = Date.parse(start);
    end = Date.parse(end);
    return [start, end];
  }

  let chkActiveEvent = (
    eventStartTime: any,
    eventEndTime: any,
    TimeRangeStart: any,
    TimeRangeEnd: any
  ) => {
    if (eventStartTime < TimeRangeStart) {
      if (eventEndTime > TimeRangeEnd) {
        return true;
      }
    } else if (eventStartTime > TimeRangeStart) {
      if (eventStartTime < TimeRangeEnd) {
        return true;
      }
    }
    return false;
  };

  const onsubmit = async () => {
    setLoader(true);
    let alreadyPresentUserList: any = [];
    allGuestUser.map((users: any) => {
      if (
        users.name.toLowerCase().includes(eventState.userName.toLowerCase())
      ) {
        alreadyPresentUserList.push(users);
      }
    });
    if (alreadyPresentUserList.length > 0) {
      setLoader(false);
      setALreadyPresentUser(alreadyPresentUserList);
    } else {
      saveToDatabse();
      setLoader(false);
    }
  };

  const saveToDatabse = async () => {
    setALreadyPresentUser([]);
    setLoader(true);
    let selectedEvents: any = [];
    allEventList.map(async (events: any) => {
      if (events.isChecked) {
        selectedEvents.push(events.id);
      }
    });
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 6;
    ``;
    let password = "";
    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    let username = eventState.userName + password[4] + password[2];
    let newUserData = {
      name: eventState.userName,
      isGuestUser: true,
      password: password,
      token: "",
      username:
        eventState.userName.split(" ").length == 1
          ? username
          : eventState.userName
              .toLowerCase()
              .split(" ")
              .join(password.charAt(4) + password.charAt(2)),
      events: selectedEvents,
    };

    let currUserId = "";
    guestService
      .addGuestUser(newUserData)
      .then((guestData: any) => {
        currUserId = guestData.id;
        setDetailModal(true);
        setDetailUser(newUserData);
      })
      .then(() => {
        setLoader(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
    setMessage(
      "Hi " +
        newUserData.name +
        "," +
        "\n" +
        "Please use following credentials" +
        "\n" +
        "Username : " +
        newUserData.username +
        "\n" +
        "Password : " +
        newUserData.password
    );
  };

  return (
    <SafeAreaView
      style={[
        CommonStyles.flex1,
        colorScheme == "dark" ? CommonStyles.bg_1B1F23 : CommonStyles.bg_FFFFFF,
      ]}
    >
      {alreadyPresentUser.length > 0 && (
        <Modal
          onRequestClose={() => {
            setDetailModal(false);
          }}
          transparent
        >
          <View
            style={[
              CommonStyles.flex1,
              CommonStyles.jc_center,
              CommonStyles.ai_center,
              CommonStyles.bg_00000099,
            ]}
          >
            <View
              style={[
                addUserStyles.detailModal,
                colorScheme == "dark"
                  ? CommonStyles.bg_1B1F23
                  : CommonStyles.bg_FFFFFF,
              ]}
            >
              <View
                style={[
                  addUserStyles.topHeadingModal,
                  CommonStyles.flexDRow,
                  CommonStyles.jc_spaceBTW,
                  addUserStyles.topWarningModal,
                ]}
              >
                <svgImports.Warning size={22} style={addUserStyles.warningICon} />
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyles.montserratBold,
                    addUserStyles.guestAddedModalHeading,
                    addUserStyles.warnigHeadingText,
                  ]}
                >
                  Already Present
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setALreadyPresentUser([]);
                  }}
                >
                  <Entypo
                    name="cross"
                    size={30}
                    color="black"
                    style={addUserStyles.cancelBtnModal}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyles.montserratBold,
                    addUserStyles.userNameModal,
                    addUserStyles.infoAlreadyPresent,
                    colorScheme == "dark"
                      ? CommonStyles.c_D1D0D0
                      : CommonStyles.c_474749,
                  ]}
                >
                  You have {alreadyPresentUser.length} users with this name{" "}
                </Text>
                <View style={[addUserStyles.userEmailModalBox, CommonStyles.flexDCol]}>
                  {alreadyPresentUser.map((users: any, index: any) => {
                    return (
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyles.montserratSemiBold,
                          addUserStyles.userDetailsModal,
                          addUserStyles.userEmailText,
                          colorScheme == "dark"
                            ? CommonStyles.c_D1D0D0
                            : CommonStyles.c_474749,
                        ]}
                      >
                        {users.name}
                      </Text>
                    );
                  })}
                </View>
              </View>
              <View style={[addUserStyles.answerBoxModal, CommonStyles.flexDRow]}>
                <TouchableOpacity
                  style={addUserStyles.btnToConfirm}
                  onPress={() => {
                    saveToDatabse();
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyles.montserratSemiBold,
                      CommonStyles.c_FFFFFF,
                    ]}
                  >
                    Add New User
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={addUserStyles.btnToCancel}
                  onPress={() => {
                    setALreadyPresentUser([]);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyles.montserratSemiBold, addUserStyles.CancelText]}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {detailModal && Object.keys(detailUser).length > 0 && (
        <Modal
          onRequestClose={() => {
            setDetailModal(false);
          }}
          transparent
        >
          <View
            style={[
              CommonStyles.flex1,
              CommonStyles.jc_center,
              CommonStyles.ai_center,
              CommonStyles.bg_00000099,
            ]}
          >
            <View
              style={[
                addUserStyles.detailModal,
                colorScheme == "dark"
                  ? CommonStyles.bg_1B1F23
                  : CommonStyles.bg_FFFFFF,
              ]}
            >
              <View
                style={[
                  CommonStyles.flexDRow,
                  CommonStyles.jc_spaceBTW,
                  addUserStyles.topHeadingModal,
                ]}
              >
                <svgImports.TickMark size={22} />

                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyles.montserratBold,
                    addUserStyles.guestAddedModalHeading,
                  ]}
                >
                  Guest Added{" "}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Events");
                  }}
                >
                  <Entypo
                    name="cross"
                    size={30}
                    color="black"
                    style={addUserStyles.cancelBtnModal}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  allowFontScaling={false}
                  style={[
                    CommonStyles.montserratBold,
                    addUserStyles.userNameModal,
                    colorScheme == "dark"
                      ? CommonStyles.c_D1D0D0
                      : CommonStyles.c_474749,
                  ]}
                >
                  {detailUser.name}
                </Text>
                <View style={[addUserStyles.userEmailModalBox, CommonStyles.flexDRow]}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyles.montserratSemiBold,
                      addUserStyles.userNameHeading,
                      colorScheme == "dark"
                        ? CommonStyles.c_D1D0D0
                        : CommonStyles.c_474749,
                    ]}
                  >
                    USERNAME :{" "}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyles.montserratSemiBold,
                      addUserStyles.userDetailsModal,
                      colorScheme == "dark"
                        ? CommonStyles.c_D1D0D0
                        : CommonStyles.c_474749,
                    ]}
                  >
                    {detailUser.username}
                  </Text>
                </View>
                <View style={[addUserStyles.userEmailModalBox, CommonStyles.flexDRow]}>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyles.montserratSemiBold,
                      addUserStyles.userNameHeading,
                      colorScheme == "dark"
                        ? CommonStyles.c_D1D0D0
                        : CommonStyles.c_474749,
                    ]}
                  >
                    PASSWORD :{" "}
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyles.montserratSemiBold,
                      addUserStyles.userDetailsModal,
                      colorScheme == "dark"
                        ? CommonStyles.c_D1D0D0
                        : CommonStyles.c_474749,
                    ]}
                  >
                    {detailUser.password}
                  </Text>
                </View>
              </View>
              <View style={[addUserStyles.copyBar, CommonStyles.flexDRow]}>
                <TouchableOpacity
                  style={addUserStyles.copyBarBtn}
                  onPress={copyToClipboard}
                >
                  <Ionicons name="copy-outline" size={30} color="#007AFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={addUserStyles.copyBarBtn}
                  onPress={async () => {
                    await Share.share({
                      message: message,
                    });
                  }}
                >
                  <Entypo name="share" size={30} color="#007AFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
      {loader && (
        <Modal>
          <View style={addUserStyles.loaderStyle}>
            <ActivityIndicator
              size="large"
              color={"#666592"}
              style={addUserStyles.activityIndicator}
            />
          </View>
        </Modal>
      )}
      <View
        style={[
          addUserStyles.guestFormHeading,
          CommonStyles.w100,
          CommonStyles.flexDRow,
          colorScheme == "dark"
            ? CommonStyles.bg_1B1F23
            : CommonStyles.bg_FFFFFF,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={[CommonStyles.flexDRow, { zIndex: 10 }]}
        >
          <FontAwesome
            name="arrow-left"
            style={[
              CommonStyles.as_center,
              addUserStyles.backArrow,
              colorScheme == "dark"
                ? CommonStyles.c_FFFFFF
                : CommonStyles.c_474749,
            ]}
            size={18}
          ></FontAwesome>
        </TouchableOpacity>
        <Text
          allowFontScaling={false}
          style={[
            CommonStyles.montserratBold,
            CommonStyles.as_center,
            CommonStyles.c_474749,
            CommonStyles.pAbsolute,
            CommonStyles.ta_center,
            addUserStyles.guestFormHeadingText,
            colorScheme == "dark"
              ? CommonStyles.c_D1D0D0
              : CommonStyles.c_474749,
          ]}
        >
          Add Guest User
        </Text>
      </View>
      <View
        style={[
          addUserStyles.BoxConatiner,
          colorScheme == "dark"
            ? CommonStyles.bg_1B1F23
            : CommonStyles.bg_FFFFFF,
        ]}
      >
        <View>
          <Text
            allowFontScaling={false}
            style={[
              CommonStyles.montserratBold,
              addUserStyles.content,
              colorScheme == "dark"
                ? CommonStyles.c_D1D0D0
                : CommonStyles.c_474749,
            ]}
          >
            Guest name
          </Text>
        </View>
        <View>
          <TextInput
            allowFontScaling={false}
            placeholder=""
            onChangeText={(text) => {
              setAllEventListtate({ ...eventState, ["userName"]: text });
              setErrorActive(false);
            }}
            onFocus={() => setErrorActive(false)}
            value={eventState.userName}
            style={[
              CommonStyles.montserrat,
              CommonStyles.jc_center,
              addUserStyles.textInputStyling,
              colorScheme == "dark"
                ? { ...CommonStyles.bg_3C444E, ...CommonStyles.c_D1D0D0 }
                : {
                    ...CommonStyles.border_w_1,
                    ...CommonStyles.border_cr_lg,
                    ...CommonStyles.bg_rgba236,
                    ...CommonStyles.c_787884,
                  },
            ]}
          />
        </View>
        {errorActive && (
          <Text
            allowFontScaling={false}
            style={[CommonStyles.montserratBold, addUserStyles.content, addUserStyles.error]}
          >
            Enter a valid name for guest{" "}
          </Text>
        )}
        <View
          style={[
            addUserStyles.eventSEarchBarBox,
            CommonStyles.flexDRow,
            CommonStyles.jc_spaceBTW,
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              CommonStyles.montserratBold,
              addUserStyles.content,
              addUserStyles.content2,
              colorScheme == "dark"
                ? CommonStyles.c_D1D0D0
                : CommonStyles.c_474749,
            ]}
          >
            Select events for user
          </Text>
          <TouchableOpacity
            style={[addUserStyles.selectAllBtn, CommonStyles.flexDRow]}
            onPress={() => {
              setSelectAll(!selectAll);
              let allEventListArray = [...allEventList];
              allEventListArray.map((events) => {
                if (selectAll) {
                  events.isChecked = false;
                } else {
                  events.isChecked = true;
                }
              });
              setAllEventList(allEventListArray);
            }}
          >
            <Text
              allowFontScaling={false}
              style={[CommonStyles.montserrat, addUserStyles.selectAllBtnText]}
            >
              Select All
            </Text>
            <Checkbox
              color={selectAll ? "#007AFF" : "#007AFF"}
              style={addUserStyles.selectAllBtnCheckBox}
              value={selectAll}
            />
          </TouchableOpacity>
        </View>

        <View>
          <TextInput
            allowFontScaling={false}
            value={searchQuery}
            onChangeText={handleChangeText}
            placeholder="Search for events"
            style={[
              CommonStyles.montserrat,
              addUserStyles.textInputStyling,
              CommonStyles.jc_center,
              colorScheme == "dark"
                ? { ...CommonStyles.bg_3C444E, ...CommonStyles.c_D1D0D0 }
                : {
                    ...CommonStyles.border_w_1,
                    ...CommonStyles.border_cr_lg,
                    ...CommonStyles.bg_rgba236,
                    ...CommonStyles.c_787884,
                  },
            ]}
            placeholderTextColor={colorScheme == "dark" ? "#D1D0D0" : "#787884"}
          />
          <Image
            style={[
              addUserStyles.arrowDown,
              CommonStyles.flexDRow,
              CommonStyles.pAbsolute,
            ]}
            source={require("../../../../assets/images/wrapper.png")}
          />
        </View>

        <View
          style={[
            addUserStyles.filterEventCntr,
            CommonStyles.flexDRow,
            CommonStyles.jc_spaceBTW,
            CommonStyles.w100,
          ]}
        >
          {filter.map((filterItem) => (
            <TouchableOpacity
              key={filterItem.toString()}
              onPress={() => {
                if (filterDate === filterItem) {
                  setFilterDate("none");
                } else {
                  setFilterDate(filterItem);
                }
              }}
              style={[
                addUserStyles.filterEventItem,
                CommonStyles.ai_center,
                CommonStyles.jc_spaceAround,
                colorScheme == "dark"
                  ? CommonStyles.bg_414B57
                  : CommonStyles.bg_FFFFFF,
                filterItem == filterDate
                  ? { ...CommonStyles.bg_007AFF, ...CommonStyles.c_FFFFFF }
                  : null,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyles.montserrat,
                  CommonStyles.c_black,
                  CommonStyles.as_center,
                  addUserStyles.filterEventName,
                  colorScheme == "dark" ? addUserStyles.darkText : addUserStyles.lightText,
                  filterItem == filterDate
                    ? { ...CommonStyles.bg_007AFF, ...CommonStyles.c_FFFFFF }
                    : null,
                ]}
              >
                {filterItem}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView>
          {searchQuery.length >= 1
            ? filterData.map((data: any, index: any) => {
                return (
                  <TouchableOpacity
                    style={[
                      addUserStyles.EventContainer,
                      CommonStyles.flexDRow,
                      CommonStyles.as_center,
                      CommonStyles.bg_FFFFFF,
                      colorScheme == "dark"
                        ? {
                            ...CommonStyles.bg_2E343C,
                            ...addUserStyles.darkBackgroundList,
                          }
                        : CommonStyles.bg_FFFFFF,
                    ]}
                    key={index}
                    onPress={() => {
                      let allEventListArray = [...allEventList];
                      filterData[index].isChecked =
                        !filterData[index].isChecked;
                      setAllEventList(allEventListArray);
                    }}
                  >
                    <View style={[addUserStyles.CardTextCntr, CommonStyles.jc_center]}>
                      <View
                        style={[
                          addUserStyles.cardTimeCntr,
                          CommonStyles.jc_flexStart,
                          CommonStyles.as_center,
                        ]}
                      >
                        <View
                          style={[
                            CommonStyles.flexDRow,
                            CommonStyles.ai_center,
                            CommonStyles.jc_flexStart,
                          ]}
                        >
                          <svgImports.EventSymbol
                            size={24}
                            color={
                              colorScheme == "dark" ? "#D1D0D0" : "#636A74"
                            }
                          ></svgImports.EventSymbol>
                          <Text
                            allowFontScaling={false}
                            style={[
                              CommonStyles.montserrat,
                              addUserStyles.venueText,
                              colorScheme == "dark"
                                ? CommonStyles.c_D1D0D0
                                : CommonStyles.c_636A74,
                            ]}
                          >
                            {data.startDate == data.endDate ? (
                              <Text allowFontScaling={false}>
                                {data.startDate.slice(4, 6)}{" "}
                                {data.startDate.slice(0, 3)}{" "}
                              </Text>
                            ) : (
                              <>
                                {data.startDate.slice(0, 3) ==
                                data.endDate.slice(0, 3) ? (
                                  <Text allowFontScaling={false}>
                                    {data.startDate.slice(4, 6)}-
                                    {data.endDate.slice(4, 6)}{" "}
                                    {data.startDate.slice(0, 3)}{" "}
                                  </Text>
                                ) : (
                                  <Text allowFontScaling={false}>
                                    {data.startDate.slice(4, 6)}{" "}
                                    {data.startDate.slice(0, 3)} -
                                    {data.endDate.slice(4, 6)}{" "}
                                    {data.endDate.slice(0, 3)}{" "}
                                  </Text>
                                )}
                              </>
                            )}
                            |{" "}
                            {parseInt(data.startTime.slice(0, 2)) > 12 ? (
                              <Text allowFontScaling={false}>
                                {parseInt(data.startTime.slice(0, 2)) - 12}:
                                {data.startTime.slice(3)} pm
                              </Text>
                            ) : (
                              <Text allowFontScaling={false}>
                                {parseInt(data.startTime.slice(0, 2))}:
                                {data.startTime.slice(3)} am
                              </Text>
                            )}
                          </Text>
                        </View>
                        <Text
                          allowFontScaling={false}
                          style={[
                            CommonStyles.montserratSemiBold,
                            CommonStyles.c_09101D,
                            addUserStyles.eventName,
                            colorScheme == "dark" && CommonStyles.c_D1D0D0,
                          ]}
                        >
                          {data.name}
                        </Text>
                        <View
                          style={[
                            CommonStyles.flexDRow,
                            CommonStyles.ai_center,
                            CommonStyles.jc_flexStart,
                          ]}
                        >
                          <svgImports.Location
                            size={22}
                            color={
                              colorScheme == "dark" ? "#D1D0D0" : "#636A74"
                            }
                          />
                          <Text
                            allowFontScaling={false}
                            style={[
                              CommonStyles.montserrat,
                              addUserStyles.venueText,
                              colorScheme == "dark"
                                ? CommonStyles.c_D1D0D0
                                : CommonStyles.c_636A74,
                            ]}
                          >
                            {data.venue}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={addUserStyles.chkBoxConatiner}>
                      <View
                        style={
                          data.isChecked
                            ? [
                                addUserStyles.checkedChkBOxEvent,
                                CommonStyles.ai_center,
                                CommonStyles.jc_center,
                                CommonStyles.bg_007AFF,
                                CommonStyles.as_Fend,
                              ]
                            : [
                                addUserStyles.chkBoxEvent,
                                CommonStyles.as_Fend,
                                colorScheme == "dark"
                                  ? addUserStyles.chkBoxEventDark
                                  : addUserStyles.chkBoxEventlight,
                              ]
                        }
                      >
                        <Checkbox
                          color={data.isChecked ? "#007AFF" : "#F0F1F4"}
                          style={
                            data.isChecked
                              ? [addUserStyles.chkBoxStyle, CommonStyles.as_center]
                              : addUserStyles.chkBoxStyleNotChecked
                          }
                          value={data.isChecked}
                          onValueChange={() => {
                            let allEventListArray = [...allEventList];
                            filterData[index].isChecked =
                              !filterData[index].isChecked;
                            setAllEventList(allEventListArray);
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            : allEventList.map((event: any, index: any) => {
                return (
                  <TouchableOpacity
                    style={[
                      addUserStyles.EventContainer,
                      CommonStyles.flexDRow,
                      CommonStyles.as_center,
                      CommonStyles.bg_FFFFFF,
                      colorScheme == "dark"
                        ? {
                            ...CommonStyles.bg_2E343C,
                            ...addUserStyles.darkBackgroundList,
                          }
                        : CommonStyles.bg_FFFFFF,
                    ]}
                    key={index}
                    onPress={() => {
                      let allEventListArray = [...allEventList];
                      allEventListArray[index].isChecked =
                        !allEventListArray[index].isChecked;
                      setAllEventList(allEventListArray);
                    }}
                  >
                    <View style={[addUserStyles.CardTextCntr, CommonStyles.jc_center]}>
                      <View
                        style={[
                          addUserStyles.cardTimeCntr,
                          CommonStyles.jc_flexStart,
                          CommonStyles.as_center,
                        ]}
                      >
                        <View
                          style={[
                            CommonStyles.flexDRow,
                            CommonStyles.ai_center,
                            CommonStyles.jc_flexStart,
                          ]}
                        >
                          <svgImports.EventSymbol
                            size={24}
                            color={
                              colorScheme == "dark" ? "#D1D0D0" : "#636A74"
                            }
                          ></svgImports.EventSymbol>
                          <Text
                            allowFontScaling={false}
                            style={[
                              CommonStyles.montserrat,
                              addUserStyles.venueText,
                              colorScheme == "dark"
                                ? CommonStyles.c_D1D0D0
                                : CommonStyles.c_636A74,
                            ]}
                          >
                            {event.startDate == event.endDate ? (
                              <Text allowFontScaling={false}>
                                {event.startDate.slice(4, 6)}{" "}
                                {event.startDate.slice(0, 3)}{" "}
                              </Text>
                            ) : (
                              <>
                                {event.startDate.slice(0, 3) ==
                                event.endDate.slice(0, 3) ? (
                                  <Text allowFontScaling={false}>
                                    {event.startDate.slice(4, 6)}-
                                    {event.endDate.slice(4, 6)}{" "}
                                    {event.startDate.slice(0, 3)}{" "}
                                  </Text>
                                ) : (
                                  <Text allowFontScaling={false}>
                                    {event.startDate.slice(4, 6)}{" "}
                                    {event.startDate.slice(0, 3)} -
                                    {event.endDate.slice(4, 6)}{" "}
                                    {event.endDate.slice(0, 3)}{" "}
                                  </Text>
                                )}
                              </>
                            )}
                            |{" "}
                            {parseInt(event.startTime.slice(0, 2)) > 12 ? (
                              <Text allowFontScaling={false}>
                                {parseInt(event.startTime.slice(0, 2)) - 12}:
                                {event.startTime.slice(3)} pm
                              </Text>
                            ) : (
                              <Text allowFontScaling={false}>
                                {parseInt(event.startTime.slice(0, 2))}:
                                {event.startTime.slice(3)} am
                              </Text>
                            )}
                          </Text>
                        </View>
                        <Text
                          allowFontScaling={false}
                          style={[
                            CommonStyles.montserratSemiBold,
                            CommonStyles.c_09101D,
                            addUserStyles.eventName,
                            colorScheme == "dark" && CommonStyles.c_D1D0D0,
                          ]}
                        >
                          {event.name.length < 30
                            ? event.name
                            : event.name.substring(0, 30) + "..."}
                        </Text>
                        <View
                          style={[
                            CommonStyles.flexDRow,
                            CommonStyles.ai_center,
                            CommonStyles.jc_flexStart,
                          ]}
                        >
                          <svgImports.Location
                            size={22}
                            color={
                              colorScheme == "dark" ? "#D1D0D0" : "#636A74"
                            }
                          />
                          <Text
                            allowFontScaling={false}
                            style={[
                              CommonStyles.montserrat,
                              addUserStyles.venueText,
                              colorScheme == "dark"
                                ? CommonStyles.c_D1D0D0
                                : CommonStyles.c_636A74,
                            ]}
                          >
                            {event.venue}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={addUserStyles.chkBoxConatiner}>
                      <View
                        style={
                          event.isChecked
                            ? [
                                addUserStyles.checkedChkBOxEvent,
                                CommonStyles.ai_center,
                                CommonStyles.jc_center,
                                CommonStyles.bg_007AFF,
                                CommonStyles.as_Fend,
                              ]
                            : [
                                addUserStyles.chkBoxEvent,
                                CommonStyles.as_Fend,
                                colorScheme == "dark"
                                  ? addUserStyles.chkBoxEventDark
                                  : addUserStyles.chkBoxEventlight,
                              ]
                        }
                      >
                        <Checkbox
                          color={event.isChecked ? "#007AFF" : "#F0F1F4"}
                          style={
                            event.isChecked
                              ? [addUserStyles.chkBoxStyle, CommonStyles.as_center]
                              : addUserStyles.chkBoxStyleNotChecked
                          }
                          value={event.isChecked}
                          onValueChange={() => {
                            let allEventListArray = [...allEventList];
                            allEventListArray[index].isChecked =
                              !allEventListArray[index].isChecked;
                            setAllEventList(allEventListArray);
                          }}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
        </ScrollView>
      </View>
      <View style={[CommonStyles.ai_center, addUserStyles.btnContainer]}>
        <TouchableOpacity
          onPress={() => {
            eventState.userName.length < 3 ? setErrorActive(true) : onsubmit();
          }}
          style={[
            addUserStyles.btnCntr,
            CommonStyles.bg_007AFF,
            CommonStyles.jc_center,
          ]}
        >
          <Text
            allowFontScaling={false}
            style={[
              CommonStyles.c_FFFFFF,
              CommonStyles.as_center,
              CommonStyles.fs_15,
            ]}
          >
            Create New User
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddUser;
