const express = require('express');

const router = express.Router();

const { readAllUpgradesFromUser } = require('../models/userUpgrades');

router.get('/:id', (req, res) => {
  console.log('Je suis dans la route get');

  const foundUserUpgrade = readAllUpgradesFromUser(req.params.id);

  if (!foundUserUpgrade) return res.sendStatus(404);

  return res.json(foundUserUpgrade);
});

module.exports = router;
