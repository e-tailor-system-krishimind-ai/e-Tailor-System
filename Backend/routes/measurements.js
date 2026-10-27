const express = require("express");
const { readJSON, writeJSON } = require("../utils/jsonStore");

const router = express.Router();

router.post("/measurements/:userId", (req, res) => {
  const { userId } = req.params;
  const { chest, waist, height } = req.body;
  const measurements = readJSON("measurements.json")
    .filter(measurement => measurement.userId !== userId);

  measurements.push({
    userId,
    chest,
    waist,
    height,
    updatedAt: new Date().toISOString()
  });

  writeJSON("measurements.json", measurements);
  return res.json({ message: "Measurements saved" });
});

module.exports = router;
