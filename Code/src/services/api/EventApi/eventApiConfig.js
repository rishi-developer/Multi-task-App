import axios from "axios";
import { localhost } from "@env";
const axiosInstance = axios.create({
  baseURL: `https://eapi.geminisolutions.com/neo/events`,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
