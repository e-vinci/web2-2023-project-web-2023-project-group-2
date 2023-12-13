const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const { readOneUpgrade } = require('./upgrades');

const jwtSecret = 'covidClicker';
const lifetimeJwt = 24 * 60 * 60 * 1000; // in ms : 24 * 60 * 60 * 1000 = 24h

const saltRounds = 10;

const jsonDbPath = path.join(__dirname, '/../data/users.json');

const defaultUsers = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin', saltRounds),
    nbClick: 4646,
    valeurDuCLick: 1,
    valeurAuto: 0,
  },
  {
    id: 2,
    username: 'manager',
    password: bcrypt.hashSync('manager', saltRounds),
    nbClick: 0,
    valeurDuCLick: 1,
    valeurAuto: 0,

  },
];

async function login(username, password) {
  const userFound = readOneUserFromUsername(username);

  if (!userFound) return undefined;

  const passwordMatch = await bcrypt.compare(password, userFound.password);
  if (!passwordMatch) return undefined;

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

async function register(username, password) {
  const userFound = readOneUserFromUsername(username);
  if (userFound) return undefined;

  await createOneUser(username, password);

  const token = jwt.sign(
    { username }, // session data added to the payload (payload : part 2 of a JWT)
    jwtSecret, // secret used for the signature (signature part 3 of a JWT)
    { expiresIn: lifetimeJwt }, // lifetime of the JWT (added to the JWT payload)
  );

  const authenticatedUser = {
    username,
    token,
  };

  return authenticatedUser;
}

function readOneUserFromUsername(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound];
}

async function createOneUser(username, password) {
  const users = parse(jsonDbPath, defaultUsers);

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const createdUser = {
    id: getNextId(),
    username,
    password: hashedPassword,
    nbClick: 0,
    valeurDuCLick: 1,
    valeurAuto: 0,
  };

  users.push(createdUser);

  serialize(jsonDbPath, users);

  return createdUser;
}

function getNextId() {
  const users = parse(jsonDbPath, defaultUsers);
  const lastItemIndex = users?.length !== 0 ? users.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = users[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function addPoint(username, nvxPoints) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  users[indexOfUserFound].nbClick = nvxPoints;

  serialize(jsonDbPath, users);

  return users[indexOfUserFound].nbClick;
}

function changeNbCLick(id, nvxPoints) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === parseInt(id, 10));
  if (indexOfUserFound < 0) return undefined;

  users[indexOfUserFound].nbClick = nvxPoints;

  serialize(jsonDbPath, users);

  return users[indexOfUserFound].nbClick;
}

async function takeClickValue(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  const click = users[indexOfUserFound].valeurDuCLick;
  console.log(users);
  if (!click) return undefined;

  return click;
}

async function takeAutoClickValue(username) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.username === username);
  if (indexOfUserFound < 0) return undefined;

  const auto = users[indexOfUserFound].valeurAuto;
  console.log(users);
  if (auto === 0) return 0;
  if (!auto) return undefined;

  return auto;
}

async function takeClickUser(id) {
  const users = parse(jsonDbPath, defaultUsers);
  const indexOfUserFound = users.findIndex((user) => user.id === parseInt(id, 10));
  if (indexOfUserFound < 0) return undefined;

  return users[indexOfUserFound].nbClick;
}

function getAllUsersByScore() {
  const users = parse(jsonDbPath, defaultUsers);

  const usersByScore = users.sort((a, b) => b.nbClick - a.nbClick);
  return usersByScore;
}

async function upgradeClickValue(id, idU) {
  console.log(`Je rentre dans upgradeClickValue avec id = ${id} et idU = ${idU}`);
  const users = parse(jsonDbPath, defaultUsers);

  const indexOfUserFound = users.findIndex((user) => user.id === parseInt(id, 10));
  console.log(indexOfUserFound);
  if (indexOfUserFound < 0) return 'Not found User';

  const upgrade = readOneUpgrade(idU);
  console.log(idU);
  console.log(upgrade.operation);
  if (upgrade.operation === 'add') {
    users[indexOfUserFound].valeurDuCLick += upgrade.upgradeClickerValue;
  } else if (upgrade.operation === 'multiply') {
    users[indexOfUserFound].valeurDuCLick *= upgrade.upgradeClickerValue;
  } else {
    users[indexOfUserFound].valeurAuto += upgrade.upgradeClickerValue;
  }
  serialize(jsonDbPath, users);
  return true;
}

module.exports = {
  login,
  register,
  readOneUserFromUsername,
  addPoint,
  takeClickValue,
  takeAutoClickValue,
  takeClickUser,
  changeNbCLick,
  getAllUsersByScore,
  upgradeClickValue,
};
