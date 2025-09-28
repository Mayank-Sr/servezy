const mongoose = require("mongoose");
const Portfolio = require("./models/DummyProject");

const MONGO_URL = "mongodb+srv://mayank13306:mayank13306@cluster0.8fozxq1.mongodb.net/";

mongoose.connect(MONGO_URL)
  .then(async () => {
    await Portfolio.insertMany([
      {
        projectName: "E-Commerce Website",
        description: "A full-stack e-commerce platform with product listings, shopping cart, and secure checkout.",
        demoUrl: "https://shoeverse-demo.com",
        repoUrl: "https://github.com/mayank13306/ecommerce-platform"
      },
      {
        projectName: "Portfolio Website",
        description: "A personal portfolio website showcasing skills, projects, and blog posts.",
        demoUrl: "https://mayank-portfolio.com",
        repoUrl: "https://github.com/mayank13306/portfolio-site"
      },
      {
        projectName: "Chat Application",
        description: "A real-time chat application built with Node.js, Express, Socket.io, and MongoDB.",
        demoUrl: "https://chatapp-demo.com",
        repoUrl: "https://github.com/mayank13306/chat-application"
      }
    ]);
    console.log("✅ Dummy projects inserted");
    process.exit();
  })
  .catch(err => console.error(err));
