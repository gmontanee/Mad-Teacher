'use strict';

const express = require('express');
const { isLoggedIn, isFormFilled } = require('../middleWares/authMiddlewares');
const User = require('../models/User.js');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', isLoggedIn, (req, res, next) => {
  res.render('beTeacher');
});
