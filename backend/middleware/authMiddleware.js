const jwt = require("jsonwebtoken");
const User = require("../model/User"); // Ensure you import the User model
require("dotenv").config(); // Load environment variables

const authMiddleware = async (req, res, next) => {
  console.log("Authorization Header:", req.header("Authorization")); // Debugging

  const token = req.header("Authorization");
  if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Invalid token format" });
  }
  const extractedToken = token.split(" ")[1]; // Remove "Bearer"
  console.log("Extracted Token:", extractedToken); // Debugging

  if (!extractedToken) {
      return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
      console.log("JWT Secret in Middleware:", process.env.JWT_SECRET); // Debugging

      const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
          return res.status(401).json({ message: "User not found" });
      }

      console.log("User Authenticated:", req.user.id);
      next();
  } catch (error) {
      console.error("Authentication error:", error.message);
      return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;