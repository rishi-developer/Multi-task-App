import axios from "axios";
const axiosInstance = axios.create({
  baseURL: `https://eapi.geminisolutions.com/neo/userDetails/`,

  headers: {
    "Content-type": "application/json",
  },
});

export default axiosInstance;
