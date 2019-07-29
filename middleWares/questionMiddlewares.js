'use strict';

const findPositions = (question) => {
  const pos = [];
  for (let i = 0; i < question.length - 2; i++) {
    if (question[i] == '$' && question[i + 1] == '$' && question[i + 2] == '$') {
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
  pres = pres ** (-1);
  return Math.floor((Math.random() * (max - min) + min) * pres) / pres;
};

module.exports = { findPositions, replaceVar, randomNumber };
