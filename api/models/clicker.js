const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/clicker.json');

const defaultClicker = [
    {
      id: 1,
      oneClick: 1,
    },
];



module.exports = {};
  