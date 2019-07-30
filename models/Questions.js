'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  parameters: {
    type: [Object],
    required: true
  },
  function: {
    type: [String]
  }
});

const Question = mongoose.model('Questions', questionSchema);

module.exports = Question;
