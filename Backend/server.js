const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const USERS_DB = "./users.json";
const ORDERS_DB = "./orders.json";
const MEASURE_DB = "./measurements.json";

/* ================= UTILS ================= */

const readJSON = file =>
  fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];

const writeJSON = (file, data) =>
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

/* ================= REGISTER (UNCHANGED) ================= */

app.post("/api/register", (req, res) => {
  const { name, email, password, address } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const users = readJSON(USERS_DB);

  const exists = users.find(
    u => u.email === email.toLowerCase()
  );

  if (exists)
    return res.status(400).json({ message: "User already exists" });

  const user = {
    id: uuid(),
    name,
    email: email.toLowerCase(),
    password,
    address,
    role: "customer"
  };

  users.push(user);
  writeJSON(USERS_DB, users);

  console.log("✅ New User Registered:", user.email);

  res.json({ message: "Registration successful" });
});

/* ================= LOGIN (UNCHANGED) ================= */

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  const users = readJSON(USERS_DB);

  const user = users.find(
    u => u.email === email.toLowerCase() && u.password === password
  );

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful", user });
});

/* ================= SAVE MEASUREMENTS ================= */

app.post("/api/measurements/:userId", (req, res) => {
  const { userId } = req.params;
  const { chest, waist, height } = req.body;

  let data = readJSON(MEASURE_DB);

  data = data.filter(m => m.userId !== userId);

  data.push({
    userId,
    chest,
    waist,
    height,
    updatedAt: new Date().toISOString()
  });

  writeJSON(MEASURE_DB, data);

  res.json({ message: "Measurements saved" });
});

/* ================= DASHBOARD DATA ================= */

app.get("/api/dashboard/:userId", (req, res) => {
  const { userId } = req.params;

  const orders = readJSON(ORDERS_DB).filter(o => o.userId === userId);
  const measurements = readJSON(MEASURE_DB).find(m => m.userId === userId);

  const stats = {
    totalOrders: orders.length,
    activeOrders: orders.filter(o => o.status !== "delivered").length,
    completedOrders: orders.filter(o => o.status === "delivered").length,
    measurementsSaved: measurements ? "Yes" : "No"
  };

  res.json({
    stats,
    recentOrders: orders.slice(0, 5)
  });
});

/* ================= START ================= */

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
