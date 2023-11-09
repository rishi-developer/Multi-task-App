import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Badges from "../Badges/Badges";
import CommonStyle from "../../../styles/Global";
import EventApiService from "../../../services/api/EventApi/eventApiService";
import EventDropDown from "../EventDropDown/EventDropDown";
import EventFields from "../EventFields/EventFields";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import GuestApiService from "../../../services/api/GuestApi/guestApiServices";
import socket from "../../../services/socket";
import useColorScheme from "../../../hooks/useColorScheme";
import {
  errTypeObject,
  eventTypeObject,
  guestUserTypeObj,
} from "../../../../types";
import { eventFormStyles } from "./EventFormStyles";

const EventForm = ({ showForm, closeForm, isEdit, emailId, event }: any) => {
  let eventService = new EventApiService();
  let guestService = new GuestApiService();
  let {
    fetchGuestHandler,
    guestUser,
    setGuestUser,
    updateGuest,
    setIsLoading,
    isLoading,
  }: any = useContext(NeoContext);

  const [gemAdmin, setGemAdmin] = useState<string[]>([]);
  const [showBadge, setShowBadge] = useState<boolean>(false);
  const [eventState, setEventState] = useState<eventTypeObject>({
    eventName: "",
    eventDesc: "",
    eventCity: [],
    guestAdmin: [],
    guestName: [],
    adminType: [],
    startDate: "",
    endDate: "",
    eventType: "",
    startTime: "",
    endTime: "",
    location: "",
  });

  const [errState, setErrState] = useState<errTypeObject>({
    startDate: false,
    endDate: false,
    startTime: false,
    endTime: false,
    eventName: false,
    eventDesc: false,
    eventCity: false,
    eventType: false,
    eventTime: false,
  });
  const [minEndDate, setMinEndDate] = useState(new Date());
  const [dateTime, setDatetime] = useState("");
  const [showDDguest, setShowDDguest] = useState(false);
  const [showDatePicker, setDatePicker] = useState(false);
  const [showTimePicker, setTimePicker] = useState(false);
  const [showDropDown, setShowdd] = useState(false);
  const [showCityDrop, setShowCityDrop] = useState(false);
  const [showAdminDrop, setShowAdminDrop] = useState(false);
  const [showGemini, setShowGemini] = useState(false);
  const [showGuest, setShowGuest] = useState(false);
  const [Geminimail, setGeminiMail] = useState("");
  const [adminErr, setAdminErr] = useState(false);
  const [existErr, setExistErr] = useState(false);
  const colorScheme = useColorScheme();
  const events = ["Event", "Attendance", "Lunch"];
  const ourLocations = ["Bangalore", "Gurugram", "Panchkula"];
  const [adminTypes, setAdminTypes] = useState([
    {
      id: 0,
      name: "Gemini Admin",
      checked: false,
    },
    {
      id: 1,
      name: "Guest Admin",
      checked: false,
    },
  ]);
  const [city, setCity] = useState([
    {
      id: 0,
      name: "Bangalore",
      checked: false,
    },
    {
      id: 1,
      name: "Gurugram",
      checked: false,
    },
    {
      id: 2,
      name: "Panchkula",
      checked: false,
    },
  ]);
  let theme = colorScheme === "dark";

  useEffect(() => {
    if (isEdit == true) {
      setEventState({
        ["eventName"]: event[0].eventName,
        ["eventDesc"]: event[0].eventDesc,
        ["startDate"]: event[0].startDate,
        ["endDate"]: event[0].endDate,
        ["eventCity"]: event[0].eventCity,
        ["eventType"]: event[0].eventType,
        ["startTime"]: event[0].startTime,
        ["endTime"]: event[0].endTime,
        ["location"]: event[0].location,
        ["adminType"]: event[0].adminType,
        ["guestAdmin"]: event[0].guestAdmin,
        ["guestName"]: event[0].guestName,
      });

      setGemAdmin(event[0].geminiAdmin);
      if (event[0].geminiAdmin.length !== 0) {
        setShowBadge(true);
      }
      const data = city;
      data.forEach((curr_city) => {
        if (event[0].eventCity.includes(curr_city.name)) {
          data[curr_city.id].checked = !data[curr_city.id].checked;
        }
      });
      setCity([...data]);
      updateGuest(event[0].guestAdmin, event[0].eventId);
      const typedata = adminTypes;
      typedata.forEach((adType) => {
        if (event[0].adminType.includes(adType.name)) {
          adType.name === "Gemini Admin" && setShowGemini(true);
          adType.name === "Guest Admin" && setShowGuest(true);
          typedata[adType.id].checked = !typedata[adType.id].checked;
        }
      });
      setAdminTypes([...typedata]);
    } else {
      fetchGuestHandler();
    }
  }, []);

  const removeAdminHandler = (mail: string, isEdit: boolean) => {
    let state = gemAdmin;
    const index = state.findIndex((x: string) => x === mail);
    if (isEdit) {
      setGeminiMail(mail);
    }
    state.splice(index, 1);
    if (state.length === 0) {
      setShowBadge(false);
    }
    setGemAdmin([...state]);
  };
  const updateEvent = async () => {
    setIsLoading(true);
    let index = ourLocations.findIndex((x: string) =>
      eventState.location.split(",").includes(x)
    );
    let updateEvent = {
      eventName: eventState.eventName,
      eventDesc: eventState.eventDesc,
      venue:
        index > -1 || eventState.location.trim() == ""
          ? eventState.eventCity.join(", ")
          : eventState.location,
      city: eventState.eventCity,
      adminType: eventState.adminType,
      geminiAdmin: gemAdmin,
      guestAdmin: eventState.guestAdmin || [],
      guestName: eventState.guestName,
      startTime: eventState.startTime,
      endTime: eventState.endTime,
      startDate: eventState.startDate,
      endDate: eventState.endDate,
      createdBy: emailId,
      eventType: eventState.eventType,
      users: event[0].users,
    };
    eventService.updateEvent(updateEvent, event[0].eventId);

    guestUser.forEach(async (guest: guestUserTypeObj) => {
      if (guest.checked && !guest.events.includes(event[0].eventId)) {
        try {
          let newEventData = {
            events: [...guest.events, event[0].eventId],
          };
          guestService.updateGuestEvent(newEventData, guest.user_name);
        } catch (err: any) {
          console.log(err.message);
        }
      } else if (!guest.checked && guest.events.includes(event[0].eventId)) {
        const index = guest.events.indexOf(event[0].eventId);
        guest.events.splice(index, 1);
        try {
          let newEventData = {
            events: [...guest.events],
          };
          guestService.updateGuestEvent(newEventData, guest.user_name);
        } catch (err: any) {
          console.log(err.message);
        }
      }
    });
    socket.emit("add-event", true);
    closeForm();
    setIsLoading(false);
  };
  const addEvent = async () => {
    try {
      setIsLoading(true);
      let newEventData = {
        eventId: new Date().getTime(),
        eventName: eventState.eventName,
        eventDesc: eventState.eventDesc,
        venue:
          eventState.location.trim() == ""
            ? eventState.eventCity.join(", ")
            : eventState.location,
        city: eventState.eventCity,
        adminType: eventState.adminType,
        geminiAdmin: gemAdmin,
        guestAdmin: eventState.guestAdmin || [],
        guestName: eventState.guestName,
        startTime: eventState.startTime,
        endTime: eventState.endTime,
        startDate: eventState.startDate,
        endDate: eventState.endDate,
        createdBy: emailId,
        eventType: eventState.eventType,
        users: [],
      };
      eventService.addEvent(newEventData);
      socket.emit("add-event", true);
      closeForm();
      setIsLoading(false);
    } catch (err: any) {
      alert(err.message);
    }
  };
  const addGemAdHandler = async (mail: string) => {
    if (mail.trim() == "") {
      setAdminErr(true);
    } else {
      let state = gemAdmin;
      const index = state.findIndex((x: string) => x === mail);
      if (index === -1 || state.length === 0) {
        state.push(mail);
        setGemAdmin([...state]);
        setShowBadge(true);
        setExistErr(false);
        setAdminErr(false);
        setGeminiMail("");
      } else {
        setAdminErr(true);
        setExistErr(true);
      }
    }
  };

  const guestCheckHandler = async (username: string) => {
    const data = guestUser;
    const index = data.findIndex(
      (x: guestUserTypeObj) => x.user_name === username
    );
    data[index].checked = !data[index].checked;
    setGuestUser([...data]);
    let keys = data.map((gUser: guestUserTypeObj) => gUser.user_name);
    let name = data.map((gUser: guestUserTypeObj) => gUser.name);
    var checks = data.map((gUser: guestUserTypeObj) => gUser.checked);
    let selected = [];
    let selectedUser: string[] = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        selected.push(keys[i]);
        selectedUser.push(name[i]);
      }
    }

    setEventState({
      ...eventState,
      ["guestAdmin"]: [...selected],
      ["guestName"]: [...selectedUser],
    });
  };
  const adminCheckHandler = async (id: number) => {
    const data = adminTypes;
    const index = data.findIndex((x) => x.id === id);
    if (data[index].name === "Gemini Admin") {
      if (data[index].checked) {
        setShowGemini(false);
        setShowBadge(false);
      } else {
        setShowGemini(true);
        setShowBadge(true);
      }
    } else {
      if (data[index].checked) {
        setShowGuest(false);
        setShowDDguest(false);
      } else {
        setShowGuest(true);
      }
    }
    data[index].checked = !data[index].checked;

    setAdminTypes([...data]);
    let keys = adminTypes.map((adType) => adType.name);
    var checks = adminTypes.map((adType) => adType.checked);
    let selected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        selected.push(keys[i]);
      }
    }
    setEventState({ ...eventState, ["adminType"]: [...selected] });
  };

  const cityCheckHandler = async (id: number) => {
    const data = city;
    const index = data.findIndex((x) => x.id === id);
    data[index].checked = !data[index].checked;
    setCity([...data]);
    let keys = city.map((curr_city) => curr_city.name);
    var checks = city.map((curr_city) => curr_city.checked);
    let selected = [];
    for (let i = 0; i < checks.length; i++) {
      if (checks[i] == true) {
        selected.push(keys[i]);
      }
    }
    setEventState({ ...eventState, ["eventCity"]: [...selected] });
  };
  const selectEventDate = (text: string) => {
    if (
      text === "startDate" &&
      eventState.startTime.trim() == "" &&
      eventState.startDate.trim()
    ) {
      setTimePicker(true);
      setDatetime(text);
    } else if (
      text === "endDate" &&
      eventState.endTime.trim() == "" &&
      eventState.endDate.trim()
    ) {
      setTimePicker(true);
      setDatetime(text);
    } else {
      setDatePicker(true);
      setDatetime(text);
    }
  };
  const selectDate = async (date: Date) => {
    let data: string[] | string = date.toDateString().split(" ");
    data = `${data[1]}/${data[2]}/${data[3]}`;
    if (dateTime == "startDate") {
      setMinEndDate(date);
      await setEventState({ ...eventState, ["startDate"]: data });
    } else {
      await setEventState({ ...eventState, ["endDate"]: data });
    }
    setDatePicker(false);
    if (Platform.OS === "android") {
      setTimePicker(true);
    } else {
      setTimeout(() => {
        setTimePicker(true);
      }, 500);
    }
  };
  type sTime = string | string[];
  type sDate = string;
  const selectTime = (time: sTime) => {
    let formatedTime: sTime = time.toString().split(" ");
    formatedTime = formatedTime[4].slice(0, 5);
    if (dateTime == "startDate") {
      setEventState({ ...eventState, ["startTime"]: formatedTime });
    } else {
      setEventState({ ...eventState, ["endTime"]: formatedTime });
    }
    setDatePicker(false);
    setTimePicker(false);
  };

  const getDates = (eDate: sDate, eTime: sDate) => {
    let eventDate: Date = new Date(eDate.split("/").join("-"));
    eventDate.setHours(
      parseInt(eTime.split(":")[0]),
      parseInt(eTime.split(":")[1])
    );

    let eventDates = Date.parse(eventDate.toString());
    return [eventDates];
  };

  const onsubmit = () => {
    let newErrState = errState;
    let count = 0;
    let startDate = getDates(eventState.startDate, eventState.startTime);
    let endDate = getDates(eventState.endDate, eventState.endTime);
    if (eventState.endDate.trim() != "") {
      if (startDate > endDate) {
        newErrState.eventTime = true;
      } else {
        newErrState.eventTime = false;
        count += 1;
      }
    }

    if (eventState.eventCity.length === 0) {
      newErrState.eventCity = true;
    } else {
      count += 1;
      newErrState.eventCity = false;
    }
    for (let key in newErrState) {
      if (key !== "eventTime" && key !== "eventCity") {
        if (eventState[key as keyof typeof eventState].length === 0) {
          newErrState[key as keyof typeof errState] = true;
        } else {
          newErrState[key as keyof typeof errState] = false;
          count += 1;
        }
      }
    }
    setErrState({ ...newErrState });
    if (Object.keys(errState).length === count) {
      if (isEdit == false) {
        addEvent();
      } else {
        updateEvent();
      }
    }
  };
  const onChangeMailAccHandle = (value: string) => {
    setGeminiMail(value);
  };

  const onChangeHandler = (text: string, pointer: string) => {
    setEventState({ ...eventState, [pointer]: text });
    pointer !== "location" && setErrState({ ...errState, [pointer]: false });
    pointer === "eventType" && setShowdd(false);
  };
  const onChangeDrop = (pointer: string) => {
    if (pointer === "adminType") {
      setShowAdminDrop(!showAdminDrop);
      setShowCityDrop(false);
      setShowdd(false);
      setShowDDguest(false);
    } else if (pointer === "guestUser") {
      setShowDDguest(!showDDguest);
      setShowCityDrop(false);
      setShowdd(false);
      setShowAdminDrop(false);
    } else {
      if (pointer === "eventType") {
        setShowdd(!showDropDown);
        setShowCityDrop(false);
        setShowAdminDrop(false);
        setShowDDguest(false);
      } else if (pointer === "eventCity") {
        setShowCityDrop(!showCityDrop);
        setShowdd(false);
        setShowAdminDrop(false);
        setShowDDguest(false);
      }
      setErrState({
        ...errState,
        [pointer]: false,
      });
    }
  };
  const onCalendarChange = (pointer: string) => {
    pointer === "startDate"
      ? setErrState({
          ...errState,
          [pointer]: false,
        })
      : setErrState({
          ...errState,
          [pointer]: false,
          ["eventTime"]: false,
        });
  };
  const changeTimeDateHandler = (pt: string) => {
    if (pt === "date") {
      setDatePicker(false);
    } else {
      setTimePicker(false);
    }
  };
  const renderEventForm = () => {
    return (
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            setShowCityDrop(false);
            setShowdd(false);
            setShowAdminDrop(false);
            setShowDDguest(false);
          }}
        >
          <View
            style={[
              CommonStyle.flex1,
              CommonStyle.jc_flexEnd,
              CommonStyle.bg_00000099,
            ]}
          >
            <View
              style={[
                CommonStyle.w100,
                theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
              ]}
            >
              <View
                style={[
                  CommonStyle.w100,
                  CommonStyle.ai_center,
                  eventFormStyles.modal_headingCntr,
                  colorScheme == "dark"
                    ? eventFormStyles.darkBorder
                    : eventFormStyles.lightBorder,
                ]}
              >
                <View
                  style={[
                    eventFormStyles.modal_heading,
                    CommonStyle.flexDRow,
                    CommonStyle.h100,
                    CommonStyle.jc_spaceBTW,
                  ]}
                >
                  <Text
                    style={[
                      CommonStyle.montserratSemiBold,
                      CommonStyle.fs_15,
                      colorScheme == "dark"
                        ? CommonStyle.c_D1D0D0
                        : CommonStyle.c_black,
                    ]}
                  >
                    {isEdit == false ? "Add Event" : "Edit Event"}
                  </Text>
                  <TouchableOpacity
                    style={[
                      Platform.OS === "ios"
                        ? CommonStyle.jc_flexEnd
                        : CommonStyle.jc_center,
                      CommonStyle.ai_flexEnd,
                      eventFormStyles.closeIcon,
                    ]}
                    onPress={closeForm}
                  >
                    <AntDesign
                      name="close"
                      size={20}
                      color={colorScheme === "dark" ? "#D1D0D0" : "black"}
                      onPress={closeForm}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[eventFormStyles.modal_body, CommonStyle.as_center]}>
                <EventFields
                  title="Event Name"
                  type="text"
                  isMulti={false}
                  change={onChangeHandler}
                  pointer="eventName"
                  value={eventState.eventName}
                  errPoint={errState.eventName}
                  required={true}
                  hideInput={false}
                />
                {errState.eventName && (
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyle.montserrat, eventFormStyles.errText]}
                  >
                    This field is required
                  </Text>
                )}
                <View>
                  <EventFields
                    title="Event Type"
                    type="drop"
                    isChange={false}
                    errPoint={errState.eventType}
                    pointer="eventType"
                    value={eventState.eventType}
                    onDrop={onChangeDrop}
                    required="true"
                  />
                  {errState.eventType && (
                    <Text
                      allowFontScaling={false}
                      style={[CommonStyle.montserrat, eventFormStyles.errText]}
                    >
                      This field is required
                    </Text>
                  )}
                </View>
                {showDropDown && (
                  <>
                    <EventDropDown
                      data={events}
                      onTouch={onChangeHandler}
                      isMultiSelect={false}
                      type="drop"
                    />
                  </>
                ) }
                <EventFields
                  title="City"
                  type="drop"
                  errPoint={errState.eventCity}
                  pointer="eventCity"
                  required="true"
                  value={eventState?.eventCity.join(", ")}
                  onDrop={onChangeDrop}
                />
                {errState.eventCity && (
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyle.montserrat, eventFormStyles.errText]}
                  >
                    This field is required
                  </Text>
                )}
                {showCityDrop && (
                  <EventDropDown
                    data={city}
                    onaddItem={cityCheckHandler}
                    isMultiSelect={true}
                    type="drop"
                  />
                )}
                <EventFields
                  type="text"
                  isMulti={false}
                  title="Location"
                  change={onChangeHandler}
                  pointer="location"
                  value={eventState.location}
                  required={false}
                  hideInput={false}
                />

                <EventFields
                  title="Event Date and Timings"
                  required={true}
                  type="date"
                  selectEventDate={selectEventDate}
                  startDate={eventState.startDate}
                  startTime={eventState.startTime}
                  endDate={eventState.endDate}
                  endTime={eventState.endTime}
                  errStart={errState.startDate}
                  errEnd={errState.endDate}
                  errTime={errState.eventTime}
                  changeCalen={onCalendarChange}
                  showDatePicker={showDatePicker}
                  showTimePicker={showTimePicker}
                  dateTime={dateTime}
                  minEndDate={minEndDate}
                  onConfirmDate={selectDate}
                  onConfirmTime={selectTime}
                  onCancel={changeTimeDateHandler}
                />
                {errState.startDate ||
                errState.endDate ||
                errState.startTime ||
                errState.endTime ? (
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyle.montserrat, eventFormStyles.errText]}
                  >
                    This field is required
                  </Text>
                ) : (
                  errState.eventTime && (
                    <Text
                      allowFontScaling={false}
                      style={[CommonStyle.montserrat, eventFormStyles.errText]}
                    >
                      End time should be greater
                    </Text>
                  )
                )}
                <EventFields
                  type="text"
                  isMulti={true}
                  title="Event Description"
                  change={onChangeHandler}
                  pointer="eventDesc"
                  value={eventState.eventDesc}
                  errPoint={errState.eventDesc}
                  required={true}
                  hideInput={false}
                />
                {errState.eventDesc && (
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyle.montserrat, eventFormStyles.errText]}
                  >
                    This field is required
                  </Text>
                )}
                <EventFields
                  title="Admin Type"
                  type="drop"
                  pointer="adminType"
                  value={eventState.adminType.join(", ")}
                  onDrop={onChangeDrop}
                />
                {showAdminDrop && (
                  <EventDropDown
                    data={adminTypes}
                    onaddItem={adminCheckHandler}
                    isMultiSelect={true}
                    type="drop"
                  />
                )}

                <View>
                  {showGemini && (
                    <EventFields
                      type="adminText"
                      title="Gemini Admin"
                      adminErr={adminErr}
                      existErr={existErr}
                      showGuest={showGuest}
                      textVal={Geminimail}
                      changeVal={onChangeMailAccHandle}
                      addChange={addGemAdHandler}
                    />
                  )}

                  {gemAdmin.length !== 0 && showBadge && (
                    <Badges data={gemAdmin} onTouch={removeAdminHandler} />
                  )}

                  {showGuest && (
                    <EventFields
                      title="Guest Admin"
                      type="drop"
                      pointer="guestUser"
                      value={eventState.guestName.join(", ")}
                      onDrop={onChangeDrop}
                    />
                  )}
                  {showDDguest && (
                    <EventDropDown
                      data={guestUser}
                      onaddItem={guestCheckHandler}
                      isMultiSelect={true}
                      type="guest"
                    />
                  )}
                </View>
                <TouchableOpacity
                  onPress={onsubmit}
                  style={[
                    eventFormStyles.btnCntr,
                    CommonStyle.w100,
                    CommonStyle.jc_center,
                    CommonStyle.bg_007AFF,
                  ]}
                >
                  <Text allowFontScaling={false} style={eventFormStyles.btnTitle}>
                    {isEdit == false ? "Add Event" : "Edit Event"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    );
  };
  return (
    <>
      {isLoading ? (
        <Modal transparent>
          <ActivityIndicator
            size="large"
            color={"#666592"}
            style={eventFormStyles.indicator}
          />
        </Modal>
      ) : (
        <View
          style={[
            CommonStyle.flex1,
            CommonStyle.bg_FFFFFF,
            CommonStyle.ai_center,
          ]}
        >
          <Modal
            visible={showForm}
            transparent
            onRequestClose={() => closeForm()}
          >
            <>
              {Platform.OS === "android" && renderEventForm()}
              {Platform.OS === "ios" && (
                <KeyboardAvoidingView behavior="padding">
                  {renderEventForm()}
                </KeyboardAvoidingView>
              )}
            </>
          </Modal>
        </View>
      )}
    </>
  );
};

export default EventForm;
