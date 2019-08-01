'use strict';

const Parser = require('expr-eval').Parser;

const findPositions = (question) => {
  const pos = [];
  for (let i = 0; i < question.length - 2; i++) {
    if (question[i] === '$' && question[i + 1] === '$' && question[i + 2] === '$') {
      pos.push(i);
    }
  }
  return pos;
};

const replaceVar = (strarr, array, arrayvalues) => {
  const strarrI = strarr.split('');
  for (let i = array.length - 1; i >= 0; i--) {
    strarrI.splice(array[i], 3, `${arrayvalues[i]}`);
  }
  return strarrI.join('');
};

const randomNumber = (max, min, pres) => {
  max = parseInt(max);
  min = parseInt(min);
  pres = parseInt(pres);
  pres = pres ** (-1);
  return Math.floor((Math.random() * (max - min) + min) * pres) / pres;
};

const arrayOfAnswers = (newQuestion, id) => {
  let question = newQuestion.question;
  const arrayOfPositions = [];
  const arrayOfValues = [];
  for (let i = 0; i < newQuestion.parameters.length; i++) {
    arrayOfPositions.push(newQuestion.parameters[i].position);
    // console.log(newQuestion);
    // console.log(typeof newQuestion.parameters[i], newQuestion.parameters[i]);
    arrayOfValues.push(randomNumber(newQuestion.parameters[i].max, newQuestion.parameters[i].min, newQuestion.parameters[i].precission));
  }
  question = replaceVar(question, arrayOfPositions, arrayOfValues);

  const parser = new Parser();
  const answers = [];
  let correct = true;
  for (let i = 0; i < 4; i++) {
    const expr = parser.parse(`${newQuestion.function[i]}`);
    const answerObj = {};
    if (correct === true) {
      answerObj.correct = true;
      correct = false;
    } else {
      answerObj.correct = false;
    }

    answerObj.solution = expr.evaluate({
      a: arrayOfValues[0],
      b: arrayOfValues[1],
      c: arrayOfValues[2],
      d: arrayOfValues[3],
      e: arrayOfValues[4],
      f: arrayOfValues[5],
      g: arrayOfValues[6],
      i: arrayOfValues[7]
    });

    answers.push(answerObj);
  }
  const questionObject = {
    question,
    answers,
    _id: newQuestion._id,
    timesWrong: 0,
    answer: false,
    answerCorrect: false
  };

  let currentIndex = questionObject.answers.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = questionObject.answers[currentIndex];
    questionObject.answers[currentIndex] = questionObject.answers[randomIndex];
    questionObject.answers[randomIndex] = temporaryValue;
  }

  return questionObject;
};

module.exports = { findPositions, replaceVar, randomNumber, arrayOfAnswers };
