const db = require("../config/db");
const bcrypt = require("bcrypt");

// Dashboard
const getDashboard = (req, res) => {
  db.query("SELECT COUNT(*) AS totalUsers FROM users", (err1, users) => {
    if (err1) return res.status(500).json(err1);

    db.query("SELECT COUNT(*) AS totalStores FROM stores", (err2, stores) => {
      if (err2) return res.status(500).json(err2);

      db.query("SELECT COUNT(*) AS totalRatings FROM ratings", (err3, ratings) => {
        if (err3) return res.status(500).json(err3);

        res.json({
          success: true,
          data: {
            totalUsers: users[0].totalUsers,
            totalStores: stores[0].totalStores,
            totalRatings: ratings[0].totalRatings,
          },
        });
      });
    });
  });
};

// Get Users
const getUsers = (req, res) => {
  db.query(
    "SELECT id,name,email,address,role FROM users",
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        success: true,
        users: result,
      });
    }
  );
};

// Get Stores
const getStores = (req, res) => {
  const sql = `
  SELECT
    stores.id,
    stores.name,
    stores.email,
    stores.address,
    ROUND(AVG(ratings.rating),1) AS rating
  FROM stores
  LEFT JOIN ratings
  ON stores.id = ratings.store_id
  GROUP BY stores.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      stores: result,
    });
  });
};

// Add User
const addUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users(name,email,password,address,role) VALUES(?,?,?,?,?)",
      [name, email, hash, address, role],
      (err) => {
        if (err) return res.status(500).json(err);

        res.status(201).json({
          success: true,
          message: "User Added Successfully",
        });
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// Add Store
const addStore = (req, res) => {
  const { name, email, address, owner_id } = req.body;

  db.query(
    "INSERT INTO stores(name,email,address,owner_id) VALUES(?,?,?,?)",
    [name, email, address, owner_id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        success: true,
        message: "Store Added Successfully",
      });
    }
  );
};

module.exports = {
  getDashboard,
  getUsers,
  getStores,
  addUser,
  addStore,
};