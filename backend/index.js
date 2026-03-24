const express = require("express");
const cors = require("cors");
const path = require("path");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ---------------- MONGO CONFIG ----------------
const MONGO_URL =process.env.MONGO_URI;
  // "mongodb://aman_admin:aman_password@localhost:27017/?authSource=admin";

const client = new MongoClient(MONGO_URL);
let db;

// Connect Mongo ONCE
async function connectDB() {
  try {
    await client.connect();
    db = client.db("my-sample-db");
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
    process.exit(1);
  }
}

connectDB();

// ---------------- ROUTES ----------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/getUsers", async (req, res) => {
  try {
    

    const result = await db.collection("users").find({}).toArray();
    res.send(result)
  } catch (err) {
    res.status(500)
  }
});

app.get("/health", (req, res) => {
  res.send("OK");
});

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

// docker compose -f mongo.yaml up -d  for mongodb run
