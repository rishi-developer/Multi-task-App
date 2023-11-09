import { View } from "react-native";
import React, { useRef } from "react";
import { Video } from "expo-av";
import CommonStyle from "../../../styles/Global";
import { detailScreenStyles } from "../Detailscreen/DetailscreenStyles";

const Videoplayer = ({ navigation, route }: any) => {
  const video = useRef(null);
  return (
    <View>
      <Video
        ref={video}
        style={[CommonStyle.as_center, detailScreenStyles.popupimageview]}
        source={{ uri: route.params.url }}
        useNativeControls
        resizeMode="contain"
        isLooping={false}
      />
    </View>
  );
};

export default Videoplayer;
