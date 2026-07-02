const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getUsers,
  getStores,
  addUser,
  addStore,
} = require("../controllers/adminController");

const {
  verifyToken,
  isAdmin,
} = require("../middleware/authMiddleware");

router.get("/dashboard", verifyToken, isAdmin, getDashboard);

router.get("/users", verifyToken, isAdmin, getUsers);

router.post("/users", verifyToken, isAdmin, addUser);

router.get("/stores", verifyToken, isAdmin, getStores);

router.post("/stores", verifyToken, isAdmin, addStore);

module.exports = router;