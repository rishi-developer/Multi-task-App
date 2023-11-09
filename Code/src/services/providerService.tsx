import axios from "axios";
import * as SecureStore from "expo-secure-store";
import qs from "qs";
import GuestApiService from "./api/GuestApi/guestApiServices";
import UserDetailApiService from "./api/UserApi/userApiServices";
import { gemLogin } from "./apiInterceptors";

export const generateToken = async (email: string) => {
  const userService = new UserDetailApiService();
  const userPayload = {
    token: "",
    email: email,
    isGuestUser: false,
  };
  try {
    const value = await SecureStore.getItemAsync("access_token");
    if (value !== null) {
      userPayload.token = value;
      const res = await userService.getToken(userPayload);
      return {
        error: false,
        data: gemLogin(res.data.token),
      };
    }
  } catch (err:any) {
    return {
      error: true,
      errorMsg: err.message,
    };
  }
};
export const getRefreshToken = async (token: string) => {
  let tokenData;
  const headers = new Headers();
  headers.append("Content-type", "application/x-www-form-urlencoded");
  var data = qs.stringify({
    client_id: process.env["CLIENT_ID"],
    grant_type: "refresh_token",
    scope: "openid",
    refresh_token: `${token}`,
  });
  var config: any = {
    method: "post",
    url: "https://login.microsoftonline.com/b9806c7d-9280-4e44-afea-6dc0ff495c2f/oauth2/v2.0/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "fpc=AtqBD5gLdApMjM3Bw60J7uIA9KACAQAAAOxzodoOAAAA; stsservicecookie=estsfd; x-ms-gateway-slice=estsfd",
    },
    data: data,
  };
  try {
    const res = await axios(config);

    tokenData = { error: false, ...res.data };
  } catch (err: any) {
    tokenData = {
      error: true,
      errorMsg: err.message,
    };
  }
  return tokenData;
};

export const getUserDetails = async (email: string) => {
  const userService = new UserDetailApiService();
  let response;
  try {
    response = await userService
      .getUserDetailsByEmail(email)
      .then((res) => {
        return {
          error: false,
          data: res.data,
        };
      })
      .catch((err) => {
        return {
          error: true,
          errorMsg: err.message,
        };
      });
    return response;
  } catch (err: any) {
    return {
      error: true,
      errorMsg: err.message,
    };
  }
};

export const updateLoginDetails = async (email: string) => {
  const userService = new UserDetailApiService();
  const res = await userService.getLoginDetails(email);
  let { data } = res.data;
  if (data.length > 0) {
    let newLoginDetails = {
      count: parseInt(data[0].count) + 1,
      isExisting: true,
      email: email.toLowerCase(),
    };
    await userService.updateLoginDetails(newLoginDetails);
  } else {
    let newLoginDetails = {
      count: 1,
      isExisting: false,
      email: email.toLowerCase(),
    };
    await userService.updateLoginDetails(newLoginDetails);
  }
};

export const addToken = async (id: any, token: any) => {
  let GuestService = new GuestApiService();
  GuestService.updateGuestUser(id, token).catch((err) =>
    console.log(err.message)
  );
};
