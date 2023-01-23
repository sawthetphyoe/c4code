const express = require('express');
const sectionController = require('./../controllers/sectionController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.use(authController.checkLogin);

router
  .route('/')
  .get(sectionController.getAllSections)
  .post(sectionController.createSection);

router
  .route('/:id')
  .get(sectionController.getSection)
  .patch(sectionController.updateSection)
  .delete(sectionController.deleteSection);

module.exports = router;
