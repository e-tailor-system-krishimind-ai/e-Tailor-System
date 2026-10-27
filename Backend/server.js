const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const measurementRoutes = require("./routes/measurements");
const dashboardRoutes = require("./routes/dashboard");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api", measurementRoutes);
app.use("/api", dashboardRoutes);

/* ================= START ================= */

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
