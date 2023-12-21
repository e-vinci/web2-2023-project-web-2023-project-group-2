const express = require('express');
const {
  readAllUpgrades,
  readOneUpgrade,
  createUpgrade,
  deleteOneUpgrade,
  updateOneUpgrade,
} = require('../models/upgrades');
const { readOneUserFromUsername } = require('../models/users');
const { readAllUpgradesFromUser } = require('../models/userUpgrades');
const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

/* Read all upgrade for a user */
router.post('/readAll', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;

  if (!username) return res.sendStatus(400);

  const indexOfUserFound = readOneUserFromUsername(username);
  if (indexOfUserFound === undefined) return res.sendStatus(400);

  const allUserUpgrades = await readAllUpgradesFromUser(indexOfUserFound.id);
  const allUpgrade = readAllUpgrades();

  console.log(allUserUpgrades, allUpgrade);

  const mergeUpgrade = mergeUpgrades(allUserUpgrades, allUpgrade);

  return res.json(mergeUpgrade);
});

/* Read all the upgrades */
router.get('/', async (req, res) => {
  const allUpgradesPotentiallyByOperations = readAllUpgrades(req?.query?.operation);
  if (allUpgradesPotentiallyByOperations === undefined) return res.sendStatus(400);

  return res.json(allUpgradesPotentiallyByOperations);
});

// Read the upgrade identified by an id
router.get('/:id', async (req, res) => {
  const foundUpgrade = readOneUpgrade(req.params.id);

  if (!foundUpgrade) return res.sendStatus(404);

  return res.json(foundUpgrade);
});

// Create an upgrade to be added.
router.post('/', authorize, isAdmin, async (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const operation = req?.body?.content?.length !== 0 ? req.body.operation : undefined;
  const cost = typeof req?.body?.cost !== 'number' || req.body.cost < 0 ? undefined : req.body.cost;
  const upgradeClickerValue = typeof req?.body?.upgradeClickerValue !== 'number' || req.body.upgradeClickerValue < 0 ? undefined : req.body.upgradeClickerValue;

  if (!title || !operation || !cost || !upgradeClickerValue) return res.sendStatus(400);

  const createdUpgrade = createUpgrade(title, operation, cost, upgradeClickerValue);

  return res.json(createdUpgrade);
});

// Delete an upgrade based on its id
router.delete('/:id', authorize, isAdmin, async (req, res) => {
  const deletedUpgrade = deleteOneUpgrade(req.params.id);

  if (!deletedUpgrade) return res.sendStatus(404);

  return res.json(deletedUpgrade);
});

// Update an upgrade based on its id and new values for its parameters
router.patch('/:id', authorize, isAdmin, async (req, res) => {
  const title = req?.body?.title;
  const operation = req?.body?.operation;
  const cost = typeof req?.body?.cost !== 'number' || req.body.cost < 0 ? undefined : req.body.cost;
  const upgradeClickerValue = typeof req?.body?.upgradeClickerValue !== 'number' || req.body.upgradeClickerValue < 0 ? undefined : req.body.upgradeClickerValue;

  if (!title && !operation && !cost && !upgradeClickerValue) return res.sendStatus(400);

  const updatedUpgrade = updateOneUpgrade(req.params.id, {
    title, operation, cost, upgradeClickerValue,
  });

  if (!updatedUpgrade) return res.sendStatus(404);

  return res.json(updatedUpgrade);
});

function mergeUpgrades(userUpgrades, upgrades) {
  const mergedUpgrades = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const upgrade of upgrades) {
    const userUpgrade = userUpgrades.find((u) => u.idUpgrade === upgrade.id);

    const mergedUpgrade = { ...upgrade };
    if (userUpgrade) {
      mergedUpgrade.cost = userUpgrade.cost;
    }

    mergedUpgrades.push(mergedUpgrade);
  }

  return mergedUpgrades;
}

module.exports = router;
