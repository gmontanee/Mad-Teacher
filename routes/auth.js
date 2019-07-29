'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const { isLoggedIn, isFormFilled } = require('../middleWares/authMiddlewares');
const User = require('../models/User.js');
const mongoose = require('mongoose');

const saltRounds = 10;
const router = express.Router();

/* GET home page. */

router.get('/signup', isLoggedIn, (req, res, next) => {
  const data = {
    messages: req.flash('errorFormNotFilled'),
    formData: req.flash('errorDataForm')
  };
  res.render('signup', data);
});

// Falta isFormFilled
router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, name, surname, birthday } = req.body;

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = await User.findOne({ username });
    if (user) {
      return res.redirect('/signup');
    }
    const newUser = await User.create({
      username,
      password: hashedPassword,
      name,
      surname,
      birthday
    });
    req.session.currentUser = newUser;
    res.redirect('/home');
  } catch (error) {
    console.log(error);
  }
});

router.get('/', isLoggedIn, (req, res, next) => {
  res.render('login', { title: 'Express' });
});

// Falta isFormFilled
router.post('/', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/');
    }
    if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user;
      res.redirect('/home');
    } else {
      return res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res, next) => {
  delete req.session.currentUser;
  return res.redirect('/');
});

module.exports = router;
