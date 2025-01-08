require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../database/database.js"); // Import the pool from db.js

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM words");
    client.release();

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
