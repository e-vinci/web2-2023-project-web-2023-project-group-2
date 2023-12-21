const express = require('express');

const router = express.Router();

const { readAllUpgradesFromUser, addUpgradeForUser, updateCostUpgrade } = require('../models/userUpgrades');

const { readOneUserFromUsername } = require('../models/users');

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

router.patch('/', async (req, res) => {
  const idUpgradeUpdate = req?.body?.idUpgrade > 0 ? req.body.idUpgrade : undefined;
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  if (!idUpgradeUpdate) return res.sendStatus(404);
  if (!username) return res.sendStatus(404);

  const idUser = readOneUserFromUsername(username);

  // eslint-disable-next-line max-len
  const updateUpgrade = await updateCostUpgrade(parseInt(idUser.id, 10), parseInt(idUpgradeUpdate, 10));

  return res.json(updateUpgrade);
});

module.exports = router;
