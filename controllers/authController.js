const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Device = require("../models/Device");

exports.register = async (req, res) => {
  try {
    const { deviceId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const device = new Device({ deviceId, password: hashedPassword });
    await device.save();
    res.status(201).send("Dispositivo registrado");
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar dispositivo" });
  }
};

exports.login = async (req, res) => {
  try {
    const { deviceId, password } = req.body;
    const device = await Device.findOne({ deviceId });

    if (!device || !(await bcrypt.compare(password, device.password))) {
      return res.status(401).send("Credenciais inválidas");
    }

    const token = jwt.sign({ deviceId }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar login" });
  }
};
