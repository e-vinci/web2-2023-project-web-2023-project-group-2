const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const { upgradeCost } = require('./upgrades');

const jsonDbPath = path.join(__dirname, '/../data/userUpgrades.json');

const defaultUserUpgrades = [
  {
    idUser: 1,
    idUpgrade: 1,
    cost: 15,
  },
  {
    idUser: 1,
    idUpgrade: 2,
    cost: 50,
  },
];

async function readAllUpgradesFromUser(idUser) {
  const userUpgrades = parse(jsonDbPath, defaultUserUpgrades);

  const userUpgradesById = userUpgrades.filter(
    (upgrade) => upgrade.idUser === parseInt(idUser, 10),
  );
  // const upgradeIds = userUpgradesById.map((upgrade) => upgrade.idUpgrade);

  return userUpgradesById;
}

async function addUpgradeForUser(idUser, idUpgrade) {
  const userUpgrades = parse(jsonDbPath, defaultUserUpgrades);

  const newUpgradeUser = {
    idUser,
    idUpgrade,
    cost: upgradeCost(idUpgrade),
  };
  console.log(upgradeCost(idUpgrade));

  userUpgrades.push(newUpgradeUser);

  serialize(jsonDbPath, userUpgrades);

  return newUpgradeUser;
}

async function updateCostUpgrade(id, idUpgrade) {
  const upgradeUser = parse(jsonDbPath, defaultUserUpgrades);
  const foundIndexUser = upgradeUser.findIndex((user) => user.idUser === parseInt(id, 10));
  const userUpdate = upgradeUser[foundIndexUser];

  const foundIndexUpgrade = userUpdate.findIndex((upgrade) => upgrade.idUpgrade
  === parseInt(idUpgrade, 10));

  userUpdate[foundIndexUpgrade].cost = upgradeCost(idUpgrade) * 2;
}

module.exports = {
  readAllUpgradesFromUser,
  addUpgradeForUser,
  updateCostUpgrade,
};
