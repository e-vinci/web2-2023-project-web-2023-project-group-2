const express = require('express');

const { getAllUsersByScore } = require('../models/users');

const router = express.Router();

router.get('/', async (req, res) => {
  const userSortded = getAllUsersByScore();
  if (userSortded === undefined) return res.sendStatus(400);

  return res.json(userSortded);
});

module.exports = router;
