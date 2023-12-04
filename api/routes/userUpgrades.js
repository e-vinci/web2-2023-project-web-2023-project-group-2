const express = require('express');

const router = express.Router();

const { readAllUpgradesFromUser, addUpgradeForUser, updateCostUpgrade } = require('../models/userUpgrades');

router.get('/:id', async (req, res) => {
  const foundUserUpgrade = await readAllUpgradesFromUser(req.params.id);

  if (!foundUserUpgrade) return res.sendStatus(404);

  return res.json(foundUserUpgrade);
});

router.post('/:id', async (req, res) => {
  const idUpgradeAdd = req?.body?.idUpgrade > 0 ? req.body.idUpgrade : undefined;
  if (!idUpgradeAdd) return res.sendStatus(404);

  const addUpgrade = await addUpgradeForUser(req.params.id, idUpgradeAdd);

  return res.json(addUpgrade);
});

router.patch('/:id', async (req, res) => {
  const idUpgradeUpdate = req?.body?.idUpgrade > 0 ? req.body.idUpgrade : undefined;
  if (!idUpgradeUpdate) return res.sendStatus(404);

  const updateUpgrade = await updateCostUpgrade(req.params.id, idUpgradeUpdate);

  return res.json(updateUpgrade);
});

module.exports = router;
