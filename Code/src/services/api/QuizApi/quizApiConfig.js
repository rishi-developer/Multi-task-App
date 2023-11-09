import axios from "axios";
import { localhost } from "@env";
const axiosQuixInstance = axios.create({
  baseURL: `https://eapi.geminisolutions.com/neo/quiz`,
  headers: {
    "Content-type": "application/json",
  },
});

export default axiosQuixInstance;
