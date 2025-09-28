const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../server");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.redirect("/freelancer/login");
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = await User.findById(decoded.userId).select("-password");
    if (!req.user) return res.redirect("/freelancer/login");

    next();
  } catch (err) {
    console.error(err);
    return res.redirect("/freelancer/login");
  }
};

module.exports = authenticate;
