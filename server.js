require("dotenv").config();
const path = require("path");
const express = require("express");
const connectDB = require("./config/database");
const mqttClient = require("./config/mqtt");
const authRoutes = require("./routes/auth");
const readingsRoutes = require("./routes/readings");
const { processMqttMessage } = require("./services/mqttService");

const app = express();
const port = process.env.PORT || 3000;

// Seta o caminho e o EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Rota / (home)
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.render("index");
});

// Conecta ao MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rotas
app.use("/auth", authRoutes);
app.use("/readings", readingsRoutes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Configura o cliente MQTT
mqttClient.on("message", processMqttMessage);
