import React from "react";
import {
  View,
  Modal,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { showImageFullScreenStyles } from "./ShowImageFullScreenStyles";
import { FontAwesome } from "@expo/vector-icons";
import CommonStyle from "../../../styles/Global";
import useColorScheme from "../../../hooks/useColorScheme";

const ShowImageFullScreen = ({ uri, visible, onClose }: any) => {
  const colorScheme = useColorScheme();
  let theme = colorScheme === "dark";
  return (
    <SafeAreaView>
      <Modal visible={visible} animationType="fade" onRequestClose={onClose}>
        <View style={theme ? CommonStyle.bg_1B1F23 : CommonStyle.bg_FFFFFF}>
          <TouchableOpacity style={showImageFullScreenStyles.fullImgBackBtn} onPress={onClose}>
            <FontAwesome
              name="arrow-left"
              style={[CommonStyle.fs_20, CommonStyle.c_FFFFFF]}
            ></FontAwesome>
          </TouchableOpacity>
          <View style={[CommonStyle.h85, CommonStyle.jc_center]}>
            <Image
              source={{ uri: uri }}
              style={[CommonStyle.w100, showImageFullScreenStyles.fullImgHeight]}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ShowImageFullScreen;
