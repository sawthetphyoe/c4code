const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A lecture must have a name'],
  },
  url: {
    type: String,
    required: [true, 'A lecture must have a video url'],
  },
  section: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Lecture = mongoose.model('Lecture', lectureSchema);

module.exports = Lecture;
