'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');
const { findPositions, replaceVar, randomNumber, arrayOfAnswers } = require('../middleWares/questionMiddlewares');
const Question = require('../models/Questions');

/* GET users listing. */

router.get('/beTeacher-11-99', isNotLoggedIn, (req, res, next) => {
  res.render('beTeacher');
});

router.post('/beTeacher-11-99', isNotLoggedIn, async (req, res, next) => {
  req.session.currentUser.teacher = true;
  const userId = req.session.currentUser._id;
  await User.findByIdAndUpdate(userId, req.session.currentUser);
  res.redirect('/home');
});

router.get('/', isNotLoggedIn, (req, res, next) => {
  const user = req.session.currentUser;
  User.findById(user._id).populate('questionsMade')
    .then((userData) => {
      req.session.currentUser = userData;
      Question.find()
        .then((questions) => {
          const arrOfQuestions = [];
          for (let i = questions.length - 1; i >= 0 && i >= questions.length - 20; i--) {
            let exist = false;
            for (let j = 0; j < req.session.currentUser.answers.length; j++) {
              if ((req.session.currentUser.answers[j]._id == questions[i]._id) && req.session.currentUser.answers[j].answerCorrect) {
                exist = true;
                arrOfQuestions.push(req.session.currentUser.answers[j]);
              }
            }
            if (!exist) {
              arrOfQuestions.push(arrayOfAnswers(questions[i]));
            }
          }
          const user = req.session.currentUser;
          user.generatedQuestions = arrOfQuestions;
          req.session.currentUser = user;
          console.log(arrOfQuestions.length);
          res.render('home', arrOfQuestions);
        }).catch(err => {
          console.log(err);
        });
    }).catch(err => {
      console.log(err);
    });
});

router.post('/:id', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const question = req.session.currentUser.generatedQuestions.find(elem => elem._id === id);
  question.answers.find(elem => elem.solution == req.body.solution).answered = true;
  if (question.answers.find(elem => elem.correct == true).solution == req.body.solution) {
    question.answerCorrect = true;
    req.session.currentUser.numberOfAnswers++;
    req.session.currentUser.correctAnswers++;
    req.session.currentUser.puntuation += 100;
  } else {
    question.answerCorrect = false;
    req.session.currentUser.numberOfAnswers++;
    req.session.currentUser.wrongAnswers++;
  }
  req.session.currentUser.answers.push(question);
  const userId = req.session.currentUser._id;
  await User.findByIdAndUpdate(userId, req.session.currentUser);
  req.session.currentUser.answers.push(question);
  res.redirect('/home');
});

module.exports = router;
