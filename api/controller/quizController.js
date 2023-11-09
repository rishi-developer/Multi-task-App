const newConnection = require("../database/db");

const fetchHistory = async (req, res) => {
  let pool = newConnection();
  try {
    const emailId = req.params.id;
    const quizHistory = await pool.query(
      `SELECT history FROM quiz_history WHERE email='${emailId.toLowerCase()}'`
    );
    if (quizHistory.rows.length < 1) {
      res.status(200).send(quizHistory.rows);
    } else {
      let response = quizHistory.rows.map((history) => {
        return JSON.stringify(history).replaceAll("\\\\", "");
      });
      let array = JSON.parse(response).history;
      array = array.map((item) => {
        return JSON.parse(item);
      });
      res.status(200).send(array);
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getQuizList = async (req, res) => {
  let pool = newConnection();
  try {
    let quizList = await pool.query(`SELECT * FROM quiz_details`);
    let quizListArray = [];
    quizList.rows.map((quizData) => {
      let response = quizData.questionare.map((questions) => {
        return JSON.parse(
          JSON.parse(JSON.stringify(questions).replaceAll("\\\\", ""))
        );
      });
      let data = {
        basic_details: { id: quizData.id, ...quizData.basic_details },
        id: quizData.id,
        questionare: response,
        submitted_user: quizData.submitted_user,
      };
      quizListArray.push(data);
    });
    res.status(200).send(quizListArray);
  } catch (error) {
    res.send(error.message);
  } finally {
    pool.end();
  }
};

const fetchLeaderBoard = async (req, res) => {
  let pool = newConnection();
  try {
    const leaderBoardData = await pool.query(
      `SELECT * FROM user_details ORDER BY total_points DESC LIMIT 10`
    );
    res.status(200).json(leaderBoardData.rows);
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const submit = async (req, res) => {
  let pool = newConnection();
  try {
    let {
      emailId,
      quizId,
      correctAnswers,
      wrongAnswer,
      points,
      quizName,
      stats,
      timeTaken,
      totalQuestions,
      quizLogo,
    } = req.body;
    await pool.query(
      `UPDATE quiz_details SET submitted_user = ARRAY_APPEND(submitted_user,$1) WHERE id=$2`,
      [emailId.toLowerCase(), quizId]
    );
    const quizHistory = await pool.query(
      `SELECT history FROM quiz_history WHERE email='${emailId.toLowerCase()}'`
    );
    if (quizHistory.rows.length == 0)
      addNewUser({
        emailId,
        quizId,
        correctAnswers,
        wrongAnswer,
        points,
        quizName,
        stats,
        timeTaken,
        totalQuestions,
        quizLogo,
      });
    else
      adddata({
        emailId,
        quizId,
        correctAnswers,
        wrongAnswer,
        points,
        quizName,
        stats,
        timeTaken,
        totalQuestions,
        quizLogo,
      });

    let totalPoints = await pool.query(
      `SELECT total_points FROM user_details WHERE email_id='${emailId.toLowerCase()}'`
    );
    await pool.query(
      `UPDATE user_details SET total_points=${
        totalPoints.rows[0].total_points + points
      } WHERE email_id='${emailId.toLowerCase()}'`
    );
    res.send("Data Added Succesfully");
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const adddata = async ({
  emailId,
  correctAnswers,
  wrongAnswer,
  points,
  quizName,
  stats,
  timeTaken,
  totalQuestions,
  quizLogo,
}) => {
  let pool = newConnection();
  try {
    let data = {
      correctAnswers: correctAnswers,
      quizLogo: quizLogo,
      quizName: quizName,
      stats: stats,
      timeTaken: timeTaken,
      points: points,
      totalQuestions: totalQuestions,
      wrongAnswer: wrongAnswer,
    };
    await pool.query(
      "UPDATE quiz_history SET history= ARRAY_APPEND(history,$1) WHERE email=$2",
      [data, emailId.toLowerCase()]
    );
  } catch (err) {
    console.log(err.message);
  } finally {
    pool.end();
  }
};

const addNewUser = async ({
  emailId,
  correctAnswers,
  wrongAnswer,
  points,
  quizName,
  stats,
  timeTaken,
  totalQuestions,
  quizLogo,
}) => {
  let pool = newConnection();

  try {
    let newUserHIstory = [
      JSON.stringify({
        correctAnswers: correctAnswers,
        quizLogo: quizLogo,
        quizName: quizName,
        stats: stats,
        timeTaken: timeTaken,
        points: points,
        totalQuestions: totalQuestions,
        wrongAnswer: wrongAnswer,
      }),
    ];
    await pool.query(
      `INSERT INTO quiz_history (email,history) VALUES ($1,$2);`,
      [emailId.toLowerCase(), newUserHIstory]
    );
  } catch (err) {
    console.log(err.message);
  } finally {
    pool.end();
  }
};

const addQuiz = async (req, res) => {
  let pool = newConnection();
  try {
    const quizData = req.body;
    const newQuiz = await pool.query(
      "INSERT INTO quiz_details (basic_details,questionare,submitted_user) VALUES ($1,$2,$3) returning * ",
      [quizData.basic_details, quizData.questionare, quizData.submitteduser]
    );
    res.status(200).send(newQuiz.rows);
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getQuiz = async (req, res) => {
  let pool = newConnection();
  try {
    let quizID = req.params.id;
    let quizes = await pool.query(
      `SELECT * FROM quiz_details WHERE id = '${quizID}'  `
    );
    if (quizes.rows.length === 0) {
      res.status(404).send("Quiz not found");
    } else {
      res.status(200).send(quizes.rows);
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const updateQuiz = async (req, res) => {
  let pool = newConnection();
  try {
    let quizID = req.params.id;
    const updateData = req.body;
    let quizes = await pool.query(
      `SELECT * FROM quiz_details WHERE id = '${quizID}'  `
    );
    if (quizes.rows.length === 0) {
      res.status(404).send("Quiz not found");
    } else {
      const updateQuiz = await pool.query(
        "UPDATE quiz_details SET basic_details =$1,questionare= $2,submitted_user=$3 WHERE id = $4 returning *",
        [
          updateData.basic_details,
          updateData.questionare,
          updateData.submitteduser,
          quizID,
        ]
      );

      res.status(200).send(updateQuiz.rows);
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const deleteQuiz = async (req, res) => {
  let pool = newConnection();
  try {
    let quizID = req.params.id;
    let quizes = await pool.query(
      `SELECT * FROM quiz_details WHERE id = '${quizID}'  `
    );
    if (quizes.rows.length === 0) {
      res.status(404).send("Quiz not found");
    } else {
      const deleteQuiz = await pool.query(
        `DELETE FROM quiz_details WHERE id = '${quizID}' `
      );
    }
    res.status(200).send(deleteQuiz.rows);
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

module.exports = {
  getQuizList,
  addQuiz,
  getQuiz,
  updateQuiz,
  deleteQuiz,
  submit,
  fetchHistory,
  fetchLeaderBoard,
};