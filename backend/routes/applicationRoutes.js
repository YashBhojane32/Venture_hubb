const express = require("express");
const router = express.Router();

const applicationController = require("../controllers/applicationController");
router.get("/analytics", applicationController.getAnalytics);

// 📌 Routes
router.post("/", applicationController.submitApplication);
router.get("/", applicationController.getApplications);
router.put("/:id/approve", applicationController.approveApplication);
router.put("/:id/reject", applicationController.rejectApplication);

module.exports = router;