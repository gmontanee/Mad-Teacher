'use strict';

const isLoggedIn = (req, res, next) => {
  if (req.session.currentUser) {
    return res.redirect('/home');
  }
  next();
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/');
  }
  next();
};

const isFormFilled = (req, res, next) => {
  const { username, password, name, surname, birthday } = req.body;
  if (!username || !password || !name || !surname || !birthday) {
    req.flash('errorFormNotFilled', 'All fields are required');
    if (username) {
      req.flash('errorDataForm', username);
    }
    return res.redirect(req.originalUrl);
  }
  next();
};

module.exports = { isLoggedIn, isNotLoggedIn, isFormFilled };
