const express = require("express");

const router = express.Router();

const {
  getStores,
  searchStore,
  submitRating,
} = require("../controllers/userController");

const {
  verifyToken,
} = require("../middleware/authMiddleware");

router.get("/stores", verifyToken, getStores);

router.get("/search", verifyToken, searchStore);

router.post("/rating", verifyToken, submitRating);

module.exports = router;