const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getRatings,
} = require("../controllers/ownerController");

const { verifyToken } = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, getDashboard);

router.get("/ratings", verifyToken, getRatings);

module.exports = router;