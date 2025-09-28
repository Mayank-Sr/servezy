const mongoose = require("mongoose");

const PortfolioSchema = new mongoose.Schema({
  projectName: String,
  description: String,
  demoUrl: String,
  repoUrl: String,
});

const FreelancerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  jobTitle: String,
  bio: String,
  skills: [String],
  portfolio: [PortfolioSchema],
});

module.exports = mongoose.model("Freelancer", FreelancerSchema);
