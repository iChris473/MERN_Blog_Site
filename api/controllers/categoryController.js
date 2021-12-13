require('../models/db');
const Category = require('../models/Category');

// POST CATEGOTIES
exports.postCategory = async (req, res) => {
    const newCategory = new Category(req.body)
    try {
     const savedCat =  await newCategory.save();
     res.status(200).json(savedCat)
    } catch (err) {
        res.status(404).json(err)
    }
}

// GET CATEGORIES
exports.getCategory = async (req, res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats)
    } catch (err) {
        res.status(404).json(err)
    }
}