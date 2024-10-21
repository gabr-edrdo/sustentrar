const mqtt = require("mqtt");

const client = mqtt.connect(process.env.MQTT_BROKER_URL);

client.on("connect", () => {
  console.log("Conectado ao broker MQTT");
  client.subscribe("sensors/#");
});

module.exports = client;
