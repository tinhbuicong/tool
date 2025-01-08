require("dotenv").config();
const { generateInsertQuery } = require("../utils/query.js"); // Import the function
const express = require("express");
const pool = require("../database/database.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM words");
    res.status(200).json(rows);
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { id, ...body } = req.body;
    const client = await pool.connect();
    const { query, values } = generateInsertQuery("words", body);

    const result = await client.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
