// const express = require('express');
// const router = express.Router();
// const Entity = require('../model/Entity');  // Make sure the path is correct

// // Fetch an entity by ID
// // ✅ First: general route for all entities
// router.get('/', async (req, res) => {
//   try {
//     const entities = await Entity.findAll(); // <- use Sequelize's `findAll()` instead of `find()`
//     res.json(entities);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch entities' });
//   }
// });

// // ✅ Then: route to get single entity by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const entity = await Entity.findByPk(req.params.id);
//     if (!entity) {
//       return res.status(404).json({ error: 'Entity not found' });
//     }
//     res.json(entity);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;