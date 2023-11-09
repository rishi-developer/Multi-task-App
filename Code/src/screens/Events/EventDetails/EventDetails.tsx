import React, { useState, useEffect, useContext } from "react";
import {
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  RefreshControl,
} from "react-native";
import XLSX from "xlsx";
import { FontAwesome } from "@expo/vector-icons";
import { Platform } from "expo-modules-core";
import * as FileSystem from "expo-file-system";
import * as SecureStore from "expo-secure-store";
import * as Sharing from "expo-sharing";
import AttendeesList from "../AttendeesList/AttendeesList";
import CommonStyle from "../../../styles/Global";
import ConfirmDelete from "../../../shared/confirmDeleteModal";
import EventApiService from "../../../services/api/EventApi/eventApiService";
import EventForm from "../EventForm/EventForm";
import GuestApiService from "../../../services/api/GuestApi/guestApiServices";
import { LinearGradient } from "expo-linear-gradient";
import SearchBar from "../../../shared/SearchBar";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import CommonModal from "../../../shared/CommonModal";
import socket from "../../../services/socket";
import { svgImports } from "../../../data/Imports";
import useColorScheme from "../../../hooks/useColorScheme";
import UserDetailApiService from "../../../services/api/UserApi/userApiServices";
const { height } = Dimensions.get("screen");
import { dummy_user_list } from "../../../data/Dummy";
import { eventDetailsStyles } from "./EventDetailsStyles";

