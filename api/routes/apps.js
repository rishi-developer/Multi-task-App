const router = require("express").Router({ mergeParams: true });
const appsController = require("../controller/appsController");

router.post("/addAppData", appsController.addAppsData);

router.get("/", appsController.getAppsData);

router.get("/appDoc", appsController.getAppDoc);

router.post("/appDoc/add", appsController.addAppDoc);

module.exports = router;
