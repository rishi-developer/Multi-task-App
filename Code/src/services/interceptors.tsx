import axios from "axios";
import { getRefreshToken } from "./tokenService";
const axiosInterceptors = axios.create();

axiosInterceptors.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    console.log(err);
  }
);

axiosInterceptors.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    try {
      await getRefreshToken();
      return axiosInterceptors;
    } catch (err) {
      throw err;
    }
  }
);

export default axiosInterceptors;
