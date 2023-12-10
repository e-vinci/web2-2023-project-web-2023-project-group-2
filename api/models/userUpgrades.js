const path = require('node:path');
const { parse, serialize } = require('../utils/json');
const { upgradeCost } = require('./upgrades');
const { takeClickUser, changeNbCLick, upgradeClickValue } = require('./users');

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
  {
    idUser: 2,
    idUpgrade: 1,
    cost: 15,
  },
  {
    idUser: 2,
    idUpgrade: 2,
    cost: 50,
  },
];

async function readAllUpgradesFromUser(idUser) {
  const userUpgrades = parse(jsonDbPath, defaultUserUpgrades);

  const userUpgradesById = userUpgrades.filter(
    (upgrade) => upgrade.idUser === parseInt(idUser, 10),
  );

  return userUpgradesById;
}

async function addUpgradeForUser(idUser, idUpgrade) {
  const upgradeUser = parse(jsonDbPath, defaultUserUpgrades);
  const userUpdate = upgradeUser.filter((user) => user.idUser === parseInt(idUser, 10));

  const foundIndexUpgrade = userUpdate.findIndex((upgrade) => upgrade.idUpgrade
  === parseInt(idUpgrade, 10));
  console.log(foundIndexUpgrade);
  if (foundIndexUpgrade >= 0) return null;
  const newUpgradeUser = {
    idUser: parseInt(idUser, 10),
    idUpgrade,
    cost: upgradeCost(idUpgrade),
  };

  upgradeUser.push(newUpgradeUser);

  serialize(jsonDbPath, upgradeUser);

  return newUpgradeUser;
}

async function updateCostUpgrade(id, idU) {
  const upgradeUser = parse(jsonDbPath, defaultUserUpgrades);
  const userUpdate = upgradeUser.filter((user) => user.idUser === parseInt(id, 10));

  const foundIndexUpgrade = userUpdate.findIndex((upgrade) => upgrade.idUpgrade
  === parseInt(idU, 10));
  if (foundIndexUpgrade < 0) return addUpgradeForUser(id, idU);
  const clickUser = await takeClickUser(id);
  if (clickUser >= userUpdate[foundIndexUpgrade].cost) {
    userUpdate[foundIndexUpgrade].cost *= 2;
    serialize(jsonDbPath, upgradeUser);

    const newClickUser = clickUser - userUpdate[foundIndexUpgrade].cost;

    changeNbCLick(id, newClickUser);
    upgradeClickValue(id, idU);
    return newClickUser;
  }
  return null;
}

module.exports = {
  readAllUpgradesFromUser,
  addUpgradeForUser,
  updateCostUpgrade,
};
