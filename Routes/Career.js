const express = require('express');
const router = express.Router();
const CareerController = require('../Controllers/careerController');
const authMiddleware = require('../Middlewares/auth');


// Get all career categories (public)
router.get('/', CareerController.getCategories);


// Create a new career category (admin only)
router.post('/', authMiddleware.verifyAdmin, CareerController.createCategory);


// Update a career category (admin only)
router.put('/:id', authMiddleware.verifyAdmin, CareerController.updateCategory);


// Delete a career category (admin only)
router.delete('/:id', authMiddleware.verifyAdmin, CareerController.deleteCategory);


module.exports = router;


