import AppError from '../errors/AppError.js';

export const authorize = (...allowedRoles) => (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
        return next(new AppError('Action non autorisée', 403));
    }
    next();
};