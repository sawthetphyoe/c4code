const Course = require('./../models/courseModel');
const controllerFactory = require('./ControllerFactory');

const popOptions = [
  { path: 'lectures', select: '-__v -createdAt' },
  { path: 'instructors', select: 'firstName lastName' },
  { path: 'category', select: 'name' },
];

exports.createCourse = controllerFactory.createOne(Course);
exports.getCourse = controllerFactory.getOne(Course, popOptions);
exports.getAllCourses = controllerFactory.getAll(Course, popOptions);
exports.updateCourse = controllerFactory.updateOne(Course);
exports.deleteCourse = controllerFactory.deleteOne(Course);
