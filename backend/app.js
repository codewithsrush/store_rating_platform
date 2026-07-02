const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes=require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const ownerRoutes = require("./routes/ownerRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin",adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/owner", ownerRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Store Rating Platform Backend Running",
  });
});

app.use("/api/auth", authRoutes);

module.exports = app;