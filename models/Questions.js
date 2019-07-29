'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const questinonSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  parameters: {
    type: [{ ObjectId }],
    required: true
  },
  function: {
    type: String,
    required: true
  }
});

const Question = mongoose.model('Question', questinonSchema);

module.exports = Question;
