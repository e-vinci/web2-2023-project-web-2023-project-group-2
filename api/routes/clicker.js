const express = require('express');
const { addPoint } = require('../models/users');
// const { } = require('../models/clicker');
const router = express.Router();

router.post('/registerScore', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const nbClick = req?.body?.nbClick >= 1 ? req.body.nbClick : undefined;

  if (!username || !nbClick) return res.sendStatus(400);

  const newNbClick = await addPoint(username, nbClick);

  return res.json(newNbClick);
});
