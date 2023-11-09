const newConnection = require("../database/db");

const updateLunchEvent = async () => {
  let pool = newConnection();
  try {
    const location = ["Gurugram", "Panchkula"];
    let a = new Date();
    let eventName =
      "Lunch event for " +
      a.toLocaleString("default", { month: "short" }) +
      " " +
      a.getDate();
    const startDate =
      a.toLocaleString("default", { month: "short" }) +
      "/" +
      ("0" + a.getDate()).slice(-2) +
      "/" +
      a.getFullYear();
    let existingEvents;
    try {
      existingEvents = await pool.query(
        "select * from event_details where start_date = $1",
        [startDate]
      );
    } catch (err) {
      console.log(err.message);
    }

    try {
      if (existingEvents.rows.length === 0) {
        location.map(async (area, inx) => {
          await pool.query(
            "INSERT INTO event_details (name,created,description,venue,city,admin_type,gemini_admin,guest_admin,guest_name,start_time,end_time,start_date,end_date,created_by,event_type,attendees_list) VALUES($1,current_timestamp,$2,$3,$4,$5,$6,$7,$8,$9,$10, $11, $12,$13,$14,$15)",
            [
              eventName,
              "Attendance For lunch event",
              area,
              [area],
              ["Gemini Admin", "Guest Admin"],
              [
                "aravind.srinivasan@geminisolutions.com",
                "shubham.rajkumar@geminisolutions.com",
                "sakshi.bhardwaj@geminisolutions.com",
              ],
              ["captainV%", "manisha72"],
              ["Captain", "manisha"],
              "12:00",
              "17:00",
              startDate,
              startDate,
              "",
              "Lunch",
              [],
            ]
          );
        });
      } else {
        pool.end();
      }
    } catch (err) {
      console.log(err.message);
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = updateLunchEvent;
