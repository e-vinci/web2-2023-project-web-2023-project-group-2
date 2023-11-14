const express = require('express');
// const { } = require('../models/clicker');
const router = express.Router();

router.get('/registerScore', async (req, res) => {
  const iduser = req?.body?.idUser >= 1 ? req.body.idUser : undefined;

  if (!iduser) return res.sendStatus(400);
});
