'use strict';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'diuyi5uql',
  api_key: '921863531314387',
  api_secret: 'NmJgUBYDVFU1DKpD4qf4OYzmhdg'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'users-pictures',
  allowedFormats: ['jpg', 'png']
});

const parser = multer({ storage: storage });

module.exports = parser
;
