const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name!'],
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  relatedCourse: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
  },
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
