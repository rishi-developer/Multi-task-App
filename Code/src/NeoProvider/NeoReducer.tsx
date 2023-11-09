import neoTypes from "./NeoTypes";

export const InitialState: any = {
  userDetails: {},
  appData: [],
  users: [],
  loadDirectory: false,
  filteredData: [],
  result: true,
  errMsg: {},
  guestLoader: false,
  guestAccess: false,
  eventsList: [],
  backupList: [],
  guestUser: [],
  isLoading: false,
  socketAdd: false,
  isHomeLoading: false,
  appDoc: [],
  isDetailsLoading: true,
  eventDetails: {
    name: "",
    attendees_list: [],
    start_date: "",
    city: [],
    description: "",
    end_date: "",
    end_time: "",
    start_time: "",
    venue: "",
    event_type: "",
    gemini_admin: [],
    guest_admin: [],
    guest_name: [],
    admin_type: [],
  },
  isAdmin: false,
  quizData: [],
  userHistory: [],
  leaderBoardData: [],
  eventError: false,
  eventDetialError: false,
  directoryError: false,
  getQuizError: false,
  homeSplashVisible: true,
  historyLoader: true,
  isDummyUser: false,
  detailError: false,
  isGuestLoading: false,
  hasPermission: "null",
  showWarning: false,
};

const NeoReducer = (state: any, action: any) => {
  switch (action.type) {
    case neoTypes.GET_APP_DOC: {
      return {
        ...state,
        appDoc: action.payload,
      };
    }
    case neoTypes.GET_USER_DETAILS: {
      return {
        ...state,
        userDetails: action.payload,
      };
    }
    case neoTypes.GET_APP_DATA: {
      return {
        ...state,
        appData: action.payload,
      };
    }
    case neoTypes.FETCH_EMP_DIRECTORY: {
      return {
        ...state,
        users: [...state.users, ...action.payload],
      };
    }
    case neoTypes.CLEAR_EMP_DIRECTORY: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case neoTypes.DIRECTORY_LOADER: {
      return {
        ...state,
        loadDirectory: action.payload,
      };
    }
    case neoTypes.FILTERED_DATA: {
      return {
        ...state,
        filteredData: action.payload,
      };
    }
    case neoTypes.FILTER_RESULTS: {
      return {
        ...state,
        result: action.payload,
      };
    }
    case neoTypes.FETCH_USER_EVENTS: {
      return {
        ...state,
        eventsList: action.payload,
      };
    }
    case neoTypes.SET_EVENTS_BACKUP: {
      return {
        ...state,
        backupList: action.payload,
      };
    }
    case neoTypes.SET_GUEST_USERS: {
      return {
        ...state,
        guestUser: action.payload,
      };
    }
    case neoTypes.SET_LOADER: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case neoTypes.SET_SOCKET: {
      return {
        ...state,
        socketAdd: action.payload,
      };
    }
    case neoTypes.SET_EVENT_DETAILS: {
      return {
        ...state,
        eventDetails: action.payload,
      };
    }
    case neoTypes.SET_ADMIN: {
      return {
        ...state,
        isAdmin: action.payload,
      };
    }
    case neoTypes.FETCH_QUIZ_DATA: {
      return {
        ...state,
        quizData: action.payload,
      };
    }
    case neoTypes.QUIZ_HISTORY_DATA: {
      return {
        ...state,
        userHistory: action.payload,
      };
    }
    case neoTypes.FETCH_LEADERBOARD: {
      return {
        ...state,
        leaderBoardData: action.payload,
      };
    }
    case neoTypes.SET_HOME_LOADER: {
      return {
        ...state,
        isHomeLoading: action.payload,
      };
    }
    case neoTypes.EVENT_DETAIL_ERROR: {
      return {
        ...state,
        eventDetialError: action.payload,
      };
    }
    case neoTypes.EVENT_ERROR: {
      return {
        ...state,
        eventError: action.payload,
      };
    }
    case neoTypes.DIRECTORY_ERROR: {
      return {
        ...state,
        directoryError: action.payload,
      };
    }
    case neoTypes.GET_QUIZ_ERROR: {
      return {
        ...state,
        getQuizError: action.payload,
      };
    }
    case neoTypes.SPLASH_SCREEN: {
      return {
        ...state,
        homeSplashVisible: action.payload,
      };
    }
    case neoTypes.SET_DETAILS_LOADER: {
      return {
        ...state,
        isDetailsLoading: action.payload,
      };
    }
    case neoTypes.SET_HISTORY_LOADER: {
      return {
        ...state,
        historyLoader: action.payload,
      };
    }
    case neoTypes.SET_DUMMY_USER: {
      return {
        ...state,
        isDummyUser: action.payload,
      };
    }
    case neoTypes.SET_DETAIL_ERROR: {
      return {
        ...state,
        detailError: action.payload,
      };
    }
    case neoTypes.SET_GUEST_LOADING: {
      return {
        ...state,
        isGuestLoading: action.payload,
      };
    }
    case neoTypes.SET_CAM_PERMISSION: {
      return {
        ...state,
        hasPermission: action.payload,
      };
    }
    case neoTypes.SET_GUEST_WARNING: {
      return {
        ...state,
        showWarning: action.payload,
      };
    }
  }

};

export default NeoReducer;
