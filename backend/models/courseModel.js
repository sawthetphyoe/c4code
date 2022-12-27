const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a course name'],
  },
  description: {
    type: String,
  },
  image: String,
  lectures: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Lecture',
    },
  ],
  instructors: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  active: {
    type: Boolean,
    default: false,
  },
});

// courseSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'lectures',
//     select: '-__v -createdAt',
//   });
//   next();
// });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
