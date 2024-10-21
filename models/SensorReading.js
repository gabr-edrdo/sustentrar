const mongoose = require("mongoose");

const SensorReadingSchema = new mongoose.Schema({
  deviceId: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  co: { type: Number },
  particulate: { type: Number },
  temperature: { type: Number },
  humidity: { type: Number },
});

module.exports = mongoose.model("SensorReading", SensorReadingSchema);
