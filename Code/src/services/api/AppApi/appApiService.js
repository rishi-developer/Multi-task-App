import axios from "./appApiConfig";

class AppApiService {
  getAppData() {
    return axios.get("/");
  }

  getDocData(id,limit){
    return axios.get(`/appDoc?id=${id}&limit=${limit}`)
  }
}
export default AppApiService;
