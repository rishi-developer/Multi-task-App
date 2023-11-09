const newConnection = require("../database/db");
const moment = require("moment/moment");

const updateRetention = async () => {
  let pool = newConnection();
  try {
    let currentDate = moment().subtract(1, "day").format("L");
    const loginData = await pool.query("SELECT * FROM login_details");
    let allUserOnParticularDay = loginData.rows.filter((newEntry) => {
      let lastCheckInDate = moment(
        newEntry.last_check_in,
        "MMMM Do YYYY, h:mm a"
      ).toISOString();
      return (
        Date.parse(currentDate) ===
        Date.parse(moment(lastCheckInDate).format("L"))
      );
    });
    let newUser = allUserOnParticularDay.filter((user) => {
      let firstCheckInDate = moment(
        user.first_check_in,
        "MMMM Do YYYY, h:mm a"
      ).toISOString();
      let lastCheckInDate = moment(
        user.last_check_in,
        "MMMM Do YYYY, h:mm a"
      ).toISOString();

      return (
        Date.parse(moment(firstCheckInDate).format("L")) ===
        Date.parse(moment(lastCheckInDate).format("L"))
      );
    });
    let existingData = await pool.query(
      "SELECT * FROM user_retention where  split_part( date , ',' , 1) = $1",
      [moment().subtract(1, "day").format("MMMM Do YYYY")]
    );

    if (existingData.rows.length === 0) {
      await pool.query(
        "INSERT INTO user_retention(date,new_user,old_user) VALUES ($1,$2,$3)",
        [
          moment().subtract(1, "day").format("MMMM Do YYYY, h:mm a"),
          newUser.length,
          allUserOnParticularDay.length - newUser.length,
        ]
      );
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = updateRetention;
