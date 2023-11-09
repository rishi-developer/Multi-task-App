import axios from "./guestApiConfig";

class GuestApiService {
  getGuestList() {
    return axios.get("");
  }
  addGuestUser(guestUserDetail) {
    return axios.post("add", guestUserDetail);
  }
  login(guestUserDetail) {
    return axios.post("login", guestUserDetail);
  }
  updateGuestUser(username, token) {
    let path = "update/" + username + "?token=" + token;
    return axios.put(path);
  }
  updateGuestEvent(data, username) {
    let path = "/update/guestEvent/" + username;
    return axios.post(path, data);
  }
  deleteGuestUser(id) {
    let path = "delete/" + id;
    return axios.delete(path);
  }
}
export default GuestApiService;
