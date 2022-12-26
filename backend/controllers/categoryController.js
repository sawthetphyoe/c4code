const AppError = require('./../utlis/appError');
const Category = require('./../models/categoryModel');
const catchAsync = require('./../utlis/catchAsync');
const controllerFactory = require('./ControllerFactory');

exports.createCategory = controllerFactory.createOne(Category);
exports.getAllCategories = controllerFactory.getAll(Category);
exports.getCategory = controllerFactory.getOne(Category);
exports.updateCategory = controllerFactory.updateOne(Category);
exports.deleteCategory = controllerFactory.deleteOne(Category);