const EventDetails = ({ navigation, id, route }: any) => {
  const colorscheme = useColorScheme();
  const [email, setEmail] = useState<string>("");
  const [validEvent, setValidEvent] = useState(false);
  const [users, setUsers] = useState<userDetailsObjType[]>([]);
  const [iSGuestUser, setIsGuestUser] = useState(false);
  const [socketAdd, setSocketAdd] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [searchAttendee, setSearchAttendee] = useState("");
  const [moredata, setMoreData] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [counter, setCounter] = useState(0);
  const [eventCounter, setEventCounter] = useState(0);
  const [isAttLoading, setIsAttLoading] = useState(true);
  const [checkedIn, setCheckedIn] = useState(false);
  const [locationConfirm, setLocationConfirm] = useState(false);
  const [transparentLoader, setTransparentLoader] = useState(false);
  const [filterAttendee, setFilterAttendee] = useState<userDetailsObjType[]>(
    []
  );
  let {
    fetchEventDetails,
    eventDetails,
    setIsLoading,
    isLoading,
    resetHandler,
    isAdmin,
    guestUser,
    userDetails,
    eventDetialError,
    isDummyUser,
  }: any = useContext(NeoContext);
  const emptyDataArray = ["No Data Found/Pull to refresh...."];
  let eventService = new EventApiService();
  let guestService = new GuestApiService();
  let userService = new UserDetailApiService();

  type attendeesObjType = {
    users: string;
    Date: Date;
  };
  type userDetailsObjType = {
    department: string;
    designation: string;
    email_id: string;
    emp_id: string;
    id: number;
    location: string;
    mobile_number: string;
    name: string;
    photo_url: string;
    total_points: number;
  };

  type guestUserTypeObj = {
    checked: boolean;
    events: string[];
    isGuestUser: boolean;
    name: string;
    password: string;
    token: string;
    username: string;
  };
  type eventDetailsObjType = {
    name: string;
    description: string;
    venue: string;
    users: attendeesObjType[];
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    eventType: string[];
  };

  let sliderTrigger = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Events");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    setAdmin(isAdmin);
  }, [isAdmin]);
  useEffect(() => {
    fetchUser();
    eventValid();
    setShowSearch(false);
    setAdmin(isAdmin);
    setIsLoading(false);
  }, [eventDetails]);

  useEffect(() => {
    socket?.on("connect", () => {
      socket.on("response", (boolean: boolean) => {
        setSocketAdd(boolean);
      });
    });
  });

  useEffect(() => {
    fetchList();
  }, [eventDetails]);

  useEffect(() => {
    if (socketAdd) {
      if (!iSGuestUser) {
        fetchEventDetails(route.params.eventId);
        setSocketAdd(false);
      }
    }
  }, [socketAdd]);

  useEffect(() => {
    fetchEventDetailsFunc();
  }, [route.params.eventId]);

  const fetchEventDetailsFunc = () => {
    setShowSearch(false);
    setShowDropDown(false);
    setIsLoading(true);
    getData();
    setAdmin(isAdmin);
    eventValid();
    fetchEventDetails(route.params.eventId);
  };

  const fetchEventDetailsFunc2 = async () => {
    await getData();
    eventValid();
    await fetchEventDetails(route.params.eventId);
    return;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      resetHandler();
      setCounter(0);
      setEventCounter(0);
    });
  }, [navigation]);

  const fetchList = async () => {
    await getData();
    if (eventDetails.attendees_list.length > 0) {
      let filteredDataInAtteendeesList =
        await eventDetails.attendees_list.filter((e: attendeesObjType) => {
          return e.users.toLowerCase() == email.toLowerCase();
        });
      if (filteredDataInAtteendeesList.length > 0) setCheckedIn(true);
      else setCheckedIn(false);
    }
  };

  function getEventDates() {
    let eventEndDate: Date = new Date(
      eventDetails.end_date.split("/").join("-")
    );
    let eventStartDate: Date = new Date(
      eventDetails.start_date.split("/").join("-")
    );
    eventEndDate.setHours(
      eventDetails.end_time.split(":")[0],
      eventDetails.end_time.split(":")[1]
    );
    eventStartDate.setHours(
      eventDetails.start_time.split(":")[0],
      eventDetails.start_time.split(":")[1]
    );
    let endDate = Date.parse(eventEndDate.toString());
    let startDate = Date.parse(eventStartDate.toString());
    return [endDate, startDate];
  }

  const eventValid = () => {
    let data = getEventDates();
    if (data[0] > Date.now() && data[1] < Date.now()) {
      setValidEvent(true);
    } else {
      setValidEvent(false);
    }
  };

  const openScanner = async (id: number, data: eventDetailsObjType) => {
    navigation.setParams({ eventId: null });
    BackHandler.removeEventListener("hardwareBackPress", () => {
      return false;
    });
    navigation.navigate("ScanScreen", { eventDetails: data, id: id });
  };

  const loadMoreItem = async () => {
    let userArray = users;
    if (eventDetails.attendees_list.length < 9) {
      setMoreData(false);
      setIsAttLoading(false);
    } else if (eventDetails.attendees_list.length > counter) {
      setIsAttLoading(true);
      const res = await userService.getAllUsers();
      let { data } = res;
      await eventDetails.attendees_list
        .reverse()
        .slice(counter, counter + 9)
        .forEach(async (attendee: attendeesObjType) => {
          for (let i = eventCounter; i < data.data.length; i++) {
            if (
              attendee.users.toLowerCase() ==
              data.data[i].email_id.toLowerCase()
            ) {
              userArray.push(data.data[i]);
              setEventCounter(0);
              break;
            }
          }
        });
      setUsers([...userArray]);
      setIsAttLoading(false);
      setCounter(counter + 9);
    } else {
      setIsAttLoading(true);
      const res = await userService.getAllUsers();
      let { data } = res;
      await eventDetails.attendees_list
        .reverse()
        .slice(counter, counter + 9)
        .forEach(async (attendee: attendeesObjType) => {
          for (let i = eventCounter; i < data.data.length; i++) {
            if (
              attendee.users.toLowerCase() ==
              data.data[i].email_id.toLowerCase()
            ) {
              userArray.push(data.data[i]);
              setEventCounter(0);
              break;
            }
          }
        });
      setUsers([...userArray]);
      setIsAttLoading(false);
      setMoreData(false);
    }
  };

  const fetchUser = async () => {
    if (eventDetails.attendees_list.length > 0) {
      setIsAttLoading(true);
      let userArray: userDetailsObjType[] = [];
      const res = await userService.getAllUsers();
      let { data } = res;
      await eventDetails.attendees_list
        .reverse()
        .slice(counter, counter + 9)
        .forEach(async (attendee: attendeesObjType) => {
          for (let i = eventCounter; i < data.data.length; i++) {
            if (
              attendee.users.toLowerCase() ==
              data.data[i].email_id.toLowerCase()
            ) {
              let newResult = {};
              userArray.push(data.data[i]);
              setEventCounter(i);
              break;
            }
          }
        });
      let newUsers = [...users, ...userArray];
      setUsers([...newUsers]);
      setEventCounter(0);
      setMoreData(true);
      setIsAttLoading(false);

      setCounter(counter + 9);
    } else {
      setIsAttLoading(false);
      setUsers([]);
    }
  };

  const getData = async () => {
    if (Object.keys(userDetails).length !== 0) {
      setEmail(userDetails.email);
    } else {
      const isGuestUser = await SecureStore.getItemAsync("isGuestUser");
      if (isGuestUser) {
        setIsGuestUser(true);
      }
    }
  };

  const deleteEvent = async () => {
    try {
      guestUser.forEach(async (guest: guestUserTypeObj) => {
        const index = guest.events.indexOf(route.params.eventId);
        guest.events.splice(index, 1);

        let newEventData = {
          events: [...guest.events],
        };
        guestService.updateGuestEvent(newEventData, guest.username);
      });
      eventService.deleteEvent(route.params.eventId).then((res) => {
        socket.emit("add-event", true);
        navigation.navigate("Events");
      });
    } catch (e) {
      alert(e);
    }
  };
  const closeForm = () => {
    setShowDropDown(false);
    fetchEventDetails(route.params.eventId);
    setShowForm(false);
  };
  const showSearchHandler = () => {
    setShowSearch(!showSearch);
  };
  const dropDownHandler = () => {
    setSearchAttendee("");
    setShowSearch(false);
    setShowDropDown(!showDropDown);
  };
  const handleChangeText = (text: string) => {
    setShowDropDown(false);
    setSearchAttendee(text);
    let filteredAttendee = users.filter((user: userDetailsObjType) => {
      if (user.name.toLowerCase().includes(searchAttendee.toLowerCase())) {
        return user;
      }
    });
    setFilterAttendee(filteredAttendee);
  };
  const onClear = () => {
    setSearchAttendee("");
    setShowSearch(false);
  };

  let chkLocation = async () => {
    const res = await userService.getUserLocation(email);
    let { location } = res.data;

    if (
      location.toLowerCase() == "IT Park, Panchkula".toLowerCase() &&
      eventDetails.city[0].toLowerCase() == "Panchkula".toLowerCase()
    ) {
      checkedInFun();
    } else if (
      location.toLowerCase() == "Canaan Tower".toLowerCase() &&
      eventDetails.city[0].toLowerCase() == "Gurugram".toLowerCase()
    ) {
      checkedInFun();
    } else {
      setIsLoading(false);
      setLocationConfirm(true);
    }
  };
  let checkedInFun = async () => {
    await getData();
    setCheckedIn(true);
    setCounter(0);
    setEventCounter(0);
    setUsers([]);
    await eventService.updateEventsUser(route.params.eventId, email);
    await fetchEventDetails(route.params.eventId);
  };
  const downloadAttendanceHandler = async () => {
    setIsLoading(true);
    const res = await eventService.getAttendance(
      route.params.eventId,
      iSGuestUser
    );
    if (!res.data.error) {
      var ws = XLSX.utils.json_to_sheet(res.data.data);
      var wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Cities");
      const wbout = XLSX.write(wb, {
        type: "base64",
        bookType: "xlsx",
      });
      let uri = "";
      if (Platform.OS === "ios") {
        uri =
          FileSystem.cacheDirectory +
          eventDetails.name.replace(/\s/g, "_") +
          "_attendance.xlsx";
      } else {
        uri =
          FileSystem.cacheDirectory + eventDetails.name + " attendance.xlsx";
      }
      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setIsLoading(false);
      await Sharing.shareAsync(uri, {
        mimeType:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        dialogTitle: eventDetails.name + "attendance",
        UTI: "com.microsoft.excel.xlsx",
      })
        .catch((error) => {
          navigation.navigate("EventDetails", {
            eventId: route.params.eventId,
          });
        })
        .then(() => {
          navigation.navigate("EventDetails", {
            eventId: route.params.eventId,
          });
        });
    } else {
      setIsLoading(false);
      alert("You don't have access");
    }
  };

  const showWarningfalse = () => {
    setLocationConfirm(false);
  };

  const successfulCheckIn = () => {
    setLocationConfirm(false);
    setIsLoading(true);
    checkedInFun();
  };

  return (
    <View
      style={[
        CommonStyle.flex1,
        colorscheme === "dark" ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
      ]}
    >
      {isLoading ? (
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.ai_center,
            CommonStyle.jc_center,
          ]}
        >
          <ActivityIndicator size="large" color={"#666592"} />
        </View>
      ) : (
        <>
          <TouchableWithoutFeedback
            onPress={() => {
              sliderTrigger();
            }}
          >
            <View>
              <CommonModal
                showWarning={locationConfirm}
                showWarningfalse={showWarningfalse}
                typeOf="checkIn"
                message="Confirm Check In"
                city={eventDetails.city[0]}
                logoutButtonHandler={successfulCheckIn}
              />

              <View
                style={[
                  CommonStyle.pRelative,
                  eventDetailsStyles.headerContainer,
                ]}
              >
                <ImageBackground
                  source={require("../../../../assets/images/EventBanner.png")}
                  style={[
                    CommonStyle.w100,
                    colorscheme === "dark" && { opacity: 0.5 },
                  ]}
                >
                  <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"]}
                    style={[
                      eventDetailsStyles.headerGradient,
                      CommonStyle.bg_trans,
                    ]}
                  />
                </ImageBackground>
                <View
                  style={[CommonStyle.pAbsolute, eventDetailsStyles.backHolder]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Events");
                    }}
                  >
                    <svgImports.EventBack size={22} />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={[
                  eventDetailsStyles.bodyContainer,
                  colorscheme === "dark"
                    ? CommonStyle.bg_1B1F23
                    : CommonStyle.bg_FFFFFF,
                ]}
              >
                {transparentLoader && Platform.OS == "android" && (
                  <ActivityIndicator color={"#666592"} size={"large"} />
                )}
                {eventDetialError ? (
                  <View
                    style={[
                      CommonStyle.h100,
                      CommonStyle.w100,
                      colorscheme === "dark"
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
                          onRefresh={async () => {
                            setTransparentLoader(true);
                            await fetchEventDetailsFunc2();
                            setTransparentLoader(false);
                          }}
                          colors={["#498BEA"]}
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
                              eventDetailsStyles.netWorkIssueText,
                              colorscheme === "dark"
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
                ) : (
                  <>
                    <View
                      style={[
                        CommonStyle.flexDRow,
                        CommonStyle.jc_spaceBTW,
                        colorscheme === "dark"
                          ? CommonStyle.bg_1B1F23
                          : CommonStyle.bg_FFFFFF,
                      ]}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserratSemiBold,
                          eventDetailsStyles.headingText,
                          colorscheme === "dark"
                            ? CommonStyle.c_FFFFFF
                            : CommonStyle.c_474749,
                        ]}
                      >
                        {eventDetails.name} | {eventDetails.city.join(", ")}
                      </Text>
                      {admin && (
                        <TouchableOpacity onPress={dropDownHandler}>
                          <View
                            style={[
                              eventDetailsStyles.menuIconContainer,
                              CommonStyle.jc_center,
                              colorscheme === "dark"
                                ? CommonStyle.bg_1B1F23
                                : CommonStyle.bg_FFFFFF,
                            ]}
                          >
                            <svgImports.EventMenu />
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                    {showDropDown && (
                      <View
                        style={[
                          eventDetailsStyles.dropDownContainer,
                          CommonStyle.pAbsolute,
                          CommonStyle.jc_center,
                          colorscheme === "dark"
                            ? CommonStyle.bg_2E343C
                            : CommonStyle.bg_FFFFFF,
                        ]}
                      >
                        <View
                          style={[
                            eventDetailsStyles.dropHolder,
                            colorscheme === "dark"
                              ? CommonStyle.bg_2E343C
                              : CommonStyle.bg_FFFFFF,
                          ]}
                        >
                          <TouchableOpacity
                            style={eventDetailsStyles.dropTextHolder}
                            onPress={() => {
                              setShowForm(true);
                            }}
                          >
                            <Text
                              allowFontScaling={false}
                              style={[
                                CommonStyle.montserratSemiBold,
                                eventDetailsStyles.dropText,
                                CommonStyle.c_474749,
                                colorscheme === "dark"
                                  ? CommonStyle.c_FFFFFF
                                  : CommonStyle.c_474749,
                              ]}
                            >
                              Edit
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={eventDetailsStyles.dropTextSecHolder}
                            onPress={() => {
                              setShowWarning(true);
                            }}
                          >
                            <Text
                              allowFontScaling={false}
                              style={[
                                CommonStyle.montserratSemiBold,
                                eventDetailsStyles.dropDeleteText,
                              ]}
                            >
                              Delete Event
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                    <View
                      style={[
                        eventDetailsStyles.eventTimeContainer,
                        colorscheme === "dark"
                          ? CommonStyle.bg_1B1F23
                          : CommonStyle.bg_FFFFFF,
                      ]}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserrat,
                          eventDetailsStyles.eventText,
                          CommonStyle.c_636A74,
                          colorscheme === "dark" && CommonStyle.c_FFFFFF,
                        ]}
                      >
                        <svgImports.Calendar color={"#498BEA"} />
                        {"  "}
                        {eventDetails.start_date == eventDetails.end_date ? (
                          <>
                            <Text allowFontScaling={false}>
                              {eventDetails.start_date.slice(4, 6)}{" "}
                              {eventDetails.start_date.slice(0, 3)},{" "}
                            </Text>
                            {parseInt(eventDetails.start_time.slice(0, 2)) >
                            12 ? (
                              <Text>
                                {parseInt(eventDetails.start_time.slice(0, 2)) -
                                  12}
                                :{eventDetails.start_time.slice(3)} pm -{" "}
                              </Text>
                            ) : parseInt(eventDetails.start_time.slice(0, 2)) ==
                              12 ? (
                              <Text>
                                {parseInt(eventDetails.start_time.slice(0, 2))}:
                                {eventDetails.start_time.slice(3)} pm -{" "}
                              </Text>
                            ) : (
                              <Text>
                                {parseInt(eventDetails.start_time.slice(0, 2))}:
                                {eventDetails.start_time.slice(3)} am -{" "}
                              </Text>
                            )}

                            <Text allowFontScaling={false}>
                              {eventDetails.start_date.slice(4, 6)}{" "}
                              {eventDetails.start_date.slice(0, 3)},{" "}
                            </Text>
                            {parseInt(eventDetails.end_time.slice(0, 2)) >
                            12 ? (
                              <Text>
                                {parseInt(eventDetails.end_time.slice(0, 2)) -
                                  12}
                                :{eventDetails.end_time.slice(3)} pm
                              </Text>
                            ) : parseInt(eventDetails.end_time.slice(0, 2)) ==
                              12 ? (
                              <Text>
                                {parseInt(eventDetails.end_time.slice(0, 2))}:
                                {eventDetails.end_time.slice(3)} pm
                              </Text>
                            ) : (
                              <Text>
                                {parseInt(eventDetails.end_time.slice(0, 2))}:
                                {eventDetails.end_time.slice(3)} am
                              </Text>
                            )}
                          </>
                        ) : (
                          <>
                            {eventDetails.start_date.slice(0, 3) ==
                            eventDetails.end_date.slice(0, 3) ? (
                              <>
                                <Text allowFontScaling={false}>
                                  {eventDetails.start_date.slice(4, 6)}{" "}
                                  {eventDetails.start_date.slice(0, 3)},{" "}
                                </Text>
                                {parseInt(eventDetails.start_time.slice(0, 2)) >
                                12 ? (
                                  <Text>
                                    {parseInt(
                                      eventDetails.start_time.slice(0, 2)
                                    ) - 12}
                                    :{eventDetails.start_time.slice(3)} pm -{" "}
                                  </Text>
                                ) : parseInt(
                                    eventDetails.start_time.slice(0, 2)
                                  ) == 12 ? (
                                  <Text>
                                    {parseInt(
                                      eventDetails.start_time.slice(0, 2)
                                    )}
                                    :{eventDetails.start_time.slice(3)} pm -{" "}
                                  </Text>
                                ) : (
                                  <Text>
                                    {parseInt(
                                      eventDetails.start_time.slice(0, 2)
                                    )}
                                    :{eventDetails.start_time.slice(3)} am -{" "}
                                  </Text>
                                )}

                                <Text>
                                  {eventDetails.end_date.slice(4, 6)}{" "}
                                  {eventDetails.start_date.slice(0, 3)},{" "}
                                </Text>
                                {parseInt(eventDetails.end_time.slice(0, 2)) >
                                12 ? (
                                  <Text>
                                    {parseInt(
                                      eventDetails.end_time.slice(0, 2)
                                    ) - 12}
                                    :{eventDetails.end_time.slice(3)} pm
                                  </Text>
                                ) : parseInt(
                                    eventDetails.end_time.slice(0, 2)
                                  ) == 12 ? (
                                  <Text>
                                    {parseInt(
                                      eventDetails.end_time.slice(0, 2)
                                    )}
                                    :{eventDetails.end_time.slice(3)} pm
                                  </Text>
                                ) : (
                                  <Text>
                                    {parseInt(
                                      eventDetails.end_time.slice(0, 2)
                                    )}
                                    :{eventDetails.end_time.slice(3)} am
                                  </Text>
                                )}
                              </>
                            ) : (
                              <>
                                <Text allowFontScaling={false}>
                                  {eventDetails.start_date.slice(4, 6)}{" "}
                                  {eventDetails.start_date.slice(0, 3)},{" "}
                                </Text>
                                {parseInt(eventDetails.start_time.slice(0, 2)) >
                                12 ? (
                                  <Text>
                                    {parseInt(
                                      eventDetails.start_time.slice(0, 2)
                                    ) - 12}
                                    :{eventDetails.start_time.slice(3)} pm -{" "}
                                  </Text>
                                ) : parseInt(
                                    eventDetails.start_time.slice(0, 2)
                                  ) == 12 ? (
                                  <Text>
                                    {parseInt(
                                      eventDetails.start_time.slice(0, 2)
                                    )}
                                    :{eventDetails.start_time.slice(3)} pm -{" "}
                                  </Text>
                                ) : (
                                  <Text>
                                    {parseInt(
                                      eventDetails.start_time.slice(0, 2)
                                    )}
                                    :{eventDetails.start_time.slice(3)} am -{" "}
                                  </Text>
                                )}
                                <Text>
                                  {eventDetails.end_date.slice(4, 6)}{" "}
                                  {eventDetails.end_date.slice(0, 3)},{" "}
                                </Text>
                                {parseInt(eventDetails.end_time.slice(0, 2)) >
                                12 ? (
                                  <Text>
                                    {parseInt(
                                      eventDetails.end_time.slice(0, 2)
                                    ) - 12}
                                    :{eventDetails.end_time.slice(3)} pm
                                  </Text>
                                ) : parseInt(
                                    eventDetails.end_time.slice(0, 2)
                                  ) == 12 ? (
                                  <Text>
                                    {parseInt(
                                      eventDetails.end_time.slice(0, 2)
                                    )}
                                    :{eventDetails.end_time.slice(3)} pm
                                  </Text>
                                ) : (
                                  <Text>
                                    {parseInt(
                                      eventDetails.end_time.slice(0, 2)
                                    )}
                                    :{eventDetails.end_time.slice(3)} am
                                  </Text>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Text>
                    </View>
                    <View
                      style={[
                        eventDetailsStyles.eventTimeContainer,
                        colorscheme === "dark"
                          ? CommonStyle.bg_1B1F23
                          : CommonStyle.bg_FFFFFF,
                      ]}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserrat,
                          eventDetailsStyles.eventText,
                          CommonStyle.c_636A74,
                          colorscheme === "dark" && CommonStyle.c_FFFFFF,
                        ]}
                      >
                        <svgImports.Location color={"#498BEA"} />
                        {"  "}
                        {eventDetails.venue}
                      </Text>
                    </View>
                    <View
                      style={[
                        eventDetailsStyles.eventdescContainer,
                        colorscheme === "dark"
                          ? CommonStyle.bg_1B1F23
                          : CommonStyle.bg_FFFFFF,
                      ]}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserrat,
                          eventDetailsStyles.eventdescText,
                          colorscheme === "dark" && CommonStyle.c_FFFFFF,
                        ]}
                      >
                        {eventDetails.description}
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
          {!eventDetialError && (
            <>
              <View style={[eventDetailsStyles.seperator]} />
              <View
                style={[
                  eventDetailsStyles.attendeesContainer,
                  colorscheme === "dark"
                    ? CommonStyle.bg_1B1F23
                    : CommonStyle.bg_FFFFFF,
                ]}
              >
                <View
                  style={[
                    CommonStyle.flexDRow,
                    colorscheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.montserratBold,
                      CommonStyle.fs_15,
                      CommonStyle.as_center,
                      colorscheme === "dark"
                        ? CommonStyle.c_FFFFFF
                        : CommonStyle.c_474749,
                    ]}
                  >
                    Attendees List
                  </Text>
                  <View
                    style={[
                      eventDetailsStyles.numberofattendees,
                      CommonStyle.bg_007AFF,
                      CommonStyle.jc_center,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.fs_10,
                        CommonStyle.ta_center,
                        CommonStyle.c_FFFFFF,
                      ]}
                    >
                      {isDummyUser
                        ? dummy_user_list.length
                        : eventDetails.attendees_list.length > 999
                        ? Math.floor(
                            eventDetails.attendees_list.length / 1000
                          ).toString() + "K+"
                        : eventDetails.attendees_list.length}
                    </Text>
                  </View>
                  {eventDetails.attendees_list.length > 0 &&
                    admin &&
                    !isDummyUser && (
                      <TouchableOpacity
                        style={eventDetailsStyles.downloadAttendees}
                        onPress={() => {
                          downloadAttendanceHandler();
                        }}
                      >
                        <FontAwesome
                          name="arrow-down"
                          style={[
                            colorscheme === "dark"
                              ? (CommonStyle.bg_1B1F23, CommonStyle.c_FFFFFF)
                              : (CommonStyle.bg_FFFFFF, CommonStyle.c_000000),
                          ]}
                        />
                      </TouchableOpacity>
                    )}
                  {eventDetails.attendees_list.length > 0 &&
                    !showSearch &&
                    !isDummyUser && (
                      <TouchableOpacity
                        style={[
                          eventDetailsStyles.search,
                          CommonStyle.jc_center,
                          CommonStyle.ai_center,
                          CommonStyle.pAbsolute,
                        ]}
                        onPress={showSearchHandler}
                      >
                        <View
                          style={[
                            CommonStyle.as_center,
                            colorscheme === "dark"
                              ? CommonStyle.bg_1B1F23
                              : CommonStyle.bg_FFFFFF,
                          ]}
                        >
                          <svgImports.Search />
                        </View>
                      </TouchableOpacity>
                    )}
                  {eventDetails.attendees_list.length > 0 &&
                    showSearch &&
                    !isDummyUser && (
                      <SearchBar
                        value={searchAttendee}
                        onChangeText={handleChangeText}
                        placeholder="Search Attendee"
                        openInputModal={null}
                        onClear={onClear}
                        typeOf={"attendee"}
                      />
                    )}
                </View>
                <View
                  style={[
                    eventDetailsStyles.attendeeBody,
                    colorscheme === "dark"
                      ? CommonStyle.bg_1B1F23
                      : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  {searchAttendee.length > 0 ? (
                    filterAttendee.length > 0 ? (
                      <AttendeesList attendeeData={filterAttendee} />
                    ) : (
                      <View
                        style={[
                          eventDetailsStyles.noResultsText,
                          CommonStyle.jc_center,
                        ]}
                      >
                        <Text
                          style={colorscheme === "dark" && CommonStyle.c_FFFFFF}
                        >
                          No results Found
                        </Text>
                      </View>
                    )
                  ) : (
                    <AttendeesList
                      users={users}
                      // extraData={eventId}
                      attendeeData={isDummyUser ? dummy_user_list : users}
                      moreData={moredata}
                      loadMoreItem={!isDummyUser && loadMoreItem}
                      isLoading={isAttLoading}
                    />
                  )}
                  {showForm && (
                    <EventForm
                      visible={showForm}
                      closeForm={closeForm}
                      emailId={email}
                      users={users}
                      event={[
                        {
                          eventName: eventDetails.name,
                          eventDesc: eventDetails.description,
                          eventType: eventDetails.event_type,
                          eventCity: eventDetails.city,
                          location: eventDetails.venue,
                          startTime: eventDetails.start_time,
                          endTime: eventDetails.end_time,
                          startDate: eventDetails.start_date,
                          createdBy: eventDetails.createdBy,
                          users: eventDetails.attendees_list,
                          endDate: eventDetails.end_date,
                          eventId: route.params.eventId,
                          geminiAdmin: eventDetails.gemini_admin,
                          guestAdmin: eventDetails.guest_admin,
                          guestName: eventDetails.guest_name,
                          adminType: eventDetails.admin_type,
                        },
                      ]}
                      isEdit={true}
                    />
                  )}
                </View>
              </View>
            </>
          )}
          {showWarning && (
            <ConfirmDelete
              showWarning={showWarning}
              setShowWarning={setShowWarning}
              deleteEvent={deleteEvent}
              setShowDropDown={setShowDropDown}
            />
          )}
          {admin &&
            validEvent &&
            eventDetails.event_type.toLowerCase() != "lunch" && (
              <View
                style={[
                  eventDetailsStyles.scanBtnHolder,
                  colorscheme === "dark"
                    ? CommonStyle.bg_1B1F23
                    : CommonStyle.bg_FFFFFF,
                ]}
              >
                <TouchableOpacity
                  disabled={isAttLoading}
                  onPress={() => {
                    if (!isAttLoading) {
                      openScanner(route.params.eventId, {
                        name: eventDetails.name,
                        description: eventDetails.description,
                        venue: eventDetails.venue,
                        users: eventDetails.attendees_list,
                        startDate: eventDetails.start_date,
                        endDate: eventDetails.end_date,
                        startTime: eventDetails.start_time,
                        endTime: eventDetails.end_time,
                        eventType: eventDetails.event_type,
                      });
                    }
                  }}
                >
                  <View
                    style={[
                      eventDetailsStyles.scanBtn,
                      CommonStyle.bg_007AFF,
                      CommonStyle.ai_center,
                      isAttLoading && eventDetailsStyles.disableBtnColor,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserratSemiBold,
                        CommonStyle.c_FFFFFF,
                        eventDetailsStyles.scanBtnText,
                      ]}
                    >
                      <svgImports.Scan />
                      {"  "}
                      Scan
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          {eventDetails.event_type.toLowerCase() == "lunch" &&
            validEvent &&
            !iSGuestUser &&
            !isAttLoading &&
            !isDummyUser && (
              <View
                style={[
                  eventDetailsStyles.scanBtnHolder,
                  CommonStyle.flex1,
                  CommonStyle.jc_flexEnd,
                  colorscheme === "dark"
                    ? CommonStyle.bg_1B1F23
                    : CommonStyle.bg_FFFFFF,
                ]}
              >
                <TouchableOpacity
                  disabled={isAttLoading}
                  onPress={() => {
                    if (!checkedIn) chkLocation();
                  }}
                >
                  <View
                    style={[
                      eventDetailsStyles.scanBtn,
                      CommonStyle.ai_center,
                      !checkedIn
                        ? CommonStyle.bg_007AFF
                        : CommonStyle.bg_D8FEE6,
                      isAttLoading && eventDetailsStyles.disableBtnColor,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserratBold,
                        eventDetailsStyles.scanBtnText,
                        !checkedIn
                          ? CommonStyle.c_FFFFFF
                          : CommonStyle.c_000000,
                      ]}
                    >
                      {checkedIn ? "Checked In" : "Check In"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          {admin == false &&
            iSGuestUser &&
            validEvent &&
            eventDetails.event_type.toLowerCase() != "lunch" && (
              <View
                style={[
                  eventDetailsStyles.scanBtnHolder,
                  CommonStyle.flex1,
                  CommonStyle.jc_flexEnd,
                  colorscheme === "dark"
                    ? CommonStyle.bg_1B1F23
                    : CommonStyle.bg_FFFFFF,
                ]}
              >
                <TouchableOpacity
                  disabled={isAttLoading}
                  onPress={() => {
                    if (!isAttLoading) {
                      openScanner(route.params.eventId, {
                        name: eventDetails.name,
                        description: eventDetails.description,
                        venue: eventDetails.venue,
                        users: eventDetails.attendees_list,
                        startDate: eventDetails.start_date,
                        endDate: eventDetails.end_date,
                        startTime: eventDetails.start_time,
                        endTime: eventDetails.end_time,
                        eventType: eventDetails.event_type,
                      });
                    }
                  }}
                >
                  <View
                    style={[
                      eventDetailsStyles.scanBtn,
                      CommonStyle.bg_007AFF,
                      CommonStyle.ai_center,
                      isAttLoading && eventDetailsStyles.disableBtnColor,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserratSemiBold,
                        CommonStyle.c_FFFFFF,
                        eventDetailsStyles.scanBtnText,
                      ]}
                    >
                      <svgImports.Scan />
                      {"  "}
                      Scan
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </>
      )}
    </View>
  );
};

export default EventDetails;
