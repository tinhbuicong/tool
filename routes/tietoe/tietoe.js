const express = require("express");
const router = express.Router();
const pool = require("../../database/database.js");

router.post("/user", async (req, res) => {
  try {
    const {
      device_id,
      device_token,
      device_name,
      os_name,
      os_version,
      version_app,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO tie_toe_user (
                device_id,
                device_token,
                device_name,
                os_name,
                os_version,
                version_app
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [device_id, device_token, device_name, os_name, os_version, version_app]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
