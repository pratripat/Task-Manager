import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { Task, validateTask } from "../models/task.js";
import { validate } from "../middleware/validate.js";

export const router = express.Router();

// let tasks = [
//     { id: '1', title: "Complete Project Proposal", priority: "HIGH", status: "In Progress", description: "Finalize the Q1 project proposal and submit to stakeholders for review.", dueDate: "2025-11-15", createdDate: "2025-10-20" },
//     { id: '2', title: "Update Documentation", priority: "MED", status: "To Do", description: "Review and update the API documentation with latest endpoints.", dueDate: "2025-11-20", createdDate: "2025-10-21" },
//     { id: '3', title: "Team Meeting Preparation", priority: "MED", status: "In Progress", description: "Prepare slides and agenda for the weekly team sync meeting.", dueDate: "2025-11-10", createdDate: "2025-10-18" },
//     { id: '4', title: "Code Review", priority: "LOW", status: "To Do", description: "Review pull requests from the development team.", dueDate: "2025-11-25", createdDate: "2025-10-22" },
//     { id: '5', title: "Deploy to Production", priority: "HIGH", status: "Finished", description: "Deploy the latest release to production environment after testing.", dueDate: "2025-11-05", createdDate: "2025-10-15" },
//     { id: '6', title: "Client Feedback Session", priority: "HIGH", status: "To Do", description: "Conduct feedback session with client about recent deliverables.", dueDate: "2025-11-12", createdDate: "2025-10-19" }
// ]

router.get('/', requireAuth, async (req, res) => {
    if (!req.user) return [];
    try {
        const userId = req.user.id;
        const userEmail = req.user.email;

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
        const userEmail = req.user.email;

        const task = new Task(req.body);
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