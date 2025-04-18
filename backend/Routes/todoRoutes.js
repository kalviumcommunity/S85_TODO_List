const express = require("express");
const router = express.Router();
const Todo = require("../model/Todo");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, async (req, res) => {
    console.log("Request Headers:", req.headers);
    console.log("Decoded User:", req.user); // Should contain `id`
    console.log("Request Body:", req.body);

    if (!req.user || !req.user.id) {
        return res.status(400).json({ message: "Invalid token or missing user ID" });
    }

    if (!req.body.title || !req.body.description) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newTodo = new Todo({
            userId: req.user.id, // Ensure userId is added
            title: req.body.title,
            description: req.body.description,
            dueDate: req.body.dueDate || null,
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({ message: "Server error" });
    }
});


// Get Todos (User-Specific)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Todo (User-Specific)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, dueDate, status } = req.body;

        // Ensure the Todo belongs to the authenticated user
        const todo = await Todo.findOne({ _id: id, userId: req.user.id });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        // Update the todo fields
        if (title) todo.title = title;
        if (description) todo.description = description;
        if (dueDate) todo.dueDate = dueDate;
        if (status) todo.status = status;

        await todo.save();
        res.json({ message: "Todo updated successfully", todo });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Server error" });
    }
});



// Delete a Todo (User-Specific)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;

        // Ensure the Todo belongs to the authenticated user
        const todo = await Todo.findOne({ _id:id });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        await Todo.findByIdAndDelete({ _id: id });
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error" });
    }
});


module.exports = router;