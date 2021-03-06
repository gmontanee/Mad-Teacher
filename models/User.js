'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  surname: {
    type: String
  },
  birthday: {
    type: String
  },
  numberOfAnswers: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  wrongAnswers: {
    type: Number,
    default: 0
  },
  puntuation: {
    type: Number,
    default: 0
  },
  generatedQuestions: {
    type: [Object]
  },
  answers: {
    type: [Object]
  },
  teacher: {
    type: Boolean,
    default: false
  },
  questionsMade: [{ type: ObjectId, ref: 'Questions' }],
  currentQuestion: Object
});
const User = mongoose.model('User', userSchema);
module.exports = User;
