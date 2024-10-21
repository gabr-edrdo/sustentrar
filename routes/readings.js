const express = require("express");
const router = express.Router();
const readingsController = require("../controllers/readingsController");

router.get("/latest/:deviceId", readingsController.getLatestReading);
router.get("/:deviceId", readingsController.getReadings);

module.exports = router;
