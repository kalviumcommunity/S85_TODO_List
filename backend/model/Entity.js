// const { DataTypes, Sequelize } = require('sequelize');
// const sequelize = require('../middleware/dbmysql'); // MySQL connection instance
// const User = require('./User');  // Import User model to associate with Entity

// const Entity = sequelize.define('Entity', {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     title: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     description: {
//       type: Sequelize.TEXT,
//       allowNull: true
//     },
//     created_by: {
//       type: Sequelize.INTEGER,
//       allowNull: true
//     },
//     created_at: {
//       type: Sequelize.DATE,
//       defaultValue: Sequelize.NOW
//     }
//     // Note: updatedAt should not be explicitly mentioned unless it's required in your table.
//   }, {
//     timestamps: false // If you're not using automatic timestamps
//   });
  
  
      


// // Define associations after models are defined
// Entity.belongsTo(User, { foreignKey: 'created_by', onDelete: 'CASCADE' });
// User.hasMany(Entity, { foreignKey: 'created_by' });

// module.exports = Entity;