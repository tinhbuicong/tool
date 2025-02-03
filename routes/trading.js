const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/exness", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT exness, symbol, timestamp, bid, ask FROM exness_XAUUSDm ORDER BY timestamp DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
