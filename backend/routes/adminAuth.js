const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Hardcoded admin (for now)
const ADMIN = {
  id: "admin123",
  email: "admin@gmail.com",
  password: "123456",
  role: "admin",
};

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check credentials
  if (email !== ADMIN.email || password !== ADMIN.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create token
  const token = jwt.sign(
    { id: ADMIN.id, role: ADMIN.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // Send response (IMPORTANT for frontend)
  res.json({
    token,
    user: {
      id: ADMIN.id,
      email: ADMIN.email,
      role: ADMIN.role,
    },
  });
});

module.exports = router;