const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Kirish rad etildi. Token yo'q" });
  }

  try {
    const token = authHeader.split(" ")[1] || authHeader;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Yaroqsiz token yoki token muddati tugagan" });
  }
};
