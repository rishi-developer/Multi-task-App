import React, { useEffect, useState } from "react";
import { ColorSchemeName, Platform, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import AddUser from "../screens/Events/AddUser/AddUser";
import BookmarkScreen from "../screens/Home/BookmarkScreen/BookmarkScreen";
import Colors from "../constants/Colors";
import CongratsScreen from "../screens/QuizScreen/CongratsScreen/CongratsScreen";
import Detailscreen from "../screens/Details/Detailscreen/Detailscreen";
import Detailscreenfiles from "../screens/Details/Detailscreenfiles/Detailscreenfiles";
import Directorypage from "../screens/Directory/Directorypage";
import EventDetails from "../screens/Events/EventDetails/EventDetails";
import EventHome from "../screens/Events/EventHome/EventHome";
import FeaturedeAppsModel from "../screens/Home/FeaturedAppsModel/FeaturedAppsModel";
import HomeScreen from "../screens/Home/HomeScreen/HomeScreen";
import HistoryScreen from "../screens/QuizScreen/HistoryScreen/HistoryScreen";
import Leaderboard from "../screens/QuizScreen/Leaderboard/Leaderboard";
import LinkingConfiguration from "./LinkingConfiguration";
import LoginScreen from "../screens/LoginScreen/LoginScreen/LoginScreen";
import ModalScreen from "../screens/Others/ModalScreen/ModalScreen";
import NotesScreen from "../screens/NotesScreen/NotesScreen/NotesScreen";
import ProfilePage from "../screens/Home/ProfilePage/ProfilePage";
import Quiz from "../screens/QuizScreen/Quiz/Quiz";
import QuizHome from "../screens/QuizScreen/QuizHome/QuizHome";
import RequiredAppsScreen from "../screens/RequiredApp/RequiredAppsScreen";
import Videoplayer from "../screens/Details/Videoplayer/Videoplayer";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../../types";
import SearchScreen from "../screens/SearchScreen/SearchScreen";
import Scanner from "../screens/ScanScreen/Scanner";
import ThirdPartyApp from "../screens/ThirdPartyApp/ThirdPartyApp";
import useColorScheme from "../hooks/useColorScheme";
import ViewAnswers from "../screens/QuizScreen/ViewAnswers/ViewAnswers";
import Webview from "../screens/Others/Webview/Webview";
import { svgImports } from "../data/Imports";
import { NeoProvider } from "../NeoProvider/NeoProvider";
import GuestLogin from "../screens/LoginScreen/GuestLogin/GuestLogin";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NeoProvider>
      <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
        <RootNavigator />
      </NavigationContainer>
    </NeoProvider>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();
function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          gestureEnabled: false,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Guest"
        component={GuestLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="QuizScreen"
        component={QuizNav}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

function Home() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Web"
        component={Webview}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FeatureModal"
        component={FeaturedeAppsModel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Detailscreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProfilePage"
        component={ProfilePage}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ThirdPartyApp"
        component={ThirdPartyApp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequiredApps"
        component={RequiredAppsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BookmarkedApps"
        component={BookmarkScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detailscreenfiles"
        component={Detailscreenfiles}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Videoplayer"
        component={Videoplayer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Search() {
  return (
    <Stack.Navigator initialRouteName="Search">
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Web"
        component={Webview}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Events() {
  return (
    <Stack.Navigator initialRouteName="Events">
      <Stack.Screen
        name="ScanScreen"
        component={Scanner}
        options={{
          gestureEnabled: Platform.OS === "ios" ? false : true,
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Events"
        component={EventHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EventDetails"
        component={EventDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddUser"
        component={AddUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function QuizNav() {
  return (
    <Stack.Navigator initialRouteName="QuizHomeMain">
      <Stack.Screen
        name="QuizHomeMain"
        component={QuizHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CongratsScreen"
        component={CongratsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewAnswers"
        component={ViewAnswers}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={Leaderboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
function BottomTabNavigator() {
  let [showBottomTab, setShowBottom] = useState(true);
  useEffect(() => {
    SecureStore.getItemAsync("isGuestUser").then((data: any) => {
      if (data && data == "true") {
        setShowBottom(false);
      }
    });
  });

  SecureStore.getItemAsync("isGuestUser").then((data: any) => {
    if (data && data == "true") {
      setShowBottom(false);
    } else {
      setShowBottom(true);
    }
  });
  return <React.Fragment>{userNavigator(showBottomTab)}</React.Fragment>;
}
function userNavigator(show: any) {
  let [isSearch, setisSearch] = useState(true);
  let [inEventHome, setInEventHome] = useState(true);
  let [showBottomTab, setShowBottom] = useState(true);
  const colorScheme = useColorScheme();

  return (
    <>
      {show === true ? (
        <BottomTab.Navigator
          screenListeners={({ navigation, route }) => ({
            state: (e) => {
              if (route.name.includes("HomeScreen")) {
                setShowBottom(true);
              }
            },
          })}
          screenOptions={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarActiveTintColor: Colors[colorScheme].tint,
            tabBarStyle: {
              backgroundColor: colorScheme === "dark" ? "#2E343C" : "#FAFAFB",
              position: "absolute",
              borderTopWidth: colorScheme === "dark" ? 0 : 1,
            },
            tabBarHideOnKeyboard: true,
          }}
        >
          <BottomTab.Screen
            name="HomeScreen"
            component={Home}
            listeners={({ navigation }) => ({
              tabPress: (event) => {
                event.preventDefault();
                setShowBottom(true);
                navigation.navigate("Home");
              },
            })}
            options={({ navigation }: RootTabScreenProps<"HomeScreen">) => ({
              title: "Home",
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <svgImports.HomeImage
                    size={16}
                    color={focused ? "#498BEA" : "#747B84"}
                    style={{
                      resizeMode: "contain",
                      justifyContent: "center",
                    }}
                  />
                </View>
              ),
            })}
          />
          <BottomTab.Screen
            name="SearchScreen"
            component={Search}
            listeners={({ navigation }) => ({
              tabPress: (event) => {
                setShowBottom(true);
                if (isSearch == true) {
                  setisSearch(false);
                  event.preventDefault();
                  navigation.navigate("SearchScreen");
                } else {
                  event.preventDefault();
                  navigation.navigate("Search");
                }
              },
            })}
            options={({ navigation }) => ({
              title: "Search",
              tabBarIcon: ({ focused }) => (
                <svgImports.SearchIcon
                  size={16}
                  color={focused ? "#498BEA" : "#747B84"}
                  style={{
                    resizeMode: "contain",
                    justifyContent: "center",
                  }}
                />
              ),
            })}
          />
          <BottomTab.Screen
            name="NotesScreen"
            component={NotesScreen}
            options={{
              title: "NotesScreen",
              tabBarIcon: ({ focused }) => (
                <svgImports.NotesIcon
                  color={focused ? "#498BEA" : "#747B84"}
                  style={{
                    resizeMode: "contain",
                    justifyContent: "center",
                  }}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="EventHome"
            component={Events}
            listeners={({ navigation }: RootTabScreenProps<"EventHome">) => ({
              tabPress: (event) => {
                event.preventDefault();
                if (inEventHome) {
                  navigation.navigate("EventHome");
                  setShowBottom(true);
                  setInEventHome(false);
                } else {
                  setShowBottom(true);

                  navigation.navigate("Events");
                }
              },
            })}
            options={{
              title: "Events",
              tabBarIcon: ({ focused }) => (
                <svgImports.Event
                  size={16}
                  color={focused ? "#498BEA" : "#747B84"}
                  style={{ resizeMode: "contain", justifyContent: "center" }}
                />
              ),
            }}
          />
          <BottomTab.Screen
            name="DirectoryPage"
            component={Directorypage}
            options={{
              title: "directorypage",
              tabBarIcon: ({ focused }) => (
                <svgImports.DirectoryIcon
                  size={10}
                  color={focused ? "#498BEA" : "#747B84"}
                  style={{
                    resizeMode: "contain",
                    justifyContent: "center",
                  }}
                />
              ),
            }}
          />
        </BottomTab.Navigator>
      ) : (
        show === false && (
          <BottomTab.Navigator
            screenOptions={{
              tabBarShowLabel: false,
              headerShown: false,
              tabBarActiveTintColor: Colors[colorScheme].tint,
              tabBarStyle: {
                backgroundColor: colorScheme === "dark" ? "#2E343C" : "#FAFAFB",
                position: "absolute",
                borderTopWidth: colorScheme === "dark" ? 0 : 1,
              },
            }}
          >
            <BottomTab.Screen
              name="EventHome"
              component={Events}
              listeners={({ navigation }: RootTabScreenProps<"EventHome">) => ({
                tabPress: (event) => {
                  event.preventDefault();
                  if (inEventHome) {
                    navigation.navigate("EventHome");
                    setShowBottom(true);
                  } else {
                    setShowBottom(true);
                    navigation.navigate("Events");
                  }
                },
              })}
              options={{
                title: "Events",
                tabBarIcon: ({ focused }) => (
                  <svgImports.Event color={focused ? "#498BEA" : "#747B84"} />
                ),
                tabBarStyle: { display: "none" },
              }}
            />
          </BottomTab.Navigator>
        )
      )}
    </>
  );
}
