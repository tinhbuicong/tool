const express = require("express");
const router = express.Router();
const pool = require("../database/database.js");

router.get("/exness", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const offset = (page - 1) * pageSize;

    const [rows] = await pool.query(
      "SELECT exness, symbol, timestamp, bid, ask FROM exness_XAUUSDm LIMIT " +
        pageSize +
        " OFFSET " +
        offset
    );

    res.json({
      data: rows,
      total: 0,
      currentPage: page,
      totalPages: 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
