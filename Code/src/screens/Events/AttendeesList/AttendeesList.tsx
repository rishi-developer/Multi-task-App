import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  StyleSheet,
} from "react-native";
import CommonStyles from "../../../styles/Global";
import { Text, View } from "../../../shared/Themed";
import useColorScheme from "../../../hooks/useColorScheme";
import { attendeesListStyles } from "./AttendeesListStyles";

const AttendeesList = ({
  attendeeData,
  loadMoreItem,
  moreData,
  isLoading,
  users,
}: any) => {
  const colorscheme = useColorScheme();
  const renderLoader = () => {
    return isLoading && (
      <View
        style={[
          attendeesListStyles.renderLoader,
          colorscheme == "dark"
            ? CommonStyles.bg_1B1F23
            : CommonStyles.bg_FFFFFF,
        ]}
      >
        <ActivityIndicator size="large" color={"#666592"} />
      </View>
    ) ;
  };
  return (
    <>
      <FlatList
        extraData={users}
        data={attendeeData}
        contentContainerStyle={{ paddingBottom: 50 }}
        onEndReached={moreData && loadMoreItem}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderLoader}
        keyExtractor={(item) => item.EmployeeNamer}
        renderItem={({ item }) => (
          <View
            key={item.emailId}
            style={[
              attendeesListStyles.attContainer,
              colorscheme === "dark"
                ? CommonStyles.bg_2E343C
                : CommonStyles.bg_FFFFFF,
            ]}
          >
            <View
              style={[
                attendeesListStyles.attCardHolder,
                colorscheme === "dark"
                  ? CommonStyles.bg_2E343C
                  : CommonStyles.bg_FFFFFF,
              ]}
            >
              <View
                style={[
                  attendeesListStyles.imgContainer,
                  colorscheme === "dark"
                    ? CommonStyles.bg_2E343C
                    : CommonStyles.bg_FFFFFF,
                ]}
              >
                {item.photo_url ? (
                  <Image
                    source={{
                      uri: item.photo_url,
                    }}
                    style={attendeesListStyles.attImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Image
                    source={require("../../../../assets/images/user.jpg")}
                    style={attendeesListStyles.attImage}
                    resizeMode="cover"
                  ></Image>
                )}
              </View>
              <View
                style={[
                  attendeesListStyles.attContent,
                  colorscheme === "dark"
                    ? CommonStyles.bg_2E343C
                    : CommonStyles.bg_FFFFFF,
                ]}
              >
                <View
                  style={[
                    attendeesListStyles.attTitleContainer,
                    colorscheme === "dark"
                      ? CommonStyles.bg_2E343C
                      : CommonStyles.bg_FFFFFF,
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[
                      CommonStyles.montserratBold,
                      attendeesListStyles.attTitleText,
                      colorscheme === "dark" && CommonStyles.c_FFFFFF,
                    ]}
                  >
                    {item.name}
                  </Text>
                </View>
                <View
                  style={[
                    attendeesListStyles.attTitleContainer,
                    colorscheme === "dark"
                      ? CommonStyles.bg_2E343C
                      : CommonStyles.bg_FFFFFF,
                  ]}
                >
                  <Text
                    allowFontScaling={false}
                    style={[CommonStyles.montserrat, attendeesListStyles.desigText]}
                  >
                    {item.designation}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </>
  );
};

export default AttendeesList;
