import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { Task, validateTask } from "../models/task.js";
import { validate } from "../middleware/validate.js";

export const router = express.Router();

router.get('/', requireAuth, async (req, res) => {
    if (!req.user) return [];
    try {
        const userId = req.user.id;

        const tasks = await Task.find({ userId });

        const tasks = await Task.find();

        return res.status(200).json(tasks);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to load tasks' });
    }
})

router.post('/', [requireAuth, validate(validateTask)], async (req, res) => {
    if (!req.user) return [];
    try {
        const userId = req.user.id;

        const task = new Task({ userId, ...req.body });
        await task.save();

        return res.status(200).json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to load tasks' });
    }
})

router.put('/:id', [requireAuth, validate(validateTask)], async (req, res) => {
    if (!req.user) return [];
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            dueDate: req.body.dueDate
        }, { new: true });

        if (!task) return res.status(404).json({ message: 'The task with the given ID was not found' });

        res.status(200).json(task);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to update tasks' });

    }
})

router.delete('/:id', requireAuth, async (req, res) => {
    if (!req.user) return [];
    try {
        const task = await Task.findByIdAndDelete(req.params.id, {
            new: true
        });

        if (!task) return res.status(404).json({ error: `Failed to delete task. Task not found: ${req.params.id}` });

        return res.status(200).json({ message: `Deleted task: ${req.params.id}` });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Failed to delete task' });
    }
})