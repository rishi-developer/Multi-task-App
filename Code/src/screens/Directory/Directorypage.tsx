import React, { useEffect, useState, useContext } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import CommonStyle from "../../styles/Global";
import { RootTabScreenProps } from "../../../types";
import SearchBar from "../../shared/SearchBar";
import { Text, View } from "../../shared/Themed";
import useDebounce from "../../shared/debounce";
import useColorScheme from "../../hooks/useColorScheme";
import Header from "../../shared/Header";
const { height } = Dimensions.get("screen");
import { NeoContext } from "../../NeoProvider/NeoProvider";
import { dummy_user_list } from "../../data/Dummy";
import { directoryPageStyles } from "./DirectorypageStyles";

export default function Directorypage({
  navigation,
}: RootTabScreenProps<"DirectoryPage">) {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  const [resultNotFound, setResultNotFound] = useState(false);
  const [transparentLoader, setTransparentLoader] = useState(false);
  const colorScheme = useColorScheme();
  let theme = colorScheme === "dark";
  const {
    getUsers,
    users,
    setLoadDirectory,
    loadDirectory,
    searchUsers,
    result,
    filteredData,
    setResult,
    directoryError,
    isDummyUser,
  }: any = useContext(NeoContext);
  const emptyDataArray = ["No Data Found/Pull to refresh...."];

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    fetchDirectory();
  }, []);

  let fetchDirectory = () => {
    setLoadDirectory(true);
    getUsers(currentPage, false);
    setCurrentPage(currentPage + 9);
  };

  useEffect(() => {
    if (debouncedSearchTerm.length > 0) {
      searchUsers(searchQuery);
    } else {
      searchUsers(searchQuery);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      handleOnClear();
    });
  }, [navigation]);

  const getUsersOnCLear = async () => {
    setLoadDirectory(true);
    getUsers(0, true);
    setCurrentPage(9);
  };

  const handleOnClear = async () => {
    await getUsersOnCLear();
    setSearchQuery("");
    setResultNotFound(false);
    setResult(true);
  };

  const handleChangeText = async (text: string) => {
    setSearchQuery(text);
    setResult(true);
    if (!text.trim()) {
      setSearchQuery("");
      searchUsers("");
    }
  };

  const renderLoader = () => {
    return loadDirectory && (
      <View
        style={[
          directoryPageStyles.renderLoader,
          theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
        ]}
      >
        <ActivityIndicator color={"#666592"} size={"large"} />
      </View>
    );
  };

  const loadMoreItem = async () => {
    if (currentPage > 10) {
      setLoadDirectory(true);
    }
    getUsers(currentPage, false);
    setCurrentPage(currentPage + 9);
  };

  const dialCall = (number: number) => {
    let phoneNumber =
      Platform.OS === "android" ? `tel:${number}` : `telprompt:${number}`;
    Linking.openURL(phoneNumber);
  };

  return (
    <>
      <View
        style={[
          CommonStyle.flex1,
          directoryPageStyles.container,
          colorScheme == "dark" ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
        ]}
      >
        <Header title="Employee Directory" type="BottomTab" />
        <View
          style={[
            CommonStyle.bg_FFFFFF,
            directoryPageStyles.searchBarView,
            theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
          ]}
        >
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <SearchBar
              value={searchQuery}
              onChangeText={handleChangeText}
              placeholder="Search a name"
              openInputModal={null}
              typeOf="normal"
              style={[
                CommonStyle.montserrat,
                directoryPageStyles.searchBar,
                CommonStyle.c_black,
                CommonStyle.fs_13,
                directoryPageStyles.placeholder1,
                theme
                  && [
                      CommonStyle.c_D1D0D0,
                      CommonStyle.bg_3C444E,
                      directoryPageStyles.darkSearchBar,
                    ]
                 
              ]}
              onClear={handleOnClear}
            />
          </TouchableWithoutFeedback>
        </View>
        {!result ? (
          <>
            <View
              style={[
                CommonStyle.dflex,
                CommonStyle.jc_center,
                CommonStyle.ai_center,
                CommonStyle.bg_FFFFFF,
                directoryPageStyles.results,
                theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
              ]}
            >
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserrat,
                  CommonStyle.c_747B84,
                  CommonStyle.fs_20,
                  directoryPageStyles.noresults,
                  theme ? CommonStyle.c_D1D0D0 : CommonStyle.bg_FFFFFF,
                ]}
              >
                No results found
              </Text>
            </View>
          </>
        ) : (
          <>
            {!resultNotFound && searchQuery.length > 0 ? (
              <View
                style={[
                  directoryPageStyles.dataview,
                  theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
                ]}
              >
                <FlatList
                  style={[
                    CommonStyle.bg_FFFFFF,
                    directoryPageStyles.dataflatlist,
                    theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
                  ]}
                  keyExtractor={(item) => item.emp_id}
                  contentContainerStyle={{ paddingBottom: 30 }}
                  data={filteredData}
                  renderItem={({ item }) => (
                    <View
                      style={[
                        CommonStyle.ai_center,
                        CommonStyle.as_center,
                        colorScheme === "dark"
                          ? CommonStyle.bg_1B1F23
                          : CommonStyle.bg_FFFFFF,
                        directoryPageStyles.employeedetailsview,
                      ]}
                    >
                      <View
                        style={[
                          CommonStyle.flexDRow,
                          CommonStyle.ai_center,
                          CommonStyle.bg_FFFFFF,
                          directoryPageStyles.employeedetails,
                          theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
                        ]}
                      >
                        <View
                          style={[
                            CommonStyle.dflex,
                            CommonStyle.bg_FFFFFF,
                            directoryPageStyles.userimageview,
                            theme
                              ? CommonStyle.bg_1B1F23
                              : CommonStyle.bg_FFFFFF,
                          ]}
                        >
                          <View
                            style={[
                              CommonStyle.flexDRow,
                              CommonStyle.jc_center,
                              CommonStyle.ai_center,
                              directoryPageStyles.circle,
                            ]}
                          >
                            {item.name.includes("@") ? (
                              <>
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    CommonStyle.montserratBold,
                                    CommonStyle.dflex,
                                    CommonStyle.c_007AFF,
                                    CommonStyle.ta_center,
                                    CommonStyle.fs_15,
                                    directoryPageStyles.circleData,
                                  ]}
                                >
                                  {item.name.split(" ")[0][0].toUpperCase()}
                                </Text>
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    CommonStyle.montserratBold,
                                    CommonStyle.dflex,
                                    CommonStyle.c_007AFF,
                                    CommonStyle.ta_center,
                                    CommonStyle.fs_15,
                                    directoryPageStyles.circleData,
                                  ]}
                                >
                                  {item.name.split(" ")[1] != undefined
                                    ? item.name.split(" ")[1][0].toUpperCase()
                                    : ""}
                                </Text>
                              </>
                            ) : (
                              <>
                                {item.name.split(" ").length > 1 ? (
                                  <>
                                    <Text
                                      allowFontScaling={false}
                                      style={[
                                        CommonStyle.montserratBold,
                                        CommonStyle.dflex,
                                        CommonStyle.c_007AFF,
                                        CommonStyle.ta_center,
                                        CommonStyle.fs_15,
                                        directoryPageStyles.circleData,
                                      ]}
                                    >
                                      {item.name.split(" ")[0][0].toUpperCase()}
                                    </Text>
                                    <Text
                                      allowFontScaling={false}
                                      style={[
                                        CommonStyle.montserratBold,
                                        CommonStyle.dflex,
                                        CommonStyle.c_007AFF,
                                        CommonStyle.ta_center,
                                        CommonStyle.fs_15,
                                        directoryPageStyles.circleData,
                                      ]}
                                    >
                                      {item.name.split(" ")[1] != undefined
                                        ? item.name
                                            .split(" ")[1][0]
                                            .toUpperCase()
                                        : ""}
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    <Text
                                      allowFontScaling={false}
                                      style={[
                                        CommonStyle.montserratBold,
                                        CommonStyle.dflex,
                                        CommonStyle.c_007AFF,
                                        CommonStyle.ta_center,
                                        CommonStyle.fs_15,
                                        directoryPageStyles.circleData,
                                      ]}
                                    >
                                      {item.name.split(".")[0][0].toUpperCase()}
                                    </Text>
                                    <Text
                                      allowFontScaling={false}
                                      style={[
                                        CommonStyle.montserratBold,
                                        CommonStyle.dflex,
                                        CommonStyle.c_007AFF,
                                        CommonStyle.ta_center,
                                        CommonStyle.fs_15,
                                        directoryPageStyles.circleData,
                                      ]}
                                    >
                                      {item.name.split(".")[1] != undefined
                                        ? item.name
                                            .split(".")[1][0]
                                            .toUpperCase()
                                        : ""}
                                    </Text>
                                  </>
                                )}
                              </>
                            )}
                          </View>
                        </View>
                        <View
                          style={[
                            CommonStyle.dflex,
                            directoryPageStyles.employeedataview,
                            theme
                              ? CommonStyle.bg_1B1F23
                              : CommonStyle.bg_FFFFFF,
                          ]}
                        >
                          <View
                            style={[
                              CommonStyle.flexDCol,
                              CommonStyle.as_FStart,
                              CommonStyle.jc_center,
                              CommonStyle.bg_FFFFFF,
                              theme
                                ? CommonStyle.bg_1B1F23
                                : CommonStyle.bg_FFFFFF,
                            ]}
                          >
                            <Text
                              allowFontScaling={false}
                              style={[
                                CommonStyle.montserratBold,
                                CommonStyle.c_000000,
                                CommonStyle.fs_15,
                                directoryPageStyles.name,
                                theme
                                  ? CommonStyle.c_D1D0D0
                                  : CommonStyle.bg_FFFFFF,
                              ]}
                            >
                              {item.name.split(" ").length <= 3
                                ? item.name
                                : item.name.split(" ")[0] +
                                  " " +
                                  item.name.split(" ")[1] +
                                  " " +
                                  item.name.split(" ")[2]}
                            </Text>
                            <Text
                              allowFontScaling={false}
                              style={[
                                CommonStyle.montserratBold,
                                CommonStyle.fs_12,
                                CommonStyle.c_979797,
                              ]}
                            >
                              {item.designation.length < 30
                                ? item.designation
                                : item.designation.substring(0, 35) + "..."}
                            </Text>
                          </View>
                        </View>
                        <View
                          style={[
                            CommonStyle.ai_center,
                            CommonStyle.dflex,
                            CommonStyle.jc_center,
                            CommonStyle.bg_FFFFFF,
                            directoryPageStyles.call,
                            theme
                              ? CommonStyle.bg_1B1F23
                              : CommonStyle.bg_FFFFFF,
                          ]}
                        >
                          <TouchableOpacity
                            style={CommonStyle.ai_center}
                            onPress={() =>
                              dialCall(
                                item.mobilePhone != null
                                  ? item.mobilePhone
                                  : item.mobile_number
                              )
                            }
                          >
                            <Image
                              style={directoryPageStyles.callimage}
                              source={require("../../../assets/images/call.png")}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            ) : (
              <>
                <View
                  style={[
                    CommonStyle.w100,
                    CommonStyle.bg_FFFFFF,
                    directoryPageStyles.dataview,
                    theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF,
                  ]}
                >
                  {transparentLoader && Platform.OS == "android" && (
                    <ActivityIndicator color={"#666592"} size={"large"} />
                  )}
                  {isDummyUser || users.length >= 1 ? (
                    <FlatList
                      data={isDummyUser ? dummy_user_list : users}
                      style={{ marginBottom: 30 }}
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
                            await getUsers(0, true)
                              .then(() => {
                                setCurrentPage(9);
                                setTransparentLoader(false);
                              })
                              .catch(() => {
                                setTransparentLoader(false);
                              });
                          }}
                          colors={["#498BEA"]}
                        />
                      }
                      keyExtractor={(item) => item.emp_id}
                      ListFooterComponent={renderLoader}
                      onEndReached={!isDummyUser && loadMoreItem}
                      onEndReachedThreshold={0.5}
                      renderItem={({ item }) => (
                        <View
                          style={[
                            CommonStyle.ai_center,
                            CommonStyle.as_center,
                            colorScheme === "dark"
                              ? CommonStyle.bg_1B1F23
                              : CommonStyle.bg_FFFFFF,
                            directoryPageStyles.employeedetailsview,
                            theme
                              ? CommonStyle.bg_1B1F23
                              : CommonStyle.bg_FFFFFF,
                          ]}
                        >
                          <View
                            style={[
                              CommonStyle.flexDRow,
                              CommonStyle.ai_center,
                              CommonStyle.bg_FFFFFF,
                              directoryPageStyles.employeedetails,
                              theme
                                ? CommonStyle.bg_1B1F23
                                : CommonStyle.bg_FFFFFF,
                            ]}
                          >
                            <View
                              style={[
                                CommonStyle.dflex,
                                CommonStyle.bg_FFFFFF,
                                directoryPageStyles.userimageview,
                                theme
                                  ? CommonStyle.bg_1B1F23
                                  : CommonStyle.bg_FFFFFF,
                              ]}
                            >
                              <View
                                style={[
                                  CommonStyle.flexDRow,
                                  CommonStyle.jc_center,
                                  CommonStyle.ai_center,
                                  directoryPageStyles.circle,
                                ]}
                              >
                                {item.name.includes("@") ? (
                                  <>
                                    <Text
                                      allowFontScaling={false}
                                      style={[
                                        CommonStyle.montserratBold,
                                        CommonStyle.dflex,
                                        CommonStyle.c_007AFF,
                                        CommonStyle.ta_center,
                                        CommonStyle.fs_15,
                                        directoryPageStyles.circleData,
                                      ]}
                                    >
                                      {item.name.split(" ")[0][0].toUpperCase()}
                                    </Text>
                                    <Text
                                      allowFontScaling={false}
                                      style={[
                                        CommonStyle.montserratBold,
                                        CommonStyle.dflex,
                                        CommonStyle.c_007AFF,
                                        CommonStyle.ta_center,
                                        CommonStyle.fs_15,
                                        directoryPageStyles.circleData,
                                      ]}
                                    >
                                      {item.name.split(" ")[1] != undefined
                                        ? item.name
                                            .split(" ")[1][0]
                                            .toUpperCase()
                                        : ""}
                                    </Text>
                                  </>
                                ) : (
                                  <>
                                    {item.name.split(" ").length > 1 ? (
                                      <>
                                        <Text
                                          allowFontScaling={false}
                                          style={[
                                            CommonStyle.montserratBold,
                                            CommonStyle.dflex,
                                            CommonStyle.c_007AFF,
                                            CommonStyle.ta_center,
                                            CommonStyle.fs_15,
                                            directoryPageStyles.circleData,
                                          ]}
                                        >
                                          {item.name
                                            .split(" ")[0][0]
                                            .toUpperCase()}
                                        </Text>
                                        <Text
                                          allowFontScaling={false}
                                          style={[
                                            CommonStyle.montserratBold,
                                            CommonStyle.dflex,
                                            CommonStyle.c_007AFF,
                                            CommonStyle.ta_center,
                                            CommonStyle.fs_15,
                                            directoryPageStyles.circleData,
                                          ]}
                                        >
                                          {item.name.split(" ")[1] != undefined
                                            ? item.name
                                                .split(" ")[1][0]
                                                .toUpperCase()
                                            : ""}
                                        </Text>
                                      </>
                                    ) : (
                                      <>
                                        <Text
                                          allowFontScaling={false}
                                          style={[
                                            CommonStyle.montserratBold,
                                            CommonStyle.dflex,
                                            CommonStyle.c_007AFF,
                                            CommonStyle.ta_center,
                                            CommonStyle.fs_15,
                                            directoryPageStyles.circleData,
                                          ]}
                                        >
                                          {item.name
                                            .split(".")[0][0]
                                            .toUpperCase()}
                                        </Text>
                                        <Text
                                          allowFontScaling={false}
                                          style={[
                                            CommonStyle.montserratBold,
                                            CommonStyle.dflex,
                                            CommonStyle.c_007AFF,
                                            CommonStyle.ta_center,
                                            CommonStyle.fs_15,
                                            directoryPageStyles.circleData,
                                          ]}
                                        >
                                          {item.name.split(".")[1] != undefined
                                            ? item.name
                                                .split(".")[1][0]
                                                .toUpperCase()
                                            : ""}
                                        </Text>
                                      </>
                                    )}
                                  </>
                                )}
                              </View>
                            </View>
                            <View
                              style={[
                                CommonStyle.dflex,
                                directoryPageStyles.employeedataview,
                                theme
                                  ? CommonStyle.bg_1B1F23
                                  : CommonStyle.bg_FFFFFF,
                              ]}
                            >
                              <View
                                style={[
                                  CommonStyle.flexDCol,
                                  CommonStyle.as_FStart,
                                  CommonStyle.jc_center,
                                  CommonStyle.bg_FFFFFF,
                                  theme
                                    ? CommonStyle.bg_1B1F23
                                    : CommonStyle.bg_FFFFFF,
                                ]}
                              >
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    CommonStyle.montserratBold,
                                    CommonStyle.c_000000,
                                    CommonStyle.fs_15,
                                    directoryPageStyles.name,
                                    theme
                                      ? CommonStyle.c_D1D0D0
                                      : CommonStyle.bg_FFFFFF,
                                  ]}
                                >
                                  {item.name.split(" ").length <= 3
                                    ? item.name
                                    : item.name.split(" ")[0] +
                                      " " +
                                      item.name.split(" ")[1] +
                                      " " +
                                      item.name.split(" ")[2]}
                                </Text>
                                <Text
                                  allowFontScaling={false}
                                  style={[
                                    CommonStyle.montserratBold,
                                    CommonStyle.fs_12,
                                    CommonStyle.c_979797,
                                  ]}
                                >
                                  {item.designation.length < 30
                                    ? item.designation
                                    : item.designation.substring(0, 35) + "..."}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={[
                                CommonStyle.ai_center,
                                CommonStyle.dflex,
                                CommonStyle.jc_center,
                                CommonStyle.bg_FFFFFF,
                                directoryPageStyles.call,
                                theme
                                  ? CommonStyle.bg_1B1F23
                                  : CommonStyle.bg_FFFFFF,
                              ]}
                            >
                              <TouchableOpacity
                                style={CommonStyle.ai_center}
                                onPress={() =>
                                  dialCall(
                                    item.mobilePhone != null
                                      ? item.mobilePhone
                                      : item.mobile_number
                                  )
                                }
                              >
                                <Image
                                  style={directoryPageStyles.callimage}
                                  source={require("../../../assets/images/call.png")}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )}
                    />
                  ) : !directoryError ? (
                    <View
                      style={[
                        CommonStyle.h100,
                        CommonStyle.w100,
                        CommonStyle.jc_center,
                        CommonStyle.ai_center,
                        colorScheme === "dark"
                          ? CommonStyle.bg_1B1F23
                          : CommonStyle.bg_FFFFFF,
                      ]}
                    >
                      <ActivityIndicator color={"#666592"} size={"large"} />
                    </View>
                  ) : (
                    <View
                      style={[
                        CommonStyle.h100,
                        CommonStyle.w100,
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
                              setTransparentLoader(true);
                              setLoadDirectory(true);
                              getUsers(0, true)
                                .then(() => {
                                  setCurrentPage(9);
                                  setTransparentLoader(false);
                                })
                                .catch(() => {
                                  setTransparentLoader(false);
                                });
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
                                directoryPageStyles.netWorkIssueText,
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
                </View>
              </>
            )}
          </>
        )}
      </View>
    </>
  );
}


