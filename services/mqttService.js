const SensorReading = require("../models/SensorReading");
const Device = require("../models/Device");
const { verifyToken } = require("../utils/jwtUtils");

const processMqttMessage = async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    const deviceId = topic.split("/")[1];

    const device = await Device.findOne({ deviceId });
    if (!device) return;

    const token = data.token;
    const authenticatedDeviceId = verifyToken(token);
    if (!authenticatedDeviceId || authenticatedDeviceId !== deviceId) return;

    const reading = new SensorReading({
      deviceId,
      co: data.co,
      particulate: data.particulate,
      temperature: data.temperature,
      humidity: data.humidity,
    });

    await reading.save();
    console.log(`Leitura salva para o dispositivo ${deviceId}`);
  } catch (error) {
    console.error("Erro ao processar mensagem MQTT:", error);
  }
};

module.exports = { processMqttMessage };
