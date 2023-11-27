const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/userUpgrades.json');

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

async function readAllUpgradesFromUser(idUser) {
  const userUpgrades = parse(jsonDbPath, defaultUserUpgrades);

  const userUpgradesById = userUpgrades.filter(
    (upgrade) => upgrade.idUser === parseInt(idUser, 10),
  );
  const upgradeIds = userUpgradesById.map((upgrade) => upgrade.idUpgrade);

  return upgradeIds;
}

async function addUpgradeForUser(idUser, idUpgrade) {
  const userUpgrades = parse(jsonDbPath, defaultUserUpgrades);

  const newUpgradeUser = {
    idUser,
    idUpgrade,
  };

  userUpgrades.push(newUpgradeUser);

  serialize(jsonDbPath, userUpgrades);

  return newUpgradeUser;
}

module.exports = {
  readAllUpgradesFromUser,
  addUpgradeForUser,
};
