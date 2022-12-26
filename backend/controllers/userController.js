const AppError = require('./../utlis/appError');
const User = require('./../models/userModel');
const APIFeatures = require('./../utlis/apiFeatures');
const catchAsync = require('./../utlis/catchAsync');
const controllerFactory = require('./ControllerFactory');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

////////// Configuring storage with 'multer' //////////
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

////////// Image related Controllers //////////
exports.uploadUserImage = upload.single('image');

exports.resizeUserImage = (req, res, next) => {
  if (!req.file) {
    console.log('no req file');
    return next();
  }

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
};

////////// Controllers for users managing themselves //////////
exports.getMe = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      data: req.user,
    },
  });
};

exports.updateMe = catchAsync(async (req, res, next) => {
  let oldImage;

  // Check if user upload a photo
  if (req.file) {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    // Remember old image
    oldImage = user.image;
    req.file.filename = `user-${req.user._id}-${Date.now()}.jpeg`;

    sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    // Set image
    req.body.image = req.file.filename;
  }

  // Change updated date for user
  req.body.updatedAt = Date.now();

  const doc = await User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No user found with that ID', 404));
  }

  // If there is an old profile image Delete it
  if (oldImage) {
    fs.unlink(`${__dirname}/../public/img/users/${oldImage}`, (err) => {
      if (err) return next(new AppError('Cannot delete this photo', 404));
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

////////// Controllers for Admin managing user //////////
exports.getAllUsers = controllerFactory.getAll(User);
exports.getUser = controllerFactory.getOne(User);
exports.deleteUser = controllerFactory.deleteOne(User);
exports.updateUser = catchAsync(async (req, res, next) => {
  let oldImage;

  // Check if user upload a photo
  if (req.file) {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    // Remember old image
    oldImage = user.image;
    req.file.filename = `user-${req.params.id}-${Date.now()}.jpeg`;

    sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    // Set image
    req.body.image = req.file.filename;
  }

  // Change updated date for user
  req.body.updatedAt = Date.now();

  // Update user
  const doc = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  // If there is an old profile image Delete it
  if (oldImage) {
    fs.unlink(`${__dirname}/../public/img/users/${oldImage}`, (err) => {
      if (err) return next(new AppError('Cannot delete this photo', 404));
    });
  }

  // Send response
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
