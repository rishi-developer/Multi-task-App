import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { noteContainerStyles, noteStyles } from "./NoteStyles";
import CommonStyle from "../../../styles/Global";
import useColorScheme from "../../../hooks/useColorScheme";

import Checkbox from "expo-checkbox";
const Note = ({ item, selected, onLongPress, onPress, index }: any) => {
  const [imgTitle, setImgTitle] = useState("");
  const [isChecked, setChecked] = useState(true);
  const colorScheme = useColorScheme();
  let theme = colorScheme === "dark";
  const { title, desc, image } = item;
  useEffect(() => {
    let imgTitleName = "";
    if (title.length === 0) {
      if (desc.length == 0) {
        imgTitleName = "I";
      } else {
        imgTitleName = desc.substring(0, 2).toUpperCase();
      }
    } else if (title.split(" ").length == 1) {
      imgTitleName = title.substring(0, 1).toUpperCase();
    } else {
      imgTitleName = (
        title.split(" ")[0].substring(0, 1) +
        title.split(" ")[1].substring(0, 1)
      ).toUpperCase();
    }
    setImgTitle(imgTitleName);
  });
  return (
    <>
      <View
        style={[
          CommonStyle.ai_center,
          noteStyles.mainContainer,
          theme
            ? noteStyles.darkThemeCardShadow
            : noteStyles.lightThemeCardShadow,
        ]}
      >
        <TouchableOpacity
          delayLongPress={100}
          onLongPress={onLongPress}
          onPress={onPress}
          style={[
            CommonStyle.flexDRow,
            noteContainerStyles(index).container,
            theme ? CommonStyle.bg_2E343C : CommonStyle.bg_FFFFFF,
          ]}
        >
          <View style={[CommonStyle.jc_center, noteStyles.cardimg]}>
            <View style={[CommonStyle.jc_center, noteStyles.circle]}>
              <Text
                allowFontScaling={false}
                style={[
                  CommonStyle.montserratBold,
                  CommonStyle.fs_15,
                  noteStyles.circleData,
                ]}
              >
                {imgTitle}
              </Text>
            </View>
          </View>
          <View style={[CommonStyle.jc_center, noteStyles.cardinfo]}>
            {title.length > 0 || desc.length > 0 ? (
              <>
                {title && (
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    style={[
                      CommonStyle.montserratBold,
                      CommonStyle.fs_20,
                      noteStyles.cardTitle,
                      theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_09101D,
                    ]}
                  >
                    {title}
                  </Text>
                )}
                {desc && (
                  <View style={noteStyles.cardbody}>
                    <Text
                      allowFontScaling={false}
                      numberOfLines={2}
                      style={[
                        CommonStyle.montserrat,
                        CommonStyle.fs_15,
                        noteStyles.cardDescription,
                        theme ? CommonStyle.c_D1D0D0 : CommonStyle.c_858C94,
                      ]}
                    >
                      {desc}
                    </Text>
                  </View>
                )}
              </>
            ) : (
              <View style={noteStyles.card}>
                <Image
                  source={{ uri: image[0] }}
                  style={noteStyles.imageTitle}
                ></Image>
              </View>
            )}
          </View>
          {selected && (
            <TouchableOpacity>
              <Checkbox
                style={noteStyles.selectedTick}
                value={isChecked}
                onValueChange={setChecked}
                color={"#007AFF"}
              />
            </TouchableOpacity>
          )}
          {selected && (
            <View
              style={[
                CommonStyle.w100,
                CommonStyle.h100,
                CommonStyle.pAbsolute,
                noteStyles.overlay,
                theme ? noteStyles.darkOverlay : noteStyles.lightOverlay,
              ]}
            />
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Note;