'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  parameters: {
    type: [Object],
    required: true
  },
  function: {
    type: String
  }
});

const Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions;
