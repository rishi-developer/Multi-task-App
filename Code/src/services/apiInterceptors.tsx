import eventInstance from "./api/EventApi/eventApiConfig";
import guestInstance from "./api/GuestApi/guestApiConfig";
import quizInstance from "./api/QuizApi/quizApiConfig";
import userInstance from "./api/UserApi/userApiConfig";

export const gemLogin = (access_token: any) => {
  eventInstance.interceptors.request.use((config: any) => {
    config.headers["x-access-token"] = access_token;
    return config;
  });
  quizInstance.interceptors.request.use((config: any) => {
    config.headers["x-access-token"] = access_token;
    return config;
  });
  userInstance.interceptors.request.use((config: any) => {
    config.headers["x-access-token"] = access_token;
    return config;
  });
  guestInstance.interceptors.request.use((config: any) => {
    config.headers["x-access-token"] = access_token;
    return config;
  });
};

export const guestLogin = (access_token: any) => {
  eventInstance.interceptors.request.use((config: any) => {
    config.headers["x-access-token"] = access_token;
    return config;
  });
  guestInstance.interceptors.request.use((config: any) => {
    config.headers["x-access-token"] = access_token;
    return config;
  });
  userInstance.interceptors.request.use((config: any) => {
    config.headers["x-access-token"] = access_token;
    return config;
  });
};
