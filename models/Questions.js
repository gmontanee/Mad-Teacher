'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questinonSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  parameters: {
    type: [Object],
    required: true
  },
  function: {
    type: String,
    required: true
  }
});

const Question = mongoose.model('Question', questinonSchema);

module.exports = Question;
