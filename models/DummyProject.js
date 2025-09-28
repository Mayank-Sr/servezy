const mongoose = require("mongoose");

const DummyProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  skillsRequired: [String],
  budget: String,
  deadline: String,
});

module.exports = mongoose.model("DummyProject", DummyProjectSchema);
