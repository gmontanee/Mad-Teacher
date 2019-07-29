'use strict';

const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');

/* GET users listing. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('home');
});

module.exports = router;
