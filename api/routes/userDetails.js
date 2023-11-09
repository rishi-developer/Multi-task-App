const router = require("express").Router({ mergeParams: true });
const verifyToken = require("../middleware/verifyToken");
const userController = require("../controller/userController");

router.get("/", verifyToken, userController.getUserDetails);

router.get("/empCode", verifyToken, userController.getUserDetailsByEmpCode);

router.get("/leaderboard", verifyToken, userController.getLeaderBoard);

router.post("/token", userController.generateToken);

router.post("/users", verifyToken, userController.getUserByPage);

router.post("/searchUser", verifyToken, userController.filterUsingName);

router.get("/loginDetails", userController.getLoginDetails);

router.post("/updateLoginDetails", userController.updateLoginDetails);

router.get("/fetchLocation", verifyToken, userController.fetchLocation);

router.get("/allUsers",verifyToken,userController.getAllUserDetails)

module.exports = router;
