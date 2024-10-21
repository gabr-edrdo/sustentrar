const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  deviceId: String,
  password: String,
});

module.exports = mongoose.model("Device", DeviceSchema);
