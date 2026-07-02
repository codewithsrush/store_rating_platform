const db = require("../config/db");

// Get all stores with average rating and user's rating
const getStores = (req, res) => {
  const userId = req.user.id;

  const sql = `
  SELECT
      s.id,
      s.name,
      s.email,
      s.address,
      ROUND(AVG(r.rating),1) AS overallRating,
      (
        SELECT rating
        FROM ratings
        WHERE user_id=? AND store_id=s.id
        LIMIT 1
      ) AS userRating
  FROM stores s
  LEFT JOIN ratings r
  ON s.id=r.store_id
  GROUP BY s.id
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      stores: result,
    });
  });
};

// Search Store
const searchStore = (req, res) => {
  const { search } = req.query;

  const sql = `
    SELECT *
    FROM stores
    WHERE name LIKE ?
    OR address LIKE ?
  `;

  db.query(sql, [`%${search}%`, `%${search}%`], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      success: true,
      stores: result,
    });
  });
};

// Submit / Update Rating
const submitRating = (req, res) => {
  const userId = req.user.id;

  const { store_id, rating } = req.body;

  db.query(
    "SELECT * FROM ratings WHERE user_id=? AND store_id=?",
    [userId, store_id],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length > 0) {
        db.query(
          "UPDATE ratings SET rating=? WHERE user_id=? AND store_id=?",
          [rating, userId, store_id],
          (err2) => {
            if (err2) return res.status(500).json(err2);

            return res.json({
              success: true,
              message: "Rating Updated Successfully",
            });
          }
        );
      } else {
        db.query(
          "INSERT INTO ratings(user_id,store_id,rating) VALUES(?,?,?)",
          [userId, store_id, rating],
          (err3) => {
            if (err3) return res.status(500).json(err3);

            res.json({
              success: true,
              message: "Rating Submitted Successfully",
            });
          }
        );
      }
    }
  );
};

module.exports = {
  getStores,
  searchStore,
  submitRating,
};