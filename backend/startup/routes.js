import express from 'express';
import { router as users } from '../routes/users.js';
import { router as tasks } from '../routes/tasks.js';

export function routes(app) {
    app.use(express.json());
    app.use('/api/users', users);
    app.use('/api/tasks', tasks);
}