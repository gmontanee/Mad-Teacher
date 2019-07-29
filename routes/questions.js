const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');

/* GET users listing. */
router.get('/create', isNotLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser);
  return res.render('questions');
});

router.post('/create', async (req, res, next) => {
  return res.redirect('/home');
});

module.exports = router;
