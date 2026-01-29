const express = require('express');
const router = express.Router();
const borrowController = require('../controllers/borrowController');
const { checkRole } = require('../middleware/authMiddleware');

// User mode route
router.post('/', checkRole(['user']), borrowController.borrowBook);

// Admin mode route - view history
router.get('/history', checkRole(['admin']), borrowController.getAllLogs);

module.exports = router;
