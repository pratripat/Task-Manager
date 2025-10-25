import { authLucia } from "../lib/auth.js";

export async function requireAuth(req, res, next) {
    // Log all cookies received
    // console.log('🍪 Raw cookie header:', req.headers.cookie);

    const sessionId = authLucia.readSessionCookie(req.headers.cookie ?? "");
    // console.log('🔑 Extracted session ID:', sessionId);

    if (!sessionId) {
        // console.log('❌ No session ID found in cookies');
        return res.status(401).json({ error: 'Not authenticated' });
    }

    try {
        const { session, user } = await authLucia.validateSession(sessionId);
        // console.log('✅ Session validated:', session);
        // console.log('✅ User:', user);

        if (!session) {
            // console.log('❌ Session invalid or expired');
            return res.status(401).json({ error: 'Invalid or expired session' });
        }

        req.user = user;
        req.session = session;
        next();
    } catch (err) {
        // console.error('❌ Session validation error:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}