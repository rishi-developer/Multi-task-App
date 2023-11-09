import axios from "./quizApiConfig";

class quizApiService {
  submitQuizDetails(quizData) {
    let path = "/submit";
    return axios.post(path, quizData);
  }
  fetchHistory(id) {
    let path = "/history/" + id;
    return axios.get(path);
  }
  fetchAllQuiz() {
    let path = "/getQuiz";
    return axios.get(path);
  }

  fetchLeaderboard() {
    let path = "/leaderboard";
    return axios.get(path);
  }
}
export default quizApiService;
