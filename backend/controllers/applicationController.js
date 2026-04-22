const Application = require("../models/Application");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const transporter = require("../config/email");

// 🔐 Generate Random Password
const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};

// 📌 Submit Application
exports.submitApplication = async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📌 Get All Applications (Admin)
exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ Approve Application
exports.approveApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    // ❌ Not found
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // ❌ Already approved (IMPORTANT FIX)
    if (application.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Application already approved",
      });
    }

    // ❌ User already exists
    const existingUser = await User.findOne({
      email: application.email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // 🔐 Generate Password
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 👤 Create User
    const user = new User({
      name: application.name,
      email: application.email,
      phone: application.phone,
      role: application.role,
      password: hashedPassword,
    });

    await user.save();

    // ✅ Update Status
    application.status = "approved";
    await application.save();

    // 📧 Send Email
    await transporter.sendMail({
      to: application.email,
      subject: "🎉 Application Approved - Venture Hub",
      html: `
        <h2>Congratulations ${application.name}</h2>
        <p>Your application as <b>${application.role}</b> has been approved.</p>
        <p><b>Email:</b> ${application.email}</p>
        <p><b>Password:</b> ${plainPassword}</p>
        <p>Please login and change your password.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Application approved & credentials sent",
    });

  } catch (error) {
    console.error("❌ Approve Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ❌ Reject Application
exports.rejectApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = "rejected";
    await application.save();

    res.status(200).json({
      success: true,
      message: "Application rejected",
    });
  } catch (error) {
    console.error("❌ Reject Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 📊 Analytics Dashboard Data
exports.getAnalytics = async (req, res) => {
  try {
    const total = await Application.countDocuments();

    const approved = await Application.countDocuments({
      status: "approved",
    });

    const pending = await Application.countDocuments({
      status: "pending",
    });

    const rejected = await Application.countDocuments({
      status: "rejected",
    });

    // 📈 Extra Pro Feature (role-wise stats)
    const roleStats = await Application.aggregate([
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        approved,
        pending,
        rejected,
        roleStats, // 🔥 bonus
      },
    });

  } catch (error) {
    console.error("❌ Analytics Error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};