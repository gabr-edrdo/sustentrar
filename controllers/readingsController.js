const SensorReading = require("../models/SensorReading");

exports.getLatestReading = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const reading = await SensorReading.findOne({ deviceId }).sort({
      timestamp: -1,
    });
    res.json(reading);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar leitura mais recente" });
  }
};

exports.getReadings = async (req, res) => {
  const { deviceId } = req.params;
  const { startDate, endDate, page = 1, limit = 100 } = req.query;
  
  try {
    const readings = await SensorReading.find({
      deviceId,
      timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
    })
      .sort({ timestamp: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await SensorReading.countDocuments({
      deviceId,
      timestamp: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    res.json({
      readings,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar leituras" });
  }
};
