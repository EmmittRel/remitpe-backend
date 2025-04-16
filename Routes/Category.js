const express = require('express');
const router = express.Router();
const CategoryController = require('../Controllers/categoryController');
const authMiddleware = require('../Middlewares/auth');

// Get all categories (public)
router.get('/', CategoryController.getCategories);

// Create a new category (admin only)
router.post('/', authMiddleware.verifyAdmin, CategoryController.createCategory);

// Update a category (admin only)
router.put('/:id', authMiddleware.verifyAdmin, CategoryController.updateCategory);

// Delete a category (admin only)
router.delete('/:id', authMiddleware.verifyAdmin, CategoryController.deleteCategory);

module.exports = router;
