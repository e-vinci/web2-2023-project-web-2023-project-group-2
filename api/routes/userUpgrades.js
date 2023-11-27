const express = require('express');

const router = express.Router();

const { readAllUpgradesFromUser, addUpgradeForUser } = require('../models/userUpgrades');

router.get('/:id', async (req, res) => {
  const foundUserUpgrade = await readAllUpgradesFromUser(req.params.id);

  if (!foundUserUpgrade) return res.sendStatus(404);

  return res.json(foundUserUpgrade);
});

router.post('/:id', async (req, res) => {
  const idUpgradeAdd = req?.body?.idUpgrade > 0 ? req.body.idUpgrade : undefined;
  console.log(idUpgradeAdd);
  console.log(req.body.idUpgrade);
  if (!idUpgradeAdd) return res.sendStatus(404);

  const addUpgrade = await addUpgradeForUser(req.params.id, idUpgradeAdd);

  return res.json(addUpgrade);
});

module.exports = router;
