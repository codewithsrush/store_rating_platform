const express = require("express");
const router = express.Router();

const { getDashboard, getRatings } = require("../controllers/ownerController");
const { getStoreSummary } = require("../controllers/aiController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, getDashboard);
router.get("/ratings", verifyToken, getRatings);
router.get("/ai-summary/:storeId", verifyToken, getStoreSummary);

module.exports = router;