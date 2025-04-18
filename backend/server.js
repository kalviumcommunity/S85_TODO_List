
const express = require('express');
const connectDB = require('./Database/db');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const sequelize = require("./middleware/dbmysql");
const User = require("./model/User");
const Entity = require("./model/Entity");
const Entityroutes = require("./Routes/entitiesRoute");


const app = express();

require('dotenv').config({ path: path.resolve(__dirname, './config/.env') });

const port = process.env.PORT || 5000;

// connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// Import Routes (✅ FIXED PATHS)
const todoRoutes = require("./Routes/todoRoutes");
const userRoutes = require("./Routes/userRoutes");

// Use Routes (✅ FIXED CONFLICT)
// app.use("/api/todos", todoRoutes);
// app.use("/api/users", userRoutes);
app.use('/api/entities', Entityroutes);


// Database Connection Status
// app.get('/', (req, res) => {
//     const dbStatus = mongoose.connection.readyState === 1 ? 'Connected to ASAP' : 'Not Connected to ASAP';
//     res.json({ dbStatus });
//   });
  
  // ✅ Define MySQL associations
  Entity.belongsTo(User, {
      foreignKey: "created_by",
      onDelete: "CASCADE"
  });

  // ✅ Sync MySQL models after defining associations
  sequelize.sync({ force: false })
  .then(() => {
    console.log("✅ MySQL Database & tables synced!");
  })
  .catch((error) => {
    console.error("❌ Error syncing MySQL DB:", error);
  });
  

  app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
