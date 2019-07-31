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
  // console.log(question);
  // console.log(question.answers.find(elem => elem.correct == true).solution);
  if (question.answers.find(elem => elem.correct == true).solution == req.body.solution) {
    console.log('correct');
  } else {
    console.log('wrong');
  }
  // const questionsArray = req.session.currentUser.generatedQuestions;
  // console.log(req.body.solution);

  res.redirect('/home');
});

module.exports = router;
