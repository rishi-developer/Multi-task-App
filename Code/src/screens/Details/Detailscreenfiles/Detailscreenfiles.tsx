import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import CommonStyle from "../../../styles/Global";
import useColorScheme from "../../../hooks/useColorScheme";
import Header from "../../../shared/Header";
import { NeoContext } from "../../../NeoProvider/NeoProvider";
import { svgImports } from "../../../data/Imports";
import { appDocObj } from "../../../../types";
import { detailScreenFilesStyles } from "./DetailscreenfilesStyles";

export default function Detailscreenfiles({ navigation, route }: any) {
  const { fetchAppDocs, appDoc, isDetailsLoading, setDetailsLoading } =
    useContext(NeoContext);
  const param = route.params;
  const colorScheme = useColorScheme();

  useEffect(() => {
    const backbuttonHander = () => {
      navigation.goBack();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", backbuttonHander);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backbuttonHander);
    };
  });

  useEffect(() => {
    setDetailsLoading(true);
    fetchAppDocs(param.id);
  }, []);
  return (
    <>
      {isDetailsLoading ? (
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
        <View
          style={[
            CommonStyle.flex1,
            colorScheme == "dark"
              ? CommonStyle.bg_1B1F23
              : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View
            style={[
              CommonStyle.w100,
              CommonStyle.h100,
              colorScheme == "dark"
                ? CommonStyle.bg_1B1F23
                : CommonStyle.bg_FFFFFF,
            ]}
          >
            <Header title="All Files" type="Files" />
            <View
              style={[
                detailScreenFilesStyles.body,
                CommonStyle.as_center,
                CommonStyle.jc_center,
              ]}
            >
              {appDoc.length > 0 ? (
                <ScrollView>
                  {appDoc.map((item: appDocObj) => {
                    return (
                      <View
                        style={[
                          CommonStyle.ai_center,
                          detailScreenFilesStyles.mainContainer,
                          colorScheme == "dark"
                            ? detailScreenFilesStyles.darkThemeCardShadow
                            : detailScreenFilesStyles.lightThemeCardShadow,
                        ]}
                        key={item.id}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            item.type.toLowerCase() === "document" ||
                            item?.source?.toLowerCase() === "youtube"
                              ? navigation.navigate("Web" as never, {
                                  url: `${item.path}`,
                                })
                              : navigation.navigate("Videoplayer" as never, {
                                  url: `${item.path}`,
                                });
                          }}
                          style={[
                            CommonStyle.flexDRow,
                            detailScreenFilesStyles.container,
                            CommonStyle.ai_center,
                            colorScheme == "dark"
                              ? detailScreenFilesStyles.darkThemeCardShadow
                              : detailScreenFilesStyles.lightThemeCardShadow,
                          ]}
                        >
                          <View style={detailScreenFilesStyles.cardimg}>
                            <View
                              style={[
                                detailScreenFilesStyles.circle,
                                CommonStyle.bg_DDEBFF,
                                CommonStyle.jc_center,
                                CommonStyle.ai_center,
                              ]}
                            >
                              {item.type === "document" ? (
                                <svgImports.document />
                              ) : (
                                <svgImports.video />
                              )}
                            </View>
                          </View>
                          <View style={detailScreenFilesStyles.cardinfo}>
                            <Text
                              allowFontScaling={false}
                              numberOfLines={1}
                              style={[
                                CommonStyle.montserratSemiBold,
                                CommonStyle.fs_13,
                                detailScreenFilesStyles.cardTitle,
                                colorScheme == "dark"
                                  ? CommonStyle.c_D1D0D0
                                  : CommonStyle.c_858C94,
                              ]}
                            >
                              {item.file_name}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              ) : (
                <View>
                  <View
                    style={[
                      CommonStyle.dflex,
                      CommonStyle.jc_center,
                      CommonStyle.ai_center,
                      detailScreenFilesStyles.resultNotFound,
                      colorScheme === "dark"
                        ? CommonStyle.bg_1B1F23
                        : CommonStyle.bg_FFFFFF,
                    ]}
                  >
                    <Text
                      allowFontScaling={false}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.fs_20,
                        detailScreenFilesStyles.noResultFoundText,
                        colorScheme === "dark"
                          ? CommonStyle.c_D1D0D0
                          : CommonStyle.c_747B84,
                      ]}
                    >
                      No Files found
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </>
  );
}


