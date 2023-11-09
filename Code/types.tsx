/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  ProfilePage: undefined;
  Login: undefined;
  Details: undefined;
  FeatureModal: undefined;
  Home: undefined;
  EventsForm: undefined;
  Events: undefined;
  EventDetails: undefined;
  Search: undefined;
  QuizHome: undefined;
  CongratsScreen: undefined;
  ViewAnswers: undefined;
  Quiz: undefined;
  Leaderboard: undefined;
  QuizHomeMain: undefined;
  HistoryScreen: undefined;
  Profile: undefined;
  Web: undefined;
  ThirdPartyApp: undefined;
  PopularApps: undefined;
  RequiredApps: undefined;
  BookmarkedApps: undefined;
  ChatBot: undefined;
  QuizScreen: undefined;
  ScanScreen: undefined;
  EventsScreen: undefined;
  AddUser: undefined;
  Detailscreenfiles: undefined;
  Videoplayer: undefined;
  Guest:undefined
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  NotesScreen: undefined;
  DirectoryPage: undefined;
  QuizHome: undefined;
  EventHome: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type ImageType = {
  id: string;
  image: string;
};

export type attendeesObjType = {
  users: string;
  Date: Date;
};
export type userDetailsObjType = {
  CandidateUId: string;
  CountryName: string;
  DOB: string;
  DepartmentName: string;
  Designation: string;
  Email: string;
  EmployeeCode: string;
  EmployeeName: string;
  EmployeeUId: string;
  ExtNo: string;
  ImagePath: string;
  IsFresher: boolean;
  JoiningDate: string;
  Location: string;
  ManagerCode: string;
  ManagerEmail: string;
  MobileNumber: string;
  ReportingManager: string;
  Team: string;
  TerminateDate: null;
  WsNo: string;
  chair_i: null;
  coChair_id: string;
};

export type guestUserTypeObj = {
  id: string;
  checked: boolean;
  events: string[];
  isGuestUser: boolean;
  name: string;
  password: string;
  token: string;
  user_name: string;
};

export type EventDataObject = {
  admin_type: string[];
  city: string[];
  created: string;
  created_by: string;
  description: string;
  end_date: string;
  end_time: string;
  event_type: string;
  gemini_admin: string[];
  guest_admin: string[];
  guest_name: string[];
  id: string;
  name: string;
  start_date: string;
  start_time: string;
  venue: string;
  attendees_list: attendeesDataObject[];
};

export type eventDetailsObjType = {
  name: string;
  description: string;
  venue: string;
  users: attendeesObjType[];
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  eventType: string[];
};
export type eventTypeObject = {
  eventName: string;
  eventDesc: string;
  eventCity: string[];
  guestAdmin: string[];
  guestName: string[];
  adminType: string[];
  startDate: string;
  endDate: string;
  eventType: string;
  startTime: string;
  endTime: string;
  location: string;
};

export type errTypeObject = {
  startDate: boolean;
  endDate: boolean;
  startTime: boolean;
  endTime: boolean;
  eventName: boolean;
  eventDesc: boolean;
  eventCity: boolean;
  eventType: boolean;
  eventTime: boolean;
};

export type AppDataObject = {
  darksource: string | null;
  description: string;
  is_selected: boolean;
  name: string;
  navig: string;
  source: string;
  url: string;
  isToken: boolean;
  webview: string;
  keywords: string[];
  keyword: boolean;
  isSelected: boolean;
  order_no: number;
};

export type NoteType = {
  desc: string;
  id: Number;
  image: string[];
  time: Number;
  title: string;
};

export type QuestionareType = {
  correctAns: string;
  Incorrect_Ans: string[];
  Ques: string;
};
export type statsType = {
  correctAns: string;
  ques: string;
  userAns: string;
};
export type QuizHistoryType = {
  correctAnswers: number;
  points: number;
  quizLogo: string;
  quizName: string;
  stats: statsType[];
  timetaken: number;
  totalQuestions: number;
  wrongANswer: number;
};
export type UserDetailsType = {
  dateTime: string;
  department: string;
  description: string;
  email: string;
  employeeid: string;
  mobilenumber: string;
  photoUrl: string;
  userName: string;
};

export type TypeQuesStatusArray = {
  quesNo:number,
  ques: string;
  correctAns: string;
  userAns: string;
};

export type AppDataObject2 = {
  [x: string]: any;
  id: number;
  dark_source: string | null;
  description: string;
  is_selected: boolean;
  name: string;
  navig: string;
  source: string;
  url: string;
  isToken: boolean;
  webview: string;
};

export type AppDataObject3 = {
  dark_source: string;
  description: string;
  is_selected: boolean;
  name: string;
  navig: string;
  source: string;
  url: string;
};

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type attendeesDataObject = {
  Date: string;
  users: string;
};

export type emp = {
  events: string[];
  user_name: string;
};

export type appDocObj = {
  source: any;
  app_id: number;
  file_name: string;
  id: number;
  path: string;
  role: string[];
  type: string;
};
