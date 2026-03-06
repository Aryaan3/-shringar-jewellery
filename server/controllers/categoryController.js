import asyncHandler from '../middleware/asyncHandler.js';
import Category from '../models/categoryModel.js';

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
        return res.status(400).json({ error: 'Category already exists' });
    }

    const category = await new Category({ name }).save();
    res.json(category);
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const category = await Category.findById(id);

    if (category) {
        category.name = name;
        await category.save();
        res.json(category);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// @desc    Remove category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const removeCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (category) {
        await Category.deleteOne({ _id: id });
        res.json({ message: 'Category removed' });
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// @desc    List categories
// @route   GET /api/categories
// @access  Public
const listCategories = asyncHandler(async (req, res) => {
    const all = await Category.find({});
    res.json(all);
});

// @desc    Read category
// @route   GET /api/categories/:id
// @access  Public
const readCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        return res.json(category);
    } else {
        return res.status(400).json({ error: 'Category not found' });
    }
});

export { createCategory, updateCategory, removeCategory, listCategories, readCategory };
