require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const pool = require("../database/database.js"); // Import the pool from db.js

const router = express.Router();
const secretKey = process.env.SECRET_KEY; // Use the secret key from .env

router.get("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM users WHERE username = $1 AND password = $2",
      [username, password]
    );
    client.release();

    if (result.rows.length > 0) {
      const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
