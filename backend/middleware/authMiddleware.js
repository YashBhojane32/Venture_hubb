const jwt = require("jsonwebtoken");
const User = require("../models/user");

// 🔐 PROTECT ROUTE (LOGIN REQUIRED)
exports.protect = async (req, res, next) => {
  try {
    let token;

    console.log("Authorization Header:", req.headers.authorization);

    // ✅ Extract token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log("Extracted Token:", token);

    // ❌ If no token
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    let decoded;

    // ✅ Verify token safely
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.error("❌ JWT Verify Error:", err.message);

      // Handle specific JWT errors
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired. Please login again",
        });
      }

      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    // ✅ Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");

    // ❌ If user not found
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ✅ Attach user to request
    req.user = user;

    next();

  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error in authentication",
    });
  }
};

// 🔐 ADMIN ONLY ACCESS
exports.adminOnly = (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admin only",
      });
    }

    next();

  } catch (error) {
    console.error("❌ Admin Middleware Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error in admin authorization",
    });
  }
};

// 🔐 ROLE-BASED ACCESS CONTROL (ADVANCED)
exports.allowRoles = (...roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `Access denied. Allowed roles: ${roles.join(", ")}`,
        });
      }

      next();

    } catch (error) {
      console.error("❌ Role Middleware Error:", error.message);

      return res.status(500).json({
        success: false,
        message: "Server error in role authorization",
      });
    }
  };
};