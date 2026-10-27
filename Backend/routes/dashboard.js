const express = require("express");
const { readJSON } = require("../utils/jsonStore");

const router = express.Router();

router.get("/dashboard/:userId", (req, res) => {
  const { userId } = req.params;
  const orders = readJSON("orders.json").filter(order => order.userId === userId);
  const measurements = readJSON("measurements.json")
    .find(measurement => measurement.userId === userId);

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(order => order.status !== "delivered").length,
    completedOrders: orders.filter(order => order.status === "delivered").length,
    measurementsSaved: measurements ? "Yes" : "No"
  };

  return res.json({
    stats,
    recentOrders: orders.slice(0, 5)
  });
});

module.exports = router;
