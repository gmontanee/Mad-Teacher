const express = require('express');
const router = express.Router();
const { isNotLoggedIn } = require('../middleWares/authMiddlewares');
const { findPositions, replaceVar, randomNumber, arrayOfAnswers } = require('../middleWares/questionMiddlewares');
const Question = require('../models/Questions');
const User = require('../models/User.js');

/* GET users listing. */
router.get('/create', isNotLoggedIn, (req, res, next) => {
  res.render('questions-create-1');
});

router.post('/create', async (req, res, next) => {
  const { question } = req.body;
  const numOfVariable = findPositions(question);
  const newQuestion = await Question.create({
    question
  });
  const questionId = newQuestion._id;
  for (let i = 0; i < numOfVariable.length; ++i) {
    await Question.findByIdAndUpdate(questionId, { $push: { parameters: { position: numOfVariable[i] } } });
  }
  res.redirect(`/questions/create/2/${questionId}`);
});

router.get('/create/2/:id', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const newQuestion = await Question.findById(id);
  res.render('questions-create-2', newQuestion);
});

router.post('/create/2/:id', async (req, res, next) => {
  const { id } = req.params;
  const newQuestion = await Question.findById(id);
  for (let i = 0; i < newQuestion.parameters.length; i++) {
    newQuestion.parameters[i].max = req.body.max[i];
    newQuestion.parameters[i].min = req.body.min[i];
    newQuestion.parameters[i].precission = req.body.precission[i];
  }
  await Question.findByIdAndUpdate(newQuestion._id, newQuestion);
  res.redirect(`/questions/create/3/${newQuestion._id}`);
});

router.get('/create/3/:id', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const newQuestion = await Question.findById(id);
  res.render('questions-create-3', newQuestion);
});

router.post('/create/3/:id', async (req, res, next) => {
  const { id } = req.params;
  const newQuestion = await Question.findById(id);
  const funcObj = [`${req.body.cFunc}`, `${req.body.wFunc1}`, `${req.body.wFunc2}`, `${req.body.wFunc3}`];
  newQuestion.function = funcObj;
  await Question.findByIdAndUpdate(newQuestion._id, newQuestion);
  res.redirect(`/questions/create/4/${newQuestion._id}`);
});

router.get('/create/4/:id', isNotLoggedIn, async (req, res, next) => {
  const { id } = req.params;
  const newQuestion = await Question.findById(id);
  const questionObject = arrayOfAnswers(newQuestion, id);
  console.log(questionObject);
  res.render('questions-create-4', questionObject);
});

router.post('/create/4/:id', async (req, res, next) => {
  const { id } = req.params;
  const newQuestion = await Question.findById(id);
  const userId = req.session.currentUser._id;
  await User.findByIdAndUpdate(userId, { $push: { questionsMade: newQuestion } }, { new: true });
  res.redirect('/home');
});

module.exports = router;
