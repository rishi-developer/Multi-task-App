import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `https://eapi.geminisolutions.com/neo/appData`,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
