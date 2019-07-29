'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  parameters: {
    type: [{ ObjectId }],
    required: true
  },
  function: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
