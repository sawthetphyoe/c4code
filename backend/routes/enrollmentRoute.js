const express = require('express');
const enrollmentController = require('./../controllers/enrollmentController');

const router = express.Router();

router
  .route('/lectures/:id')
  .patch(enrollmentController.updateCompletedLectures);
// .patch(enrollmentController.addCompletedLecture)
// .delete(enrollmentController.deleteCompletedLecture);

router
  .route('/')
  .get(enrollmentController.getAllEnrollments)
  .post(enrollmentController.createEnrollment);

router
  .route('/:id')
  .get(enrollmentController.getEnrollment)
  .patch(enrollmentController.updateEnrollment)
  .delete(enrollmentController.deleteEnrollment);

module.exports = router;
