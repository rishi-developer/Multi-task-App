import axios from "./userApiConfig";

class UserDetailApiService {
getAllUsers() {
  return axios.get('/allUsers')
}

  getUserDetailsByEmail(emailId) {
    return axios.get(`?email=${emailId.toLowerCase()}`);
  }
  getAttendeesList(userDetails) {
    return axios.get("/attendees");
  }
  getUserDetailsByEmpId(empCode) {
    return axios.get(`empCode/?empcode=${empCode}`);
  }
  getUserDetails(page) {
    return axios.post("/users", { counter: page });
  }
  searchUser(name) {
    return axios.post("/searchUser", { empCode: name });
  }
  getToken(email) {
    return axios.post("/token", email);
  }
  getLoginDetails(email) {
    return axios.get(`/loginDetails?email=${email.toLowerCase()}`);
  }

  updateLoginDetails(loginDetails) {
    return axios.post("/updateLoginDetails", loginDetails);
  }

  getUserLocation(email) {
    return axios.get(`/fetchLocation?email=${email.toLowerCase()}`);
  }
}
export default UserDetailApiService;
