'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');
const { findPositions, replaceVar, randomNumber, arrayOfAnswers } = require('../middleWares/questionMiddlewares');
const Question = require('../models/Questions');

/* GET users listing. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser);
  const user = req.session.currentUser;
  User.findById(user._id).populate('questionsMade')
    .then((userData) => {
      req.session.currentUser = userData;
    }).catch(err => {
      console.log(err);
    });
  Question.find()
    .then((questions) => {
      const arrOfQuestions = [];
      for (let i = questions.length - 1; i > 0 && i >= questions.length - 20; i--) {
        const question = arrayOfAnswers(questions[i]);

        arrOfQuestions.push(question);
      }
      // const { id } = req.params;
      // const newQuestion = await Question.findById(id);
      // const questionObject = arrayOfAnswers(newQuestion, id);
      // res.render('home', questionObject);
      // console.log(questions);
      res.render('home', arrOfQuestions);
    }).catch(err => {
      console.log(err);
    });
});

module.exports = router;

// const arrayOfPositions = [];
// const arrayOfValues = [];
// for (let i = 0; i < newQuestion.parameters.length; i++) {
//   arrayOfPositions.push(newQuestion.parameters[i].position);
//   arrayOfValues.push(randomNumber(newQuestion.parameters[i].max, newQuestion.parameters[i].min, newQuestion.parameters[i].precission));
// }
// question = replaceVar(question, arrayOfPositions, arrayOfValues);

// const parser = new Parser();
// const expr = parser.parse(`${newQuestion.function}`);
// const solution = expr.evaluate({
//   a: arrayOfValues[0],
//   b: arrayOfValues[1],
//   c: arrayOfValues[2],
//   d: arrayOfValues[3],
//   e: arrayOfValues[4],
//   f: arrayOfValues[5],
//   g: arrayOfValues[6],
//   i: arrayOfValues[7]
// });

// const questionObject = {
//   question,
//   variables: arrayOfValues,
//   functionAnswer,
//   solution
// };
