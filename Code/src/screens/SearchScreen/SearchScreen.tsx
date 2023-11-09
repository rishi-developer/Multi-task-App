import React, { useState, useEffect, useContext } from "react";
import {
  BackHandler,
  Linking,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { searchScreenStyles } from "./SearchScreenStyles";
import * as SecureStore from "expo-secure-store";
import CommonStyle from "../../styles/Global";
import Header from "../../shared/Header";
import { NeoContext } from "../../NeoProvider/NeoProvider";
import { AppDataObject, RootTabScreenProps } from "../../../types";
import SearchBar from "../../shared/SearchBar";
import { Text, View } from "../../shared/Themed";
import useColorScheme from "../../hooks/useColorScheme";
import useDebounce from "../../shared/debounce";

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<"SearchScreen">) {
  let { appData }: any = useContext(NeoContext);
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedData, setSearchData] = useState<AppDataObject[]>([]);
  const [resultFound, setResultFound] = useState(false);
  const [history, setHistory]: any = useState([]);
  const [showhistory, setShowHistory] = useState(false);
  const debouncedSearchTerm = useDebounce(searchQuery, 500);
  useEffect(() => {
    const backbuttonHander = () => {
      navigation.navigate("Home");
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);
  });

  useEffect(() => {
    if (searchQuery.length == 0) {
      setShowHistory(true);
    } else {
      setShowHistory(false);
    }
    if (debouncedSearchTerm) {
      setResultFound(true);
      filterData();
    } else {
      setSearchData([]);
      setResultFound(false);
    }
  }, [debouncedSearchTerm]);
  const findHistory = async () => {
    const data = await SecureStore.getItemAsync("history");
    if (data !== null) {
      setHistory(JSON.parse(data));
    }
  };
  useEffect(() => {
    findHistory();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      onClear();
    });
  }, [navigation]);
  const handleChangeText = async (text: string) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
    }
  };
  const onClear = async () => {
    setShowHistory(false);
    setSearchQuery("");
    setSearchData([]);
    setResultFound(false);
  };
  const handleHistory = async (name: string, url: string) => {
    let his = { name: name, url: url };
    let filteredHistory = history.filter((e: { name: string; url: string }) => {
      return e.name.toLowerCase() != his.name.toLowerCase();
    });
    filteredHistory.unshift(his);
    if (history.length > 5) {
      history.splice(5);
    }
    await setHistory(filteredHistory);
    await SecureStore.setItemAsync("history", JSON.stringify(filteredHistory));
  };
  const filterData = async () => {
    let filterRes = await appData.filter((result: AppDataObject) => {
      if (result.keyword == true) {
        for (let i = 0; i < result.keywords.length; i++) {
          if (searchQuery.length < 2) {
            if (
              searchQuery.toLowerCase() ==
              result.keywords[i].toLowerCase().trim()
            ) {
              return result;
            }
          } else {
            if (
              result.keywords[i]
                .trim()
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            ) {
              return result;
            }
          }
        }
      }
    });
    if (filterRes.length) {
      await setSearchData([...filterRes]);
    }
    setResultFound(true);
  };
  const onfocus = () => {
    setShowHistory(true);
  };
  return (
    <ScrollView>
      <View
        style={[
          CommonStyle.flex1,
          searchScreenStyles.container,
          colorScheme === "dark"
            ? CommonStyle.bg_1B1F23
            : CommonStyle.bg_FFFFFF,
        ]}
      >
        <Header title="Search" type="BottomTab" />
        <SearchBar
          value={searchQuery}
          onChangeText={handleChangeText}
          placeholder="Try typing Mis, Accounts..."
          onClear={onClear}
          onfocus={onfocus}
          openInputModal={null}
          typeOf="normal"
        />
        {showhistory && (
          <>
            {history.map((his: AppDataObject) => (
              <View
                style={[
                  CommonStyle.as_center,
                  CommonStyle.jc_center,
                  searchScreenStyles.showhistory,
                  colorScheme === "dark"
                    ? [CommonStyle.bg_3C444E, searchScreenStyles.darkThemeShowHistory]
                    : searchScreenStyles.lightThemeShowHistory,
                ]}
                key={his.name.toString()}
              >
                <TouchableOpacity
                  onPress={async () => {
                    if (
                      his.name == "Teams" ||
                      his.name == "Microsoft Teams" ||
                      his.name == "Authenticator" ||
                      his.name == "Asana" ||
                      his.name == "Microsoft Outlook" ||
                      his.name == "Trello" ||
                      his.name == "Webex" ||
                      his.name == "Zoom"
                    ) {
                      Linking.openURL(his.url).catch((err) =>
                        Linking.openURL(
                          `http://play.google.com/store/apps/details?id=${his.url}`
                        ).catch((err) =>
                          console.error("An error occurred", err)
                        )
                      );
                    } else {
                      navigation.navigate(
                        "Web" as never,
                        {
                          url: `${his.url}`,
                          name: `${his.name}`,
                        } as never
                      );
                    }
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyle.montserrat,
                      searchScreenStyles.name,
                      colorScheme === "dark"
                        ? CommonStyle.c_D1D0D0
                        : CommonStyle.c_007AFF,
                    ]}
                  >
                    {his.name}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}
        <View
          style={
            colorScheme === "dark"
              ? CommonStyle.bg_1B1F23
              : CommonStyle.bg_FFFFFF
          }
        >
          {searchedData.length > 0 ? (
            <>
              {searchedData.map((res: AppDataObject) => {
                return (
                  <View
                    key={res.name.toString()}
                    style={[
                      CommonStyle.as_center,
                      CommonStyle.jc_center,
                      searchScreenStyles.showhistory,
                      colorScheme === "dark"
                        ? [CommonStyle.bg_3C444E, searchScreenStyles.darkThemeShowHistory]
                        : searchScreenStyles.lightThemeShowHistory,
                    ]}
                  >
                    <TouchableOpacity
                      onPress={async () => {
                        handleHistory(res.name, res.url);
                        if (
                          res.name == "Teams" ||
                          res.name == "Microsoft Teams" ||
                          res.name == "Authenticator" ||
                          res.name == "Asana" ||
                          res.name == "Microsoft Outlook" ||
                          res.name == "Trello" ||
                          res.name == "Webex" ||
                          res.name == "Zoom"
                        ) {
                          Linking.openURL(res.url).catch((err) =>
                            Linking.openURL(
                              `http://play.google.com/store/apps/details?id=${res.url}`
                            ).catch((err) =>
                              console.error("An error occurred", err)
                            )
                          );
                        } else {
                          navigation.navigate(
                            res.webview as never,
                            {
                              url: `${res.url}`,
                              name: `${res.name}`,
                            } as never
                          );
                        }
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={[
                          CommonStyle.montserrat,
                          searchScreenStyles.name,
                          colorScheme === "dark"
                            ? CommonStyle.c_D1D0D0
                            : CommonStyle.c_007AFF,
                        ]}
                      >
                        {res.name}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </>
          ) : (
            <>
              {resultFound ? (
                <>
                  <View
                    style={[
                      CommonStyle.jc_center,
                      searchScreenStyles.resultsview,
                      colorScheme === "dark"
                        ? CommonStyle.bg_1B1F23
                        : CommonStyle.bg_FFFFFF,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.as_center,
                        CommonStyle.fs_20,
                        CommonStyle.montserrat,
                        colorScheme === "dark"
                          ? CommonStyle.c_D1D0D0
                          : CommonStyle.c_747B84,
                      ]}
                    >
                      Try with different keyword
                    </Text>
                  </View>
                </>
              ) : (
                <></>
              )}
              {searchQuery.length == 0 && (
                <>
                  <View
                    style={[
                      CommonStyle.as_center,
                      CommonStyle.jc_center,
                      searchScreenStyles.text,
                      colorScheme === "dark"
                        ? CommonStyle.bg_1B1F23
                        : CommonStyle.bg_FFFFFF,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.as_center,
                        CommonStyle.fs_20,
                        CommonStyle.montserrat,
                        colorScheme === "dark"
                          ? CommonStyle.c_D1D0D0
                          : CommonStyle.c_747B84,
                      ]}
                    >
                      Type the keywords to
                    </Text>
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.as_center,
                        CommonStyle.fs_20,
                        CommonStyle.montserrat,
                        colorScheme === "dark"
                          ? CommonStyle.c_D1D0D0
                          : CommonStyle.c_747B84,
                      ]}
                    >
                      search the platform
                    </Text>
                    {history.length > 0 && (
                      <>
                        {history.map((his: AppDataObject) => {
                          <Text
                            style={[
                              colorScheme === "dark"
                                ? CommonStyle.c_D1D0D0
                                : CommonStyle.c_747B84,
                            ]}
                            key={his.name.toString()}
                          >
                            {JSON.stringify(his)}
                          </Text>;
                        })}
                      </>
                    )}
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

