const Category = require('../models/Careers');


// Get all career categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};




// Create a new career category
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


// Delete a career category
exports.deleteCategory = async (req, res) => {
    try {
        // const category = await Category.findById(req.params.id);
        // if (category) {
        //     await category.remove();
        const result = await Category.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.json({ message: 'Category deleted' });
        } else {
            res.status(404).json({ message: 'Category not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update a career category
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
