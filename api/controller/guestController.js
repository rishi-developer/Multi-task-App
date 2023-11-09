const newConnection = require("../database/db");
const jwt = require("jsonwebtoken");

const getGuestList = async (req, res) => {
  let pool = newConnection();
  try {
    const guestList = await pool.query(`SELECT * FROM guest_user`);
    res.status(200).json({
      status: "success",
      data: guestList.rows,
    });
  } catch (error) {
    res.send(error.message);
  } finally {
    pool.end();
  }
};

const updateGuestEvent = async (req, res) => {
  let pool = newConnection();
  try {
    const eventData = req.body;
    const userName = req.params.username;
    await pool.query("UPDATE guest_user SET events=$1 WHERE user_name=$2", [
      eventData.events,
      userName,
    ]);

    res.status(200).send("Events array updated successfully");
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};
const addGuestUser = async (req, res) => {
  let pool = newConnection();
  try {
    const guestData = req.body;
    await pool.query(
      "INSERT INTO guest_user (name,user_name,password,token,is_guest_user,events) VALUES($1,$2,$3,$4,$5,$6)",
      [
        guestData.name,
        guestData.username,
        guestData.password,
        guestData.token,
        guestData.isGuestUser,
        guestData.events,
      ]
    );
    try {
      guestData.events.map(async (event) => {
        await pool.query(
          "UPDATE event_details SET guest_admin= ARRAY_APPEND(guest_admin,$1),guest_name = ARRAY_APPEND(guest_name,$2) WHERE id=$3",
          [guestData.username, guestData.name, event]
        );
      });
      res.status(200).json({
        status: "success",
        message: "User Added Successfully",
      });
    } catch (err) {
      res.send(err.message);
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const login = async (req, res) => {
  let pool = newConnection();
  const { username, password } = req.body;
  const user = await pool.query(
    "SELECT * FROM guest_user WHERE user_name=$1 ",
    [username]
  );
  if (user.rows.length == 0) {
    res.status(200).json({ status: 403, message: "Unauthorised User" });
  } else if (user.rows[0].password == password) {
    res.status(200).json({
      error: false,
      message: "Validation successful!",
      token: user.rows[0].token,
    });
  } else {
    res.json({ status: 400, message: "Invalid password" });
  }
  pool.end();
};

const updateToken = async (req, res) => {
  const { username } = req.params;
  const token = req.query.token;
  let pool = newConnection();
  try {
    const user = await pool.query(
      "UPDATE guest_user SET token=$1 WHERE user_name=$2 RETURNING *",
      [token, username]
    );
    if (user.rows.length > 0) {
      res
        .status(200)
        .json({ status: "success", message: "Logout Successfully" });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};
const deleteGuest = async (req, res) => {
  let pool = newConnection();
  const { username } = req.params;
  await pool.query("DELETE FROM guest_user WHERE user_name=$1 ", [username]);
  res
    .status(200)
    .json({ status: "success", message: "Guest User Deleted Successfully" });

  pool.end();
};

module.exports = {
  getGuestList,
  addGuestUser,
  login,
  updateToken,
  deleteGuest,
  updateGuestEvent,
};