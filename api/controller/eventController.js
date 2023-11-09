const newConnection = require("../database/db");
const isWithinLastWeek = require("../middleware/isWithinLastWeek");
const getEventList = async (req, res) => {
  let pool = newConnection();
  try {
    const eventList = await pool.query(
      `SELECT id,name,created,description,venue,city,admin_type,gemini_admin,guest_name,start_time,end_time,start_date,end_date,created_by,event_type FROM event_details ORDER BY TO_DATE("end_date",'Mon DD YYYY') DESC, TO_TIMESTAMP("start_time",'HH24 MI') DESC`
    );

    let response = eventList.rows.filter((event) => {
      return isWithinLastWeek(event.end_date);
    });
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.send(error.message);
  } finally {
    pool.end();
  }
};

const addEvent = async (req, res) => {
  let pool = newConnection();
  try {
    const eventData = req.body;
    let eventDetails = await pool.query(
      "INSERT INTO event_details (name,created,description,venue,city,admin_type,gemini_admin,guest_admin,guest_name,start_time,end_time,start_date,end_date,created_by,event_type,attendees_list) VALUES($1,current_timestamp,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) returning *",
      [
        eventData.eventName,
        eventData.eventDesc,
        eventData.venue,
        eventData.city,
        eventData.adminType,
        eventData.geminiAdmin,
        eventData.guestAdmin,
        eventData.guestName,
        eventData.startTime,
        eventData.endTime,
        eventData.startDate,
        eventData.endDate,
        eventData.createdBy,
        eventData.eventType,
        eventData.users,
      ]
    );
    if (eventData.guestAdmin.length !== 0) {
      eventData.guestAdmin.map(async (user) => {
        const setEvent = await pool.query(
          "UPDATE guest_user SET events= array_append(events,$1) where user_name=$2",
          [eventDetails.rows[0].id, user]
        );
      });
    }

    res.status(201).json({
      status: "success",
      message: "Event Added Successfully",
    });
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getGuestEvent = async (req, res) => {
  let pool = newConnection();
  try {
    let guestId = req.params.id;
    let events = await pool.query(
      `SELECT * FROM event_details WHERE $1=ANY("guest_admin")  ORDER BY TO_DATE("end_date",'Mon DD YYYY') DESC, TO_TIMESTAMP("start_time",'HH24 MI') DESC`,
      [guestId]
    );
    let response = events.rows?.map((event) => {
      let attendees = event.attendees_list.map((e) => {
        return JSON.parse(JSON.parse(JSON.stringify(e).replaceAll("\\\\", "")));
      });
      return {
        ...event,
        attendees_list: attendees,
      };
    });
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getEvent = async (req, res) => {
  let pool = newConnection();
  try {
    let eventID = req.params.id;
    let events = await pool.query("SELECT * FROM event_details WHERE id = $1", [
      eventID,
    ]);
    if (events.rows.length === 0) {
      res.status(404).json({
        status: "failed",
        message: "Event Not Found",
      });
    } else {
      let response = events.rows?.map((event) => {
        let attendees = event.attendees_list.map((e) => {
          return JSON.parse(
            JSON.parse(JSON.stringify(e).replaceAll("\\\\", ""))
          );
        });
        return {
          ...event,
          attendees_list: attendees,
        };
      });
      res.status(200).json({
        status: "success",
        data: response,
      });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const updateEvent = async (req, res) => {
  let pool = newConnection();
  try {
    let eventID = req.params.id;
    const updateData = req.body;
    let events = await pool.query("SELECT * FROM event_details WHERE id = $1", [
      eventID,
    ]);
    if (events.rows.length === 0) {
      res.status(404).json({
        status: "failed",
        message: "Event Not Found",
      });
    } else {
      await pool.query(
        "UPDATE event_details SET name = $1, description = $2,venue = $3, city= $4,admin_type= $5, gemini_admin= $6,guest_admin= $7,guest_name= $8,start_time= $9,end_time= $10,start_date= $11,end_date= $12,event_type= $13,attendees_list= $14 WHERE id = $15 returning *",
        [
          updateData.eventName,
          updateData.eventDesc,
          updateData.venue,
          updateData.city,
          updateData.adminType,
          updateData.geminiAdmin,
          updateData.guestAdmin,
          updateData.guestName,
          updateData.startTime,
          updateData.endTime,
          updateData.startDate,
          updateData.endDate,
          updateData.eventType,
          updateData.users,
          eventID,
        ]
      );
      res.status(200).json({
        status: "success",
        message: "Event Updated Successfully",
      });
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const updateEventUsers = async (req, res) => {
  let pool = newConnection();
  try {
    let eventID = req.params.id;
    const updateData = req.body;
    let events = await pool.query("SELECT * FROM event_details WHERE id = $1", [
      eventID,
    ]);
    let response = events.rows?.map((event) => {
      let attendees = event.attendees_list.map((e) => {
        return JSON.parse(JSON.parse(JSON.stringify(e).replaceAll("\\\\", "")));
      });
      return {
        ...event,
        attendees_list: attendees,
      };
    });
    if (response.length === 0) {
      res.status(404).json({
        status: "failed",
        message: "Event Not Found",
      });
    } else {
      let attendeesIndex = response[0].attendees_list.findIndex((inx) => {
        return inx.users === updateData.users;
      });
      if (attendeesIndex > -1) {
        res.status(200).json({
          status: "failed",
          message: "Duplicate Data",
        });
      } else {
        await pool.query(
          'UPDATE event_details SET "attendees_list"= ARRAY_APPEND("attendees_list",$1) WHERE id = $2 RETURNING *',
          [updateData, eventID]
        );
        res.status(200).json({
          status: "success",
          message: "Event Updated Successfully",
        });
      }
    }
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const deleteEvent = async (req, res) => {
  let pool = newConnection();
  try {
    let eventID = req.params.id;
    let events = await pool.query("SELECT * FROM event_details WHERE id = $1", [
      eventID,
    ]);
    if (events.rows.length === 0) {
      res.status(404).json({
        status: "failed",
        message: "Event Not Found",
      });
    } else {
      await pool.query("DELETE FROM event_details WHERE id = $1 ", [eventID]);
    }
    res
      .status(200)
      .json({ status: "success", message: "Event Deleted Successfully" });
  } catch (err) {
    res.send(err.message);
  } finally {
    pool.end();
  }
};

const getAttendenceList = async (req, res) => {
  let eventID = req.params.id;
  let role = req.params.role;
  let pool = newConnection();
  try {
    if (role === "false" || role === "true") {
      let events = await pool.query(
        "SELECT attendees_list FROM event_details WHERE id = $1",
        [eventID]
      );
      let response = events.rows[0].attendees_list.map(async (attendee) => {
        let users = JSON.parse(attendee);
        let getList = await pool.query(
          "SELECT  name FROM user_details WHERE LOWER(email_id)=$1",
          [users.users.toLowerCase()]
        );
        return {
          ...getList.rows[0],
        };
      });

      Promise.all(response).then((result) =>
        res.status(200).json({
          error: false,
          status: "success",
          data: result,
        })
      );
    } else {
      throw new Exception("Invalid User");
    }
  } catch (err) {
    res.json({
      error: true,
      message: err.message,
    });
  } finally {
    pool.end();
  }
};

module.exports = {
  getEventList,
  addEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  updateEventUsers,
  getGuestEvent,
  getAttendenceList,
};