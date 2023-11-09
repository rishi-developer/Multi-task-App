const newConnection = require("../database/db");
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");
const axios = require("axios");
const getUserDetails = async (req, res) => {
  let pool = newConnection();
  try {
    const email = req.query.email;
    let userDetails = await pool.query(
      "SELECT * FROM user_details WHERE LOWER(email_id) = $1",
      [email.toLowerCase()]
    );
    if (userDetails.rows.length === 0) {
      res
        .status(404)
        .json({ status: "failed", message: "User Does Not Exist" });
    } else {
      res.status(200).json({ status: "success", data: userDetails.rows });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const updateLoginDetails = async (req, res) => {
  let pool = newConnection();
  try {
    let { count, isExisting, email } = req.body;
    let current_time = moment().format("MMMM Do YYYY, h:mm:ss a");
    if (isExisting) {
      await pool.query(
        "UPDATE login_details SET count=$1, last_check_in=$2 WHERE email=$3",
        [count, current_time, email]
      );
      res.status(200).json({
        status: "success",
        message: "Login details updated successfully",
      });
    } else {
      await pool.query(
        "INSERT INTO login_details(email,first_check_in,last_check_in,count) VALUES ($1,$2,$3,$4)",
        [email, current_time, current_time, count]
      );
      res.status(200).json({
        status: "success",
        message: "Login details added successfully",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getLoginDetails = async (req, res) => {
  let pool = newConnection();
  try {
    let { email } = req.query;
    let loginDetails = await pool.query(
      "SELECT * FROM login_details WHERE email=$1",
      [email]
    );
    res.status(200).json({
      status: "success",
      data: loginDetails.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getLeaderBoard = async (req, res) => {
  let pool = newConnection();
  try {
    let leaderBoard = await pool.query(
      "SELECT * FROM user_details ORDER BY total_points DESC LIMIT 10"
    );
    res.status(200).json({
      status: "success",
      data: leaderBoard.rows,
    });
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};
const getUserDetailsByEmpCode = async (req, res) => {
  let pool = newConnection();
  try {
    const empCode = req.query.empcode;
    let userDetails = await pool.query(
      "SELECT * FROM user_details WHERE LOWER(emp_id) = $1",
      [empCode.toLowerCase()]
    );
    if (userDetails.rows.length === 0) {
      res
        .status(404)
        .json({ status: "failed", message: "User Does Not Exist" });
    } else {
      res.status(200).json({ status: "success", data: userDetails.rows });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getListOfAttendees = async (req, res) => {
  let pool = newConnection();
  try {
    let { users } = req.body;
    let attendeesDetail = [];
    await users.forEach(async (element) => {
      let user = await pool.query(
        "SELECT  * FROM user_details WHERE email_id = $1",
        [element.toLowerCase()]
      );
      attendeesDetail = [...attendeesDetail, ...user.rows];
      if (attendeesDetail.length == users.length) {
        res.status(200).json({
          status: "success",
          data: attendeesDetail,
        });
      }
    });
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const generateToken = async (req, res) => {
  try {
    const { email, token, isGuestUser } = req.body;
    if (!isGuestUser) {
      let response = axios.get(
        "https://graph.microsoft.com/v1.0/me/?$select=mail",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      response
        .then(async (result) => {
          if (email?.toLowerCase() === result?.data?.mail?.toLowerCase()) {
            var token1 = jwt.sign({ email: email, token: token }, "Gemini@123");
            res.json({
              error: false,
              token: token1,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.send(err);
        });
    } else {
      var token1 = jwt.sign({ email: email }, "Gemini@123");
      res.json({
        error: false,
        token: token1,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const fetchLocation = async (req, res) => {
  let pool = newConnection();
  try {
    const { email } = req.query;
    const location = await pool.query(
      "SELECT location FROM user_details WHERE LOWER(email_id) = $1",
      [email.toLowerCase()]
    );
    res.send(location.rows[0]);
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};
const filterUsingName = async (req, res) => {
  let pool = newConnection();
  try {
    const { empCode } = req.body;
    let userDetails = await pool.query(
      'SELECT * FROM user_details WHERE LOWER("name") LIKE $1',
      [`${empCode.toLowerCase()}%`]
    );
    res.send(userDetails.rows);
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};
const getUserByPage = async (req, res) => {
  let pool = newConnection();
  try {
    let { counter } = req.body;
    let leaderBoard = await pool.query(
      "SELECT * FROM user_details ORDER BY name OFFSET $1 ROWS FETCH NEXT 9 ROWS ONLY",
      [counter]
    );

    res.json(leaderBoard.rows);
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getAllUserDetails = async (req, res) => {
  let pool = newConnection();
  try {
    let userDetails = await pool.query("SELECT * from user_details");
    if (userDetails.rows.length === 0) {
      res.status(404).json({ status: "failed", message: "No User Exist" });
    } else {
      res.status(200).json({ status: "success", data: userDetails.rows });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

module.exports = {
  generateToken,
  getUserDetails,
  getLeaderBoard,
  getListOfAttendees,
  getUserDetailsByEmpCode,
  getUserByPage,
  filterUsingName,
  getLoginDetails,
  updateLoginDetails,
  fetchLocation,
  getAllUserDetails,
};