'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');
const { findPositions, replaceVar, randomNumber, arrayOfAnswers } = require('../middleWares/questionMiddlewares');
const Question = require('../models/Questions');

/* GET users listing. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  // const user = req.session.currentUser;
  // User.findById(user._id).populate('questionsMade')
  //   .then((userData) => {
  //     req.session.currentUser = userData;
  //   }).catch(err => {
  //     console.log(err);
  //   });
  if (req.session.currentUser.generatedQuestions.length === 0) {
    console.log(req.session.currentUser.generatedQuestions);
    Question.find()
      .then((questions) => {
        const arrOfQuestions = [];
        for (let i = questions.length - 1; i > 0 && i >= questions.length - 20; i--) {
          const question = arrayOfAnswers(questions[i]);
          arrOfQuestions.push(question);
        }
        req.session.currentUser.generatedQuestions = arrOfQuestions;
        res.render('home', arrOfQuestions);
      }).catch(err => {
        console.log(err);
      });
  } else {
    res.render('home', req.session.currentUser.generatedQuestions);
  }
});

router.post('/:id', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const question = req.session.currentUser.generatedQuestions.find(elem => elem._id == id);
  console.log(question.answers);
  question.answers.find(elem => elem.solution == req.body.solution).answered = true;
  if (question.answers.find(elem => elem.correct == true).solution == req.body.solution) {
    question.answer = true;
    req.session.currentUser.correctAnswers++;
    req.session.currentUser.puntuation += 100;
    req.session.currentUser.generatedQuestions.map(elem => {
      if (elem._id == question._id) {
        elem = question;
      }
    });
  } else {
    question.answer = false;
    req.session.currentUser.wrongAnswers--;
    req.session.currentUser.generatedQuestions.map(elem => {
      if (elem._id == question._id) {
        console.log(Question.findById(elem._id).schema.obj);
        elem = arrayOfAnswers(Question.findById(elem._id).schema.obj);
      }
    });
  }
<<<<<<< HEAD
  const userId = req.session.currentUser._id;
  await User.findByIdAndUpdate(userId, req.session.currentUser);
  req.session.currentUser.answers.push(question);
=======
  // const questionsArray = req.session.currentUser.generatedQuestions;
  // console.log(req.body.solution);
>>>>>>> d5b48e91361f9d4dfa6c3a88b78f6bbffb76f605
  res.redirect('/home');
});

module.exports = router;
