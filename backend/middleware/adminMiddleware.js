const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    req.user = decoded; // Attach decoded user
    next();
  } catch (error) {
    console.error("Admin middleware error:", error.message);
    res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = adminMiddleware;