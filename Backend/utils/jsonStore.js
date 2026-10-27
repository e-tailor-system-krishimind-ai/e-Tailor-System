const fs = require("fs");
const path = require("path");

const dataDirectory = path.resolve(__dirname, "..");

function readJSON(filename) {
  const filePath = path.join(dataDirectory, filename);
  return fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, "utf8"))
    : [];
}

function writeJSON(filename, data) {
  const filePath = path.join(dataDirectory, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readJSON, writeJSON };
