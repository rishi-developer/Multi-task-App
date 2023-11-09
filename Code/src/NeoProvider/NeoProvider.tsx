import { createContext, useReducer } from "react";
import * as SecureStore from "expo-secure-store";
import jwt_decode from "jwt-decode";
import UserDetailApiService from "../services/api/UserApi/userApiServices";
import NeoReducer, { InitialState } from "./NeoReducer";
import neoTypes from "./NeoTypes";
import {
  generateToken,
  getRefreshToken,
  getUserDetails,
  updateLoginDetails,
} from "../services/providerService";
import AppApiService from "../services/api/AppApi/appApiService";
import EventApiService from "../services/api/EventApi/eventApiService";
import GuestApiService from "../services/api/GuestApi/guestApiServices";
import quizApiService from "../services/api/QuizApi/quizApiService";
import {
  appDocObj,
  emp,
  EventDataObject,
  userDetailsObjType,
} from "../../types";
import {
  dummy_appData,
  dummy_event_data,
  dummy_user,
  dummy_user_list,
} from "../data/Dummy";
const NeoContext = createContext({
  ...InitialState,
});

const NeoProvider = ({ children }: any) => {
  const [store, dispatch] = useReducer(NeoReducer, InitialState);
  const {
    userDetails,
    appData,
    currentPage,
    users,
    loadDirectory,
    filteredData,
    result,
    eventsList,
    backupList,
    guestUser,
    isLoading,
    socketAdd,
    eventDetails,
    isAdmin,
    quizData,
    userHistory,
    leaderBoardData,
    isHomeLoading,
    eventError,
    eventDetialError,
    directoryError,
    getQuizError,
    isDetailsLoading,
    appDoc,
    homeSplashVisible,
    historyLoader,
    isDummyUser,
    detailError,
    isGuestLoading,
    hasPermission,
    showWarning,
  } = store;
  const userService = new UserDetailApiService();
  let appServices = new AppApiService();
  let eventService = new EventApiService();
  let guestService = new GuestApiService();
  let quizService = new quizApiService();
  const getLoginDetails = async (token: string, loading: boolean) => {
    try {
      setHomeLoader(loading);
      const data = await SecureStore.getItemAsync("isGuestUser");
      if (data === null) {
        const tokens: any = await getRefreshToken(token);
        if (!tokens.error) {
          const { refresh_token, access_token } = tokens;
          await SecureStore.setItemAsync("refresh_token", refresh_token);
          await SecureStore.setItemAsync("access_token", access_token);
          const { unique_name }: { unique_name: string } =
            jwt_decode(access_token);
          if (
            unique_name.toLowerCase() ===
            "mobile.test@Geminisolutions.com".toLowerCase()
          ) {
            await fetchAppData(true);
            dispatch({
              type: neoTypes.SET_DUMMY_USER,
              payload: true,
            });
            return dummy_user;
          } else {
            await generateToken(unique_name);
            await updateLoginDetails(unique_name);
            let userDetails: any = await getUserDetails(unique_name);
            if (userDetails.error) throw userDetails;
            fetchAppData(false);
            const details = userDetails.data.data;
            let userData = {
              userName: details[0].name,
              description: details[0].designation,
              employeeid: details[0].emp_id,
              email: details[0].email_id,
              mobilenumber: details[0].mobile_number,
              department: details[0].department,
              photoUrl: details[0].photo_url,
              dateTime: Date.now().toString(),
            };
            dispatch({
              type: neoTypes.GET_USER_DETAILS,
              payload: userData,
            });
            setHomeLoader(false);
          }
        } else {
          throw tokens;
        }
      }
    } catch (err) {
      setHomeLoader(false);
      return {
        error: true,
        errorMsg: err.message,
      };
    }
  };

  const setShowWarning = (value: boolean) => {
    dispatch({
      type: neoTypes.SET_GUEST_WARNING,
      payload: value,
    });
  };

  const setHasPermission = (value: boolean) => {
    dispatch({
      type: neoTypes.SET_CAM_PERMISSION,
      payload: value,
    });
  };
  const updateTime = () => {
    let updateDetails = {
      ...userDetails,
      dateTime: Date.now().toString(),
    };
    dispatch({
      type: neoTypes.GET_USER_DETAILS,
      payload: updateDetails,
    });
  };

  const updateUserDetails = (value: string) => {
    dispatch({
      type: neoTypes.GET_USER_DETAILS,
      payload: value,
    });
  };

  const fetchAppData = async (isDummy: boolean) => {
    if (isDummy) {
      dispatch({
        type: neoTypes.GET_APP_DATA,
        payload: dummy_appData,
      });
    } else {
      await appServices.getAppData().then((res) => {
        dispatch({
          type: neoTypes.GET_APP_DATA,
          payload: res.data,
        });
      });
    }
  };

  const setLoadDirectory = (value: boolean) => {
    dispatch({
      type: neoTypes.DIRECTORY_LOADER,
      payload: value,
    });
  };

  const getUsers = async (currentPage: Number, isClear: boolean) => {
    try {
      const res = await userService.getUserDetails(currentPage);
      if (res.data.length == 0) throw Error;
      dispatch({
        type: neoTypes.DIRECTORY_ERROR,
        payload: false,
      });
      if (isClear || (users.length !== 0 && currentPage === 0)) {
        dispatch({
          type: neoTypes.CLEAR_EMP_DIRECTORY,
          payload: [],
        });
      }
      dispatch({
        type: neoTypes.FETCH_EMP_DIRECTORY,
        payload: res.data,
      });
      setLoadDirectory(false);
    } catch (err) {
      dispatch({
        type: neoTypes.DIRECTORY_ERROR,
        payload: true,
      });
    }
  };

  const searchUsers = async (searchQuery: string) => {
    if (searchQuery.length > 0 && !isDummyUser) {
      const res = await userService.searchUser(searchQuery);
      dispatch({
        type: neoTypes.FILTERED_DATA,
        payload: res.data,
      });
      if (res.data.length == 0) {
        setResult(false);
      }
    } else if (searchQuery.length > 0 && isDummyUser) {
      let filteredAttendee = dummy_user_list.filter((user) => {
        if (user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          return user;
        }
      });
      dispatch({
        type: neoTypes.FILTERED_DATA,
        payload: filteredAttendee,
      });
    } else {
      dispatch({
        type: neoTypes.FILTERED_DATA,
        payload: [],
      });
    }
  };

  const setResult = (result: boolean) => {
    dispatch({
      type: neoTypes.FILTER_RESULTS,
      payload: result,
    });
  };

  const fetchUserEventsList = async () => {
    if (isDummyUser) {
      let eventDAta = dummy_event_data;
      dispatch({
        type: neoTypes.EVENT_ERROR,
        payload: false,
      });
      dispatch({
        type: neoTypes.FETCH_USER_EVENTS,
        payload: eventDAta,
      });
      dispatch({
        type: neoTypes.SET_EVENTS_BACKUP,
        payload: eventDAta,
      });
    } else {
      try {
        const res = await eventService.getEventList();
        let { data } = res.data;
        if (data.length == 0) throw Error;
        dispatch({
          type: neoTypes.EVENT_ERROR,
          payload: false,
        });
        dispatch({
          type: neoTypes.FETCH_USER_EVENTS,
          payload: data,
        });
        dispatch({
          type: neoTypes.SET_EVENTS_BACKUP,
          payload: data,
        });
      } catch (err) {
        dispatch({
          type: neoTypes.EVENT_ERROR,
          payload: true,
        });
      }
    }
  };

  const setDetailsLoading = (loading: boolean) => {
    dispatch({
      type: neoTypes.SET_DETAILS_LOADER,
      payload: loading,
    });
  };

  const updateUserEvents = (events: EventDataObject) => {
    dispatch({
      type: neoTypes.FETCH_USER_EVENTS,
      payload: events,
    });
  };

  const fetchGuestEvent = async (id: string) => {
    try {
      const res = await eventService.getGuestEvent(id);

      let { data } = res.data;
      dispatch({
        type: neoTypes.FETCH_USER_EVENTS,
        payload: data,
      });
      dispatch({
        type: neoTypes.SET_EVENTS_BACKUP,
        payload: data,
      });
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const fetchGuestHandler = async () => {
    await guestService.getGuestList().then((res) => {
      let { data } = res.data;
      let newData = data.map((data: string[]) => {
        return {
          ...data,
          checked: false,
        };
      });
      dispatch({
        type: neoTypes.SET_GUEST_USERS,
        payload: newData,
      });
    });
  };

  const setGuestUser = (guestUser: string) => {
    dispatch({
      type: neoTypes.SET_GUEST_USERS,
      payload: guestUser,
    });
  };

  const updateGuest = async (users: string, id: string) => {
    await guestService.getGuestList().then((res) => {
      let { data } = res.data;
      let newData = data.map((employee: emp) => {
        return {
          ...employee,
          checked: users.includes(employee.user_name)
            ? true
            : employee.events.includes(id)
            ? true
            : false,
        };
      });
      dispatch({
        type: neoTypes.SET_GUEST_USERS,
        payload: newData,
      });
    });
  };

  const setIsLoading = (loading: boolean) => {
    dispatch({
      type: neoTypes.SET_LOADER,
      payload: loading,
    });
  };

  const setHomeLoader = (loading: boolean) => {
    dispatch({
      type: neoTypes.SET_HOME_LOADER,
      payload: loading,
    });
  };

  const setAdmin = (isValid: boolean) => {
    dispatch({
      type: neoTypes.SET_ADMIN,
      payload: isValid,
    });
  };

  const fetchEventDetails = async (eventId: string) => {
    if (isDummyUser) {
      let data = dummy_event_data.filter((event: any) => {
        return event.id == eventId;
      });
      dispatch({
        type: neoTypes.EVENT_DETAIL_ERROR,
        payload: false,
      });
      dispatch({
        type: neoTypes.SET_EVENT_DETAILS,
        payload: data[0],
      });
    } else {
      await eventService
        .getEvent(eventId)
        .then((res) => {
          let { data } = res.data;
          dispatch({
            type: neoTypes.EVENT_DETAIL_ERROR,
            payload: false,
          });
          if (data[0].created_by == userDetails.email) {
            setAdmin(true);
          }
          let adminData = data[0].gemini_admin?.filter(
            (e: string) => e.toLowerCase() == userDetails.email.toLowerCase()
          );
          if (data[0].created_by == userDetails.email) {
            setAdmin(true);
          } else if (adminData.length > 0) {
            setAdmin(true);
          } else {
            setAdmin(false);
          }
          setIsLoading(false);
          dispatch({
            type: neoTypes.SET_EVENT_DETAILS,
            payload: data[0],
          });
        })
        .catch((err) => {
          dispatch({
            type: neoTypes.EVENT_DETAIL_ERROR,
            payload: true,
          });
          setIsLoading(false);
        });
    }
  };

  const resetHandler = () => {
    let resetter = {
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
    };
    dispatch({
      type: neoTypes.SET_EVENT_DETAILS,
      payload: resetter,
    });
  };

  const setSocketAdd = (state: boolean) => {
    dispatch({
      type: neoTypes.SET_SOCKET,
      payload: state,
    });
  };
  const setSplashScreen = (state: boolean) => {
    dispatch({
      type: neoTypes.SPLASH_SCREEN,
      payload: state,
    });
  };

  const fetchQuizData = async () => {
    await quizService
      .fetchAllQuiz()
      .then((quizDataValue) => {
        dispatch({
          type: neoTypes.GET_QUIZ_ERROR,
          payload: false,
        });
        dispatch({
          type: neoTypes.FETCH_QUIZ_DATA,
          payload: quizDataValue.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: neoTypes.GET_QUIZ_ERROR,
          payload: false,
        });
      });
  };

  const fetchAppDocs = async (id: number) => {
    if (!isDummyUser) {
      await appServices
        .getDocData(id)
        .then((res) => {
          let response: appDocObj[] = [];
          res.data.result.map((item: appDocObj) => {
            if (
              (item.path?.length !== 0 && item.role === null) ||
              item?.role?.length === 0 ||
              item?.role?.includes(userDetails.email)
            ) {
              response.push(item);
            }
          });
          dispatch({
            type: neoTypes.GET_APP_DOC,
            payload: response,
          });
          dispatch({
            type: neoTypes.SET_DETAIL_ERROR,
            payload: false,
          });
          setDetailsLoading(false);
        })
        .catch(() => {
          dispatch({
            type: neoTypes.SET_DETAIL_ERROR,
            payload: true,
          });
          setDetailsLoading(false);
        });
    } else {
      setDetailsLoading(false);
    }
  };
  const setGuestLoading = (value: boolean) => {
    dispatch({
      type: neoTypes.SET_GUEST_LOADING,
      payload: value,
    });
  };

  let fetchHistoryData = async () => {
    await quizService
      .fetchHistory(userDetails.email.toLowerCase())
      .then((quizHistoryData) => {
        dispatch({
          type: neoTypes.GET_QUIZ_ERROR,
          payload: false,
        });
        dispatch({
          type: neoTypes.QUIZ_HISTORY_DATA,
          payload: quizHistoryData.data,
        });
        dispatch({
          type: neoTypes.SET_HISTORY_LOADER,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch({
          type: neoTypes.GET_QUIZ_ERROR,
          payload: false,
        });
        dispatch({
          type: neoTypes.SET_HISTORY_LOADER,
          payload: false,
        });
      });
  };

  const fetchLeaderboard = async () => {
    await quizService
      .fetchLeaderboard()
      .then((leaderBoardData) => {
        dispatch({
          type: neoTypes.GET_QUIZ_ERROR,
          payload: false,
        });
        dispatch({
          type: neoTypes.FETCH_LEADERBOARD,
          payload: leaderBoardData.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: neoTypes.GET_QUIZ_ERROR,
          payload: true,
        });
      });
  };

  return (
    <NeoContext.Provider
      value={{
        getLoginDetails,
        fetchAppData,
        updateTime,
        getUsers,
        setLoadDirectory,
        searchUsers,
        setResult,
        fetchUserEventsList,
        updateUserEvents,
        fetchGuestEvent,
        fetchGuestHandler,
        setGuestUser,
        updateGuest,
        setIsLoading,
        setSocketAdd,
        fetchEventDetails,
        resetHandler,
        fetchQuizData,
        fetchHistoryData,
        fetchLeaderboard,
        setHomeLoader,
        fetchAppDocs,
        updateUserDetails,
        setSplashScreen,
        setDetailsLoading,
        setGuestLoading,
        setHasPermission,
        setShowWarning,
        isDummyUser,
        isHomeLoading,
        eventDetails,
        users,
        currentPage,
        userDetails,
        appData,
        loadDirectory,
        filteredData,
        result,
        eventsList,
        backupList,
        guestUser,
        isLoading,
        socketAdd,
        isAdmin,
        quizData,
        userHistory,
        leaderBoardData,
        eventError,
        eventDetialError,
        directoryError,
        getQuizError,
        appDoc,
        homeSplashVisible,
        isDetailsLoading,
        historyLoader,
        detailError,
        isGuestLoading,
        hasPermission,
        showWarning,
      }}
    >
      {children}
    </NeoContext.Provider>
  );
};

export { NeoContext, NeoProvider };
