const checkRole = (roles) => {
    return (req, res, next) => {
        const userRole = req.headers['x-user-role'];

        if (!userRole) {
            return res.status(401).json({ message: 'Missing x-user-role header. Unauthorized.' });
        }

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
        }

        // For user role, also require x-user-id
        if (userRole === 'user' && !req.headers['x-user-id']) {
            return res.status(401).json({ message: 'Missing x-user-id header for user role.' });
        }

        next();
    };
};

module.exports = { checkRole };
