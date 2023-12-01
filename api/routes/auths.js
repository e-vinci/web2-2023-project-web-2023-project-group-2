const express = require('express');
const { register, login } = require('../models/users');

const router = express.Router();

/* Register a user */
router.post('/register', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;
  const confirmPassword = req?.body?.confirmPassword?.length
  !== 0 ? req.body.confirmPassword : undefined;

  if (!username || !password || !confirmPassword) return res.sendStatus(400); // 400 Bad Request

  const messageErreur = {
    weakPassword: false,
    passwordNoMatch: false,
    userPresent: false,
  };

  if (!password.match(/[0-9]/g)
  || !password.match(/[A-Z]/g)
  || !password.match(/[a-z]/g)
  || !password.match(/[^a-zA-Z\d]/g)
  || (password.length < 8)) {
    messageErreur.weakPassword = true;
    return res.status(401).json(messageErreur);
  }

  if (password !== confirmPassword) {
    messageErreur.passwordNoMatch = true;
    return res.status(401).json(messageErreur);
  }

  const authenticatedUser = await register(username, password);

  if (!authenticatedUser) {
    messageErreur.userPresent = true;
    return res.status(409).json(messageErreur);
  }
  return res.json(authenticatedUser);
});

/* Login a user */
router.post('/login', async (req, res) => {
  const username = req?.body?.username?.length !== 0 ? req.body.username : undefined;
  const password = req?.body?.password?.length !== 0 ? req.body.password : undefined;

  if (!username || !password) return res.sendStatus(400); // 400 Bad Reques

  const authenticatedUser = await login(username, password);

  if (!authenticatedUser) return res.sendStatus(401); // 401 Unauthorized

  return res.json(authenticatedUser);
});

module.exports = router;
