const express = require('express');
const lectureController = require('./../controllers/lectureController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.checkLogin);

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
