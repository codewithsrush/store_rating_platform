const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const adminRoutes=require("./routes/adminRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/admin",adminRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Store Rating Platform Backend Running",
  });
});

app.use("/api/auth", authRoutes);

module.exports = app;