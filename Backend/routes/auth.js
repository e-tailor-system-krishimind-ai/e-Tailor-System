const express = require("express");
const { v4: uuid } = require("uuid");
const { readJSON, writeJSON } = require("../utils/jsonStore");

const router = express.Router();

router.post("/register", (req, res) => {
  const { name, email, password, address } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const users = readJSON("users.json");
  const exists = users.find(user => user.email === email.toLowerCase());

  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = {
    id: uuid(),
    name,
    email: email.toLowerCase(),
    password,
    address,
    role: "customer"
  };

  users.push(user);
  writeJSON("users.json", users);

  console.log("New user registered:", user.email);
  return res.json({ message: "Registration successful" });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email & password required" });
  }

  const users = readJSON("users.json");
  const user = users.find(
    candidate => candidate.email === email.toLowerCase() && candidate.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  return res.json({ message: "Login successful", user });
});

module.exports = router;
