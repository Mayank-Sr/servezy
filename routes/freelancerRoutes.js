const express = require("express");
const router = express.Router();
const controller = require("../controllers/freelancerController");

// Authentication
router.get("/register", controller.showRegister);
router.post("/register", controller.register);
router.get("/login", controller.showLogin);
router.post("/login", controller.login);
router.get("/logout", controller.logout);

// Profile
router.get("/profile", controller.showProfile);
router.post("/profile/edit", controller.editProfile);

// Portfolio
router.get("/portfolio/add", controller.showAddProject);
router.post("/portfolio/add", controller.addProject);
router.get("/portfolio/edit/:id", controller.showEditProject);
router.post("/portfolio/edit/:id", controller.editProject);
router.post("/portfolio/delete/:id", controller.deleteProject);

// Dummy projects
router.get("/projects", controller.showDummyProjects);
router.post("/projects/apply/:id", controller.applyDummyProject);

module.exports = router;
