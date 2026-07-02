const db = require("../config/db");

// Dashboard
const getDashboard = (req, res) => {
  const ownerId = req.user.id;

  const sql = `
  SELECT
      stores.id,
      stores.name,
      ROUND(AVG(ratings.rating),1) AS averageRating,
      COUNT(ratings.id) AS totalRatings
  FROM stores
  LEFT JOIN ratings
  ON stores.id=ratings.store_id
  WHERE stores.owner_id=?
  GROUP BY stores.id
  `;

  db.query(sql, [ownerId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      data: result,
    });
  });
};

// Users who rated
const getRatings = (req, res) => {
  const ownerId = req.user.id;

  const sql = `
SELECT
users.name,
users.email,
ratings.rating,
stores.name AS store
FROM ratings
JOIN users ON users.id=ratings.user_id
JOIN stores ON stores.id=ratings.store_id
WHERE stores.owner_id=?
`;

  db.query(sql, [ownerId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      ratings: result,
    });
  });
};

module.exports = {
  getDashboard,
  getRatings,
};