const path = require('node:path');
const { parse } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/usersUpgrades.json');

const defaultUserUpgrades = [
  {
    idUser: 1,
    idUpgrade: 1,
  },
  {
    idUser: 1,
    idUpgrade: 2,
  },
];

function readAllUpgradesFromUser(idUser) {
  const userUpgrades = parse(jsonDbPath, defaultUserUpgrades);

  const userUpgradesById = userUpgrades.filter((userUpgrade) => userUpgrade.idUser === idUser);
  return userUpgradesById.idUpgrade;
}

module.exports = {
  readAllUpgradesFromUser,
};
