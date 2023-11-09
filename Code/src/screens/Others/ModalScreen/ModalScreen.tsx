import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import Common from "../../../styles/Global";
import EditScreenInfo from "../../../shared/EditScreenInfo";
import { Text, View } from "../../../shared/Themed";
import { modalScreenStyles } from "./ModalScreenStyles";
import React from "react";

export default function ModalScreen() {
  return (
    <View style={[Common.flex1, Common.ai_center, Common.jc_center]}>
      <Text style={[Common.fs_20, modalScreenStyles.title]}>Modal</Text>
      <View
        style={modalScreenStyles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/ModalScreen.tsx" />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}
