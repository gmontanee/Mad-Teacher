const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');

/* GET users listing. */
router.get('/create', isNotLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser);
  res.render('questions');
});

router.post('/create', (req, res, next) => {
  console.log(req.body);
  res.redirect('/home');
});
module.exports = router;

// router.post('/signup', async (req, res, next) => {
//   try {
//     const { username, password, name, surname, birthday } = req.body;

//     const salt = bcrypt.genSaltSync(saltRounds);
//     const hashedPassword = bcrypt.hashSync(password, salt);

//     const user = await User.findOne({ username });
//     if (user) {
//       return res.redirect('/signup');
//     }
//     const newUser = await User.create({
//       username,
//       password: hashedPassword,
//       name,
//       surname,
//       birthday
//     });
//     req.session.currentUser = newUser;
//     res.redirect('/home');
//   } catch (error) {
//     console.log(error);
//   }
// });
