const jwt = require("jsonwebtoken");

exports.verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.deviceId;
  } catch (error) {
    console.error("Token inválido:", error);
    return null;
  }
};
