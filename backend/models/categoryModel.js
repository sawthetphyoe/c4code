const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name!'],
    unique: [true, 'Category name must be unique!'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
