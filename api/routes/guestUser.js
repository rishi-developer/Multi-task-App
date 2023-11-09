const router = require("express").Router({ mergeParams: true });
const verifyToken = require("../middleware/verifyToken");
const guestController = require("../controller/guestController");

router.get("/", verifyToken, guestController.getGuestList);

router.post("/add", verifyToken, guestController.addGuestUser);
router.post("/login", verifyToken, guestController.login);

router.put("/update/:username/", verifyToken, guestController.updateToken);

router.post(
  "/update/guestEvent/:username",
  verifyToken,
  guestController.updateGuestEvent
);

router.delete("/:username", verifyToken, guestController.deleteGuest);

module.exports = router;
