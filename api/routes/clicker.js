const express = require('express');
const {
  addPoint, addOrMultiplyClickerByUpgrade, takeClickValue, readOneUserFromUsername,
} = require('../models/users');
// const { } = require('../models/clicker');
const router = express.Router();

router.post('/registerScore', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const nbClick = req?.body?.nvxPoints >= 1 ? req.body.nvxPoints : undefined;

  if (!username || !nbClick) return res.sendStatus(400);

  const newNbClick = await addPoint(username, nbClick);

  return res.json(newNbClick);
});

router.patch('/upgradeClicker', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const upgradeID = req?.body?.upgradeID >= 1 ? req.body.upgradeID : undefined;

  if (!username || !upgradeID) return res.sendStatus(400);

  const valeurDuCLick = await addOrMultiplyClickerByUpgrade(username, upgradeID);

  return res.json(valeurDuCLick);
});

router.post('/valueClickUser', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;

  if (!username) return res.sendStatus(400);

  const clickValue = await takeClickValue(username);

  console.log(`valeur du clicl = ${clickValue}`);
  return res.json(clickValue);
});

router.post('/scoreUser', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  if (!username) return res.sendStatus(400);

  const score = await readOneUserFromUsername(username).nbClick;

  console.log(`score = ${score}`);
  return res.json(score);
});

module.exports = router;
