const express = require('express');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const multer = require('multer');

const router = express.Router();

// Routes that don't require login
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.use(authController.checkLogin);

// Routes that require login
router.get('/check-login', userController.getMe);
router.post('/updateMyPassword', authController.changePassword);
router.patch('/me', userController.uploadUserImage, userController.updateMe);

////////// Routes restricted to Admin or Instructor//////////
router.use(authController.restrictTo('admin', 'instructor'));

router.route('/').get(userController.getAllUsers);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.uploadUserImage, userController.updateUser);

////////// Routes restricted to Admin //////////
router.use(authController.restrictTo('admin'));

// Resigter User
router.post('/register', authController.register);

// Reset User Password
router.patch('/resetPassword/:id', authController.resetPassword);

// Delete User
router.delete('/:id', userController.deleteUser);

module.exports = router;
