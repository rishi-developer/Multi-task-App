import axios from "axios";
import qs from "qs";
import * as SecureStore from "expo-secure-store";

export const getToken = async (token: string) => {
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
    },
    data: data,
  };
  await axios(config)
    .then((res) => {
      const { refresh_token, access_token } = res.data;
      SecureStore.setItemAsync("refresh_token", refresh_token);
      SecureStore.setItemAsync("access_token", access_token);
    })
    .catch((err) => {
      throw err;
    });
};

export const getRefreshToken = async () => {
  try {
    const value = await SecureStore.getItemAsync("refresh_token");
    if (value != null) {
      await getToken(value);
    }
  } catch (err) {
    throw err;
  }
};
