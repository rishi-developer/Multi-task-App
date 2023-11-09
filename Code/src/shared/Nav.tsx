import React from "react";

import {
  TouchableOpacity,
  Linking,
  Text,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import { Image } from "react-native";
let { width } = Dimensions.get("screen");

function Nav({
  navigation,
  text,
  name,
  url,
  navig,
  ContainerStyle,
  isToken,
  id,
  description,
  source,
  darksource,
  screenshots,
  size,
  category,
  appStoreId,
}: any) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (
            name == "Teams" ||
            name == "Microsoft Teams" ||
            name == "Authenticator" ||
            name == "Asana" ||
            name == "Microsoft Outlook" ||
            name == "Trello" ||
            name == "Webex" ||
            name == "Zoom"
          ) {
            Linking.openURL(
              name == "Microsoft Outlook" ? `ms-outlook://emails` : url
            ).catch((err) => {
              Linking.openURL(
                Platform.OS === "ios"
                  ? `https://apps.apple.com/us/app/id${appStoreId}`
                  : `http://play.google.com/store/apps/details?id=${url}`
              ).catch((err) => console.error("An error occurred", err));
            });
          } else {
            navigation.navigate(navig as never, {
              url: `${url}`,
              name: `${name}`,
              isToken: `${isToken}`,
              id: `${id}`,
              description: `${description}`,
              source: `${source}`,
              darksource: `${darksource}`,
              Screenshots: [],
              size: `${size}`,
              category: `${category}`,
            });
          }
        }}
      >
        {name === "Feedback form" ? (
          <Image
            source={require("../../assets/images/FF(1).png")}
            style={styles.feedbackLogo}
          />
        ) : (
          <Text allowFontScaling={false} style={ContainerStyle}>
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </>
  );
}
export default Nav;
const styles = StyleSheet.create({
  feedbackLogo: {
    width: width / 12.8,
    height: width / 12.8,
    tintColor: "white",
    marginRight: width / 25.6,
    marginTop: width / 66,
  },
});
