const Category = require('../models/Category');

// Get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name, image } = req.body;
    const category = new Category({
        name,
        image,
    });
    try {
        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            await Category.deleteOne({ _id: req.params.id });
            res.json({ message: 'Category deleted' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        console.error('Error deleting category:', err); 
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


// Update a category
exports.updateCategory = async (req, res) => {
    const { name, image } = req.body;
    try {
        const category = await Category.findById(req.params.id);
        if (category) {
            category.name = name || category.name;
            category.image = image || category.image;
            const updatedCategory = await category.save();
            res.json(updatedCategory);
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
