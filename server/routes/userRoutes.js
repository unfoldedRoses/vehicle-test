const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body, validationResult } = require('express-validator');

// Middleware for Validation Error Handling
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// GET /users: Get all users
router.get('/', userController.getAllUsers);

// POST /users: Create a new user
router.post('/create', [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
   
], handleValidationErrors, userController.createUser);


module.exports = router;  