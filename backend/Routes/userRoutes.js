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
          console.log("User not found");
          return res.status(401).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match:", isMatch);

      if (!isMatch) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.json({ token });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Middleware to check JWT
const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid token" });
    }
};

// Get User Data (Protected)
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;







// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../model/User");
// const authMiddleware = require("../middleware/authMiddleware");

// const router = express.Router();

// // User Signup
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "Email already exists." });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ name, email, password: hashedPassword });
//     await newUser.save();

//     return res.status(201).json({ message: "User registered successfully." });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// // User Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ message: "Invalid email or password." });
//     }

//     const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

//     return res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// // Protected Route Example
// router.get("/profile", authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found." });

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const User = require("../model/User");

// // Create User
// router.post("/", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     return res.status(201).json(user);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// // Get All Users
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     return res.status(200).json(users);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// // Get User by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// // Update User
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedUser) return res.status(404).json({ message: "User not found" });
//     return res.status(200).json(updatedUser);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// // Delete User
// router.delete("/:id", async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     if (!deletedUser) return res.status(404).json({ message: "User not found" });
//     return res.status(200).json({ message: "User deleted successfully" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;



// const express = require("express");
// const router = express.Router();
// const User = require("../model/User");

// // Create User
// router.post("/users", async (req, res) => {
//   try {
//     const user = new User(req.body);
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get All Users
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Get User by ID
// router.get("/users/:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Delete User
// router.delete("/users/:id", async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update User
// router.put("/users/:id", async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(updatedUser);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
