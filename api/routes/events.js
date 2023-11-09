const router = require("express").Router({ mergeParams: true });
const eventController = require("../controller/eventController");
const verifyToken = require("../middleware/verifyToken");

router.get("/", verifyToken, eventController.getEventList);

router.post("/add", verifyToken, eventController.addEvent);

router.get("/:id", verifyToken, eventController.getEvent);

router.post("/updatebyId/:id", verifyToken, eventController.updateEventUsers);

router.post("/update/:id", verifyToken, eventController.updateEvent);

router.delete("/delete/:id", verifyToken, eventController.deleteEvent);

router.get("/guestEvent/:id", verifyToken, eventController.getGuestEvent);

router.get("/attendance/:id/:role", eventController.getAttendenceList);

module.exports = router;
