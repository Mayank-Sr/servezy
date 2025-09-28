const Freelancer = require("../models/Freelancer");
const DummyProject = require("../models/DummyProject");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "myjwtsecret";

// Middleware
const authenticate = (req, res) => {
  const token = req.cookies.token;
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};

// Login
exports.showLogin = (req, res) => res.render("login");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Freelancer.findOne({ email });
    if (!user) return res.render("login", { error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.render("login", { error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.cookie("token", token, { httpOnly: true });
    res.redirect("/freelancer/profile");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Something went wrong" });
  }
};

// Register
exports.showRegister = (req, res) => res.render("register");
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exists = await Freelancer.findOne({ email });
    if (exists) return res.render("register", { error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Freelancer.create({ username, email, password: hashedPassword });
    res.redirect("/freelancer/login");
  } catch (err) {
    console.error(err);
    res.render("register", { error: "Something went wrong" });
  }
};

// Profile
exports.showProfile = async (req, res) => {
  const decoded = authenticate(req, res);
  if (!decoded) return res.redirect("/freelancer/login");
  const user = await Freelancer.findById(decoded.id);
  res.render("profile", { user });
};

// Edit Profile
exports.editProfile = async (req, res) => {
  const decoded = authenticate(req, res);
  if (!decoded) return res.redirect("/freelancer/login");

  const user = await Freelancer.findById(decoded.id);
  const { username, jobTitle, bio, skills } = req.body;
  user.username = username;
  user.jobTitle = jobTitle;
  user.bio = bio;
  user.skills = skills.split(",").map(s => s.trim());
  await user.save();
  res.redirect("/freelancer/profile");
};

// Portfolio
exports.showAddProject = (req, res) => res.render("addPortfolio");
exports.addProject = async (req, res) => {
  const decoded = authenticate(req, res);
  if (!decoded) return res.redirect("/freelancer/login");

  const user = await Freelancer.findById(decoded.id);
  const { projectName, description, demoUrl, repoUrl } = req.body;
  user.portfolio.push({ projectName, description, demoUrl, repoUrl });
  await user.save();
  res.redirect("/freelancer/profile");
};

exports.showEditProject = async (req, res) => {
  const decoded = authenticate(req, res);
  if (!decoded) return res.redirect("/freelancer/login");

  const user = await Freelancer.findById(decoded.id);
  const project = user.portfolio.id(req.params.id);
  res.render("editPortfolio", { project });
};

exports.editProject = async (req, res) => {
  const decoded = authenticate(req, res);
  if (!decoded) return res.redirect("/freelancer/login");

  const user = await Freelancer.findById(decoded.id);
  const project = user.portfolio.id(req.params.id);
  Object.assign(project, req.body);
  await user.save();
  res.redirect("/freelancer/profile");
};

exports.deleteProject = async (req, res) => {
  const decoded = authenticate(req, res);
  if (!decoded) return res.redirect("/freelancer/login");

  const user = await Freelancer.findById(decoded.id);
  user.portfolio.id(req.params.id).remove();
  await user.save();
  res.redirect("/freelancer/profile");
};

// Dummy projects
exports.showDummyProjects = async (req, res) => {
  const projects = await DummyProject.find();
  res.render("dummyProjects", { projects });
};

exports.applyDummyProject = (req, res) => {
  res.send("Applied to project ID: " + req.params.id);
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.redirect("/freelancer/login");
};
