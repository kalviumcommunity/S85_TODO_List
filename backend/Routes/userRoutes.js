const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Signup Route
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: false, // Set to true in production with HTTPS
                maxAge: 3600000, // 1 hour
            })
            .json({ message: "Login successful", username: user.name });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Logout Route
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
});

// Check Auth (from cookie)
router.get("/check-auth", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.json({ isAuthenticated: true, userId: decoded.id });
        } catch (err) {
            res.json({ isAuthenticated: false });
        }
    } else {
        res.json({ isAuthenticated: false });
    }
});

// Protected route
const authMiddleware = require("../middleware/authMiddleware");

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
