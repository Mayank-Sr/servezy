const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const freelancerRoutes = require("./routes/freelancerRoutes");

const app = express();
const PORT = 4000;
const MONGO_URL = "mongodb+srv://mayank13306:mayank13306@cluster0.8fozxq1.mongodb.net/";

// Connect DB
mongoose.connect(MONGO_URL)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB connection error:", err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/freelancer", freelancerRoutes);
app.get("/", (req, res) => res.redirect("/freelancer/login"));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
