const express = require('express');
const {
  readAllUpgrades,
  readOneUpgrade,
  createUpgrade,
  deleteOneUpgrade,
  updateOneUpgrade,
} = require('../models/upgrades');
const { authorize, isAdmin } = require('../utils/auths');

const router = express.Router();

/* Read all the upgrades */
router.get('/', (req, res) => {
  const allUpgradesPotentiallyByOperations = readAllUpgrades(req?.query?.operation);
  if (allUpgradesPotentiallyByOperations === undefined) return res.sendStatus(400);

  return res.json(allUpgradesPotentiallyByOperations);
});

// Read the upgrade identified by an id
router.get('/:id', (req, res) => {
  const foundUpgrade = readOneUpgrade(req.params.id);

  if (!foundUpgrade) return res.sendStatus(404);

  return res.json(foundUpgrade);
});

// Create an upgrade to be added.
router.post('/', authorize, isAdmin, (req, res) => {
  const title = req?.body?.title?.length !== 0 ? req.body.title : undefined;
  const operation = req?.body?.content?.length !== 0 ? req.body.operation : undefined;
  const cost = typeof req?.body?.cost !== 'number' || req.body.cost < 0 ? undefined : req.body.cost;
  const upgradeClickerValue = typeof req?.body?.upgradeClickerValue !== 'number' || req.body.upgradeClickerValue < 0 ? undefined : req.body.upgradeClickerValue;

  if (!title || !operation || !cost || !upgradeClickerValue) return res.sendStatus(400);

  const createdUpgrade = createUpgrade(title, operation, cost, upgradeClickerValue);

  return res.json(createdUpgrade);
});

// Delete an upgrade based on its id
router.delete('/:id', authorize, isAdmin, (req, res) => {
  const deletedUpgrade = deleteOneUpgrade(req.params.id);

  if (!deletedUpgrade) return res.sendStatus(404);

  return res.json(deletedUpgrade);
});

// Update an upgrade based on its id and new values for its parameters
router.patch('/:id', authorize, isAdmin, (req, res) => {
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

module.exports = router;
