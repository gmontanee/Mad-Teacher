const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');
const parser = require('../config/cloudinary');
const User = require('../models/User');

/* GET users listing. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  User.findById(user._id).populate('questionsMade')
    .then((userData) => {
      req.session.currentUser = userData;
    }).catch(err => {
      console.log(err);
    });
  res.render('profile');
  console.log(req.session.currentUser.questionsMade[0].parameters);
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
