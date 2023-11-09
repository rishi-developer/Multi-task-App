import axios from "./eventApiConfig";

class EventApiService {
  getEventList() {
    return axios.get("/");
  }
  getEvent(id) {
    let path = "/" + id;
    return axios.get(path);
  }
  getAttendance(id, isGuestUser) {
    let path = "/attendance/" + id + "/" + isGuestUser;
    return axios.get(path);
  }
  addEvent(eventData) {
    return axios.post("/add", eventData);
  }
  updateEvent(eventData, id) {
    let path = "/update/" + id;
    return axios.post(path, eventData);
  }
  deleteEvent(id) {
    let path = "/delete/" + id;
    return axios.delete(path);
  }
  updateEventsUser(id, users) {
    let path = "/updatebyId/" + id;
    return axios.post(path, {
      users: users.toLowerCase(),
      Date: new Date().toLocaleString(),
    });
  }
  getGuestEvent(id) {
    let path = "/guestEvent/" + id;
    return axios.get(path);
  }
}
export default EventApiService;
