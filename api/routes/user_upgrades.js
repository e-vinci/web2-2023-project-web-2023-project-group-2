const express = require('express');

const router = express.Router();

const { readAllUpgradesFromUser } = require('../models/user_upgrades');

router.get('/:id', (req, res) => {
  const foundUserUpgrade = readAllUpgradesFromUser(req.params.id);

  if (!foundUserUpgrade) return res.sendStatus(404);

  return res.json(foundUserUpgrade);
});

module.exports = router;
