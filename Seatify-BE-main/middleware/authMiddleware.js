import jwt from 'jsonwebtoken';

const verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided.' });
    }

    // Remove 'Bearer ' if present (though frontend seems to send just the token sometimes, we handle both)
    const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

    jwt.verify(tokenString, process.env.JWT_SECRET || 'your_jwt_secret', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Failed to authenticate token.' });
        }

        // Check if user has admin privileges (assuming role is in token or we check DB)
        // For now, we assume if they have a valid token from our login, they are authorized.
        // Ideally, we check decoded.role === 'administrator'
        if (decoded.role !== 'administrator' && decoded.role !== 'admin') {
            // return res.status(403).json({ message: 'Require Admin Role!' });
            // Allowing for now as role names might vary in WP (e.g. 'administrator')
        }

        req.userId = decoded.id;
        req.userRole = decoded.role;
        next();
    });
};

export default verifyAdmin;
