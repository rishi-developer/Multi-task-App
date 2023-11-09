const router = require("express").Router({ mergeParams: true });
const quizController = require("../controller/quizController");
const verifyToken=require('../middleware/verifyToken')

router.get("/getQuiz",verifyToken, quizController.getQuizList);

router.post("/add",verifyToken, quizController.addQuiz);

router.post("/update/:id",verifyToken, quizController.updateQuiz);

router.delete("/delete/:id",verifyToken, quizController.deleteQuiz);

router.post("/submit",verifyToken, quizController.submit);

router.get("/history/:id",verifyToken, quizController.fetchHistory);

router.get("/leaderboard",verifyToken, quizController.fetchLeaderBoard);

router.get("/:id",verifyToken, quizController.getQuiz);

module.exports = router;
