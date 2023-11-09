import React, { useState, useEffect, useContext } from "react";
import {
  Text,
  View,
  Modal,
  BackHandler,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { scannerStyles } from "./ScannerStyles";
import { BarCodeScanner } from "expo-barcode-scanner";
import { FontAwesome } from "@expo/vector-icons";
import CommonStyle from "../../styles/Global";
import EventApiService from "../../services/api/EventApi/eventApiService";
import { svgImports } from "../../data/Imports";
import useColorScheme from "../../hooks/useColorScheme";
import UserDetailApiService from "../../services/api/UserApi/userApiServices";
import { NeoContext } from "../../NeoProvider/NeoProvider";

const Scanner = ({ navigation, route }: any) => {
  let { isAdmin }: any = useContext(NeoContext);
  const colorScheme = useColorScheme();
  let theme = colorScheme === "dark";
  const [scanned, setScanned] = useState(false);
  const [QRTimeFinished, setQrTimeFinsished] = useState(false);
  const [currentAttendee, setCurrentAttendee] = useState({
    empName: "",
    emp_id: "",
  });
  const [errorMsg, setErrorMsg] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [empName, setEmpName] = useState({ name: "" });
  const [existingUser, setExistingUser] = useState(false);
  const [invalidQR, setInvalidQR] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState(false);
  const [validUser, setvalidUser] = useState(true);
  const [filer, setFilter] = useState("Code");
  const UserApi = new UserDetailApiService();
  const EventApi = new EventApiService();
  useEffect(() => {
    const admin = isAdmin;
    const backbuttonHander = () => {
      navigation.navigate("EventDetails", { eventId: route.params.id });
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    if (Platform.OS === "ios") {
      navigation.addListener("beforeRemove", (e: any) => {
        if (e.data.action.type === "NAVIGATE") {
          return;
        }
        e.preventDefault();
        navigation.navigate("EventDetails", { eventId: route.params.id });
      });
    }
  }, [navigation]);

  useEffect(() => {
    if (invalidQR) {
      setTimeout(() => {
        setInvalidQR(false);
        setShowForm(false);
        setScanned(false);
      }, 3000);
    } else if (status) {
      setTimeout(() => {
        setQrTimeFinsished(false);
        setExistingUser(false);
        setShowForm(false);
        setScanned(false);
        setStatus(false);
      }, 3000);
    }
  }, [status, invalidQR]);

  const closeForm = () => {
    setShowForm(false);
  };
  const formatName = (text: string) => {
    setvalidUser(true);
    setErrorMsg(false);
    setEmpName({ name: text.toUpperCase() });
  };

  function isJsonString(str: string) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  const addUsers = async (event: string, id: string, user: any) => {
    if (isJsonString(user.data)) {
      setInvalidQR(false);
      let newUser = JSON.parse(user.data);
      let dateTime = newUser.dateTime;
      setCurrentAttendee({
        ["empName"]: newUser.userName,
        ["emp_id"]: newUser.email.split("@")[0],
      });
      if (Date.now() - dateTime < 30000) {
        setQrTimeFinsished(false);
        EventApi.updateEventsUser(route.params.id, newUser.email)
          .then((res) => {
            if (
              res.data.status == "failed" &&
              res.data.message == "Duplicate Data"
            ) {
              setExistingUser(true);
              setShowForm(true);
              setStatus(true);
            } else {
              setExistingUser(false);
              setShowForm(true);
              setStatus(true);
            }
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        setShowForm(true);
        setQrTimeFinsished(true);
        setStatus(true);
      }
    } else {
      setInvalidQR(true);
      setShowForm(true);
    }
  };
  const qrScannedHandler = (data: any) => {
    setScanned(true);
    let { event, id } = route.params;
    addUsers(event, id, data);
  };
  const addManualEntry = async () => {
    if (
      (filer == "Username" && employeeId == "") ||
      (filer == "Code" && empName.name == "")
    ) {
      setErrorMsg(true);
    } else if (filer == "Code") {
      UserApi.getUserDetailsByEmpId(empName.name)
        .then((res) => {
          if (res.data.status == "failed") {
            setvalidUser(false);
          } else {
            setCurrentAttendee({
              ["empName"]: res.data.data[0].name,
              ["emp_id"]: res.data.data[0].empId,
            });

            EventApi.updateEventsUser(
              route.params.id,
              res.data.data[0].emailId.toLowerCase()
            )
              .then((res) => {
                if (
                  res.data.status == "failed" &&
                  res.data.message == "Duplicate Data"
                ) {
                  setExistingUser(true);
                  setShowForm(true);
                  setStatus(true);
                } else {
                  setExistingUser(false);
                  setShowForm(true);
                  setStatus(true);
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      UserApi.getUserDetailsByEmail(
        `${employeeId}`.toLowerCase() + "@geminisolutions.com"
      )
        .then((res) => {
          if (res.data.status == "failed") {
            setvalidUser(false);
          } else {
            setCurrentAttendee({
              ["empName"]: res.data.data[0].name,
              ["emp_id"]: res.data.data[0].empId,
            });
            let data =
              employeeId.toLowerCase().toString() + "@geminisolutions.com";
            EventApi.updateEventsUser(route.params.id, data)
              .then((res) => {
                if (
                  res.data.status == "failed" &&
                  res.data.message == "Duplicate Data"
                ) {
                  setExistingUser(true);
                  setShowForm(true);
                  setStatus(true);
                } else {
                  setExistingUser(false);
                  setShowForm(true);
                  setStatus(true);
                }
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };
  const renderScreen = () => {
    return (
      <View
        style={[
          CommonStyle.flex1,
          CommonStyle.bg_FFFFFF,
          CommonStyle.ai_center,
          CommonStyle.jc_center,
          scannerStyles.container,
          theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
        ]}
      >
        {Platform.OS === "ios" && (
          <TouchableOpacity
            style={[scannerStyles.backBtn, CommonStyle.pAbsolute]}
            onPress={() =>
              navigation.navigate("EventDetails", { eventId: route.params.id })
            }
          >
            <FontAwesome
              name="arrow-left"
              style={[
                scannerStyles.leftArrow,
                (CommonStyle.bg_1B1F23, CommonStyle.c_FFFFFF),
              ]}
            ></FontAwesome>
          </TouchableOpacity>
        )}
        <View style={scannerStyles.content}>
          <View
            style={[
              scannerStyles.barcodebox,
              CommonStyle.ai_center,
              CommonStyle.jc_center,
            ]}
          >
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : qrScannedHandler}
              style={scannerStyles.scanner}
            />
          </View>

        </View>
        <View style={scannerStyles.scannerBox}>
          <View style={scannerStyles.scannerTopLeft}></View>
          <View style={scannerStyles.scannerTopRight}></View>
          <View style={scannerStyles.scannerBottomLeft}></View>
          <View style={scannerStyles.scannerBottomRight}></View>
        </View>

        <Modal
          visible={showForm}
          transparent
          onRequestClose={() => closeForm()}
        >
          <View
            style={[
              scannerStyles.centered_view,
              CommonStyle.flex1,
              CommonStyle.jc_flexStart,
              CommonStyle.bg_00000099,
            ]}
          >
            <View
              style={[
                CommonStyle.w100,
                CommonStyle.ai_center,
                scannerStyles.warning_modal,
                theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
              ]}
            >
              <View
                style={[
                  scannerStyles.modal_body,
                  CommonStyle.as_center,
                  CommonStyle.flexDRow,
                  CommonStyle.jc_spaceBTW,
                ]}
              >
                <View>
                  {!invalidQR ? (
                    <>
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserratSemiBold,
                          scannerStyles.attendeeName,
                          theme ? CommonStyle.c_D1D0D0 : scannerStyles.lightThemeText,
                        ]}
                      >
                        {currentAttendee.empName}
                      </Text>
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserrat,
                          scannerStyles.empCode,
                          theme ? CommonStyle.c_D1D0D0 : scannerStyles.lightThemeText,
                        ]}
                      >
                        Employee Code: {currentAttendee.emp_id}
                      </Text>
                      {!existingUser && !QRTimeFinished && (
                        <Text
                          allowFontScaling={false}
                          style={[scannerStyles.successText, CommonStyle.montserrat]}
                        >
                          Checked in Successfully!
                        </Text>
                      )}

                      {QRTimeFinished && (
                        <Text
                          allowFontScaling={false}
                          style={scannerStyles.existingText}
                        >
                          QR Expired
                        </Text>
                      )}

                      {existingUser && (
                        <Text
                          allowFontScaling={false}
                          style={[scannerStyles.existingText, CommonStyle.montserrat]}
                        >
                          Already checked in !
                        </Text>
                      )}
                    </>
                  ) : (
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        scannerStyles.attendeeName,
                        theme ? CommonStyle.c_D1D0D0 : scannerStyles.lightThemeText,
                      ]}
                    >
                      Invalid QR
                    </Text>
                  )}
                </View>
                <View
                  style={[
                    CommonStyle.ai_center,
                    CommonStyle.jc_center,
                    scannerStyles.modelBanner,
                    !existingUser && !invalidQR && !QRTimeFinished
                      ? { backgroundColor: "#D7F9D8B2" }
                      : {
                          backgroundColor: "#FEDBE099",
                        },
                  ]}
                >
                  {!existingUser && !invalidQR && !QRTimeFinished ? (
                    <svgImports.ScanSuccess size={29} />
                  ) : (
                    <svgImports.ScanWarning size={29} />
                  )}
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  return (
    <>
      {Platform.OS === "android" && renderScreen()}
      {Platform.OS === "ios" && (
        <KeyboardAvoidingView behavior="padding">
          <ScrollView>{renderScreen()}</ScrollView>
        </KeyboardAvoidingView>
      )}
    </>
  );
};

export default Scanner;
