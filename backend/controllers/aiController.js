const db = require("../config/db");
const Groq= require("groq-sdk");

console.log("AI Controller Loaded");
const groqc = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const CACHE_HOURS = 12; // don't regenerate more often than this

const getReviewsForStore = (storeId) =>
  new Promise((resolve, reject) => {
    const sql = `
      SELECT ratings.rating, ratings.comment
      FROM ratings
      WHERE ratings.store_id = ?
        AND ratings.comment IS NOT NULL
        AND TRIM(ratings.comment) <> ''
      ORDER BY ratings.updated_at DESC
      LIMIT 50
    `;
    db.query(sql, [storeId], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });

const getStoreIfOwnedOrAdmin = (storeId, user) =>
  new Promise((resolve, reject) => {
    db.query("SELECT * FROM stores WHERE id = ?", [storeId], (err, rows) => {
      if (err) return reject(err);
      if (!rows.length) return resolve(null);

      const store = rows[0];
      if (user.role !== "admin" && store.owner_id !== user.id) {
        return resolve(false); // exists, but this user can't see it
      }
      resolve(store);
    });
  });

// GET /api/owner/ai-summary/:storeId
const getStoreSummary = async (req, res) => {
  const storeId = req.params.storeId;
  const force = req.query.refresh === "true";

  try {
    const store = await getStoreIfOwnedOrAdmin(storeId, req.user);

    if (store === null) {
      return res.status(404).json({ success: false, message: "Store not found" });
    }
    if (store === false) {
      return res.status(403).json({ success: false, message: "Access denied" });
    }

    const isFresh =
    store.ai_summary_generated_at &&
    Date.now() - new Date(store.ai_summary_generated_at).getTime() <
    CACHE_HOURS * 60 * 60 * 1000;

    if (!force && isFresh && store.ai_summary) {
      return res.json({
        success: true,
        cached: true,
        summary: store.ai_summary,
        sentiment: {
          positive: store.ai_sentiment_positive,
          neutral: store.ai_sentiment_neutral,
          negative: store.ai_sentiment_negative,
        },
      });
    }

    const reviews = await getReviewsForStore(storeId);

    if (!reviews.length) {
      return res.json({
        success: true,
        cached: false,
        summary:
          "No written reviews yet. Once customers leave comments with their star ratings, an AI summary will appear here.",
        sentiment: { positive: 0, neutral: 0, negative: 0 },
      });
    }

    const reviewText = reviews.map((r) => `- (${r.rating}/5) ${r.comment}`).join("\n");

    const prompt = `You are analyzing customer reviews for a store called "${store.name}".
Here are recent customer reviews (star rating out of 5, then their comment):

${reviewText}

Respond ONLY with valid JSON in exactly this shape, no markdown, no extra text:
{
  "summary": "2-3 sentence plain-English summary of what customers are saying overall, written for the store owner",
  "positive": <count of clearly positive reviews as an integer>,
  "neutral": <count of mixed/neutral reviews as an integer>,
  "negative": <count of clearly negative reviews as an integer>
}`;

    const message = await groqc.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature:0.3,
      max_tokens: 1000
    });

    const raw = message.choices[0].message.content.trim();
    const cleaned = raw.replace(/^```json\s*|\s*```$/g, "");

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = { summary: raw.slice(0, 400), positive: 0, neutral: reviews.length, negative: 0 };
    }

    db.query(
      `UPDATE stores
       SET ai_summary = ?, ai_sentiment_positive = ?, ai_sentiment_neutral = ?,
           ai_sentiment_negative = ?, ai_summary_generated_at = NOW()
       WHERE id = ?`,
      [parsed.summary, parsed.positive || 0, parsed.neutral || 0, parsed.negative || 0, storeId],
      () => {}
    );

    res.json({
      success: true,
      cached: false,
      summary: parsed.summary,
      sentiment: {
        positive: parsed.positive || 0,
        neutral: parsed.neutral || 0,
        negative: parsed.negative || 0,
      },
    });
  } catch (error) {
    console.error("AI summary error:", error.message);
    res.status(500).json({
      success: false,
      message: "AI insight is temporarily unavailable. Please try again shortly.",
    });
  }
};

module.exports = { getStoreSummary };