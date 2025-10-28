import express from 'express';
import { validate } from '../middleware/validate.js';
import { validateUser, User } from '../models/user.js';
import _ from 'lodash';
import { hashUserPassword, verifyPassword } from '../lib/hash.js';
import { generateId } from 'lucia';
import { authLucia } from '../lib/auth.js';
import { requireAuth } from '../middleware/auth.js';

export const router = express.Router();

// Login route
router.get('/', async (req, res) => {
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        // Find user in your database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Verify password
        const validPassword = verifyPassword(user.password, password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create session with Lucia v3 API
        const session = await authLucia.createSession(user._id, {});
        const sessionCookie = authLucia.createSessionCookie(session.id);

        res.setHeader('Set-Cookie', sessionCookie.serialize());
        return res.status(200).json({ message: 'Logged in' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

// Register route
router.post('/', validate(validateUser), async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User email is already registered..." });
        }

        const userId = generateId(15);
        const hashedPassword = hashUserPassword(password);

        // Create user in MongoDB
        const user = new User({
            _id: userId,
            email,
            password: hashedPassword
        });
        await user.save();

        // Create session with Lucia v3 API
        const session = await authLucia.createSession(userId, {});
        const sessionCookie = authLucia.createSessionCookie(session.id);

        res.setHeader('Set-Cookie', sessionCookie.serialize());
        return res.status(201).json({ message: "User created" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post('/logout', requireAuth, async (req, res) => {
    try {
        // invalidate the current session
        await authLucia.invalidateSession(req.session.id);

        // create a blank cookie to clear it 
        const sessionCookie = authLucia.createBlankSessionCookie();
        res.setHeader('Set-Cookie', sessionCookie.serialize());

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        console.log('Logout error:', err);
        return res.status(200).json({ error: 'Failed to logout' });
    }
})