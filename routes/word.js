require("dotenv").config();
const { generateInsertQuery } = require("../utils/query.js"); // Import the function
const express = require("express");
const pool = require("../database/database.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM words");
    res.status(200).json(
      rows.map((i) => ({
        ...i,
        rows: JSON.parse(i.rows),
      }))
    );
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { rows, ...updateData } = req.body;

    // Convert rows to string if it exists
    const dataToUpdate = {
      ...updateData,
      rows: rows ? rows : undefined,
    };

    // Build the SET clause with ? placeholders for MySQL
    const setClause = Object.entries(dataToUpdate)
      .filter(([_, value]) => value !== undefined)
      .map(([key, _]) => `\`${key}\` = ?`)
      .join(",");

    const values = Object.entries(dataToUpdate)
      .filter(([_, value]) => value !== undefined)
      .map(([_, value]) => value);

    const query = `UPDATE words SET ${setClause} WHERE id = ?`;
    values.push(id); // Add id as the last parameter

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Word not found" });
    }

    res.status(200).json({
      message: "Word updated successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error updating word:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
