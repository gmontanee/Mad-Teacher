const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');
const parser = require('../config/cloudinary');
const User = require('../models/User');

/* GET users listing. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('profile');
});

router.post('/', isNotLoggedIn, parser.single('photo'), async (req, res, next) => {
  const image = req.file.secure_url;
  try {
    const userId = req.session.currentUser._id;
    await User.findByIdAndUpdate(userId, { image });
    res.redirect('/profile');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
