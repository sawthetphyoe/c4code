const express = require('express');
const lectureController = require('./../controllers/lectureController');

const router = express.Router();

router
  .route('/')
  .get(lectureController.getAllLectures)
  .post(lectureController.createLecture);

router
  .route('/:id')
  .get(lectureController.getLecture)
  .patch(lectureController.updateLecture)
  .delete(lectureController.deleteLecture);

module.exports = router;
