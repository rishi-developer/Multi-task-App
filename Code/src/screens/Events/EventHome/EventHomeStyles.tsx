import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");

export const eventHomeNavBar = (tab: any, activeTab: any) =>
  StyleSheet.create({
    darkBorder: {
      borderBottomColor: tab === activeTab ? "#007AFF" : "#4E4949",
    },
    lightBorder: {
      borderBottomColor: tab === activeTab ? "#007AFF" : "#EEEEEE",
    },
    lightText: {
      color: tab === activeTab ? "#007AFF" : "rgba(0, 0, 0, 0.6)",
    },
    darkText: {
      color: tab === activeTab ? "#007AFF" : "rgba(209, 208, 208, 0.8)",
    },
  });
export const eventHomeFilterBar = (filterItem: any, filterDate: any) =>
  StyleSheet.create({
    lightText: {
      backgroundColor: filterItem === filterDate ? "#007AFF" : "#FFFFFF",
      color: filterItem === filterDate ? "#FFFFFF" : "#4E4949",
    },
    darkText: {
      backgroundColor: filterItem === filterDate ? "#007AFF" : "#414B57",
      color: "#FFFFFF",
    },
  });

export const eventHomeStyles = StyleSheet.create({
  navigationItem: {
    width: "33%",
    borderBottomWidth: 2,
  },
  netWorkIssueText: {
    padding: 50,
    paddingVertical: height / 4,
  },
  eventContainer: {
    paddingTop: height / 25,
  },
  logout: {
    borderColor: "#007AFF",
    borderWidth: 1,
    elevation: 6,
    height: 47,
    width: "85%",
    bottom: 80,
    borderRadius: 6,
  },
  backBtnCntr: {
    width: "10%",
    paddingLeft: 5,
  },
  navigator: {
    marginTop: height / 38.67,
    width: "100%",
  },

  genericMsg: {
    fontSize: 15,
    paddingTop: "60%",
    paddingLeft: "30%",
  },
  genericMsgGuest: {
    fontSize: 20,
    paddingTop: "5%",
    paddingLeft: "5%",
  },
  navigText: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 17,
    paddingBottom: height / 101.5,
  },
  active: {
    borderBottomColor: "#007AFF",
    color: "#007AFF",
  },
  body: {
    width: "86%",
  },
  searchBarCntr: {
    marginTop: 32,
  },
  filterEventCntr: {
    marginTop: height / 46.48,
    marginBottom: 24,
  },
  filterEventItem: {
    width: "29%",
    height: 40,
    borderRadius: 6,
    shadowColor: "rgba(0, 0, 0, 1.5);",
    shadowOffset: { width: 0, height: 0.5 * 10 },
    shadowOpacity: 0.3,
    elevation: 5,
    shadowRadius: 0.8 * 10,
  },
  addEventCntr: {
    height: 47,
    width: 47,
    left: width / 1.3,
    borderRadius: 47,
  },
  topForAddEventBtn: {
    top: -200,
  },
  hiddenTopForAddEventBtn: {
    top: 0,
  },
  searchBar: {
    height: Platform.OS == "android" ? 30 : 40,
    borderWidth: 1,
    paddingLeft: 9,
    paddingBottom: 8,
    paddingTop: 7,
    borderRadius: 6,
    backgroundColor: "#F3F3F3",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
  },
  clearIcon: {
    marginTop: 7.5,
    right: "3%",
    width: 15,
    height: 15,
  },
  darkInputBackground: {
    borderColor: "#3C444E",
  },
  lightInputBackground: {
    backgroundColor: "rgba(241, 241, 241, 0.5)",
    borderColor: "#F3F3F3",
    color: "black",
  },
  logoutTxt: {
    fontSize: 14,
  },
  lightText: {
    color: "rgba(0, 0, 0, 0.6)",
  },
  darkText: {
    color: "rgba(209, 208, 208, 0.8)",
  },
  flatListContainer: {
    paddingBottom: height / 3.2,
  },
  noEvent: {
    height: height / 2,
  },
  noDataView: {
    height: height / 1.3,
    width: "100%",
  },
});
