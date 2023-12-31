const path = require('node:path');
const escape = require('escape-html');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/upgrades.json');

const defaultUpgrades = [
  {
    id: 1,
    title: 'click: +1',
    operation: 'add',
    cost: 15,
    upgradeClickerValue: 1,
  },
  {
    id: 2,
    title: 'click: +3',
    operation: 'add',
    cost: 50,
    upgradeClickerValue: 3,
  },
  {
    id: 3,
    title: 'click: +10',
    operation: 'add',
    cost: 200,
    upgradeClickerValue: 10,
  },
  {
    id: 4,
    title: 'click: x1,5',
    operation: 'multiply',
    cost: 100,
    upgradeClickerValue: 1.5,
  },
  {
    id: 5,
    title: 'autoClick + 1',
    operation: 'auto',
    cost: 50,
    upgradeClickerValue: 1,
  },
  {
    id: 6,
    title: 'autoClick + 3',
    operation: 'auto',
    cost: 120,
    upgradeClickerValue: 3,
  },
  {
    id: 7,
    title: 'click: +100',
    operation: 'add',
    cost: 10000,
    upgradeClickerValue: 100,
  },
  {
    id: 8,
    title: 'autoClick * 2',
    operation: 'auto',
    cost: 400,
    upgradeClickerValue: 2,
  },
  {
    id: 9,
    title: 'click: +1000',
    operation: 'add',
    cost: 500000,
    upgradeClickerValue: 1000,
  },
  {
    id: 10,
    title: 'autoClick + 100',
    operation: 'auto',
    cost: 6000,
    upgradeClickerValue: 100,
  },
  {
    id: 11,
    title: 'click: +10000',
    operation: 'add',
    cost: 6000000,
    upgradeClickerValue: 10000,
  },
  {
    id: 12,
    title: 'autoClick + 1000',
    operation: 'auto',
    cost: 60000,
    upgradeClickerValue: 1000,
  },
];

function readAllUpgrades(theOperation) {
  const upgrades = parse(jsonDbPath, defaultUpgrades);

  if (theOperation === undefined && theOperation !== 'multiply' && theOperation !== 'add') return upgrades;

  const upgradesByOperation = upgrades.filter((upgrade) => upgrade.operation === theOperation);
  return upgradesByOperation;
}

function readOneUpgrade(id) {
  const idNumber = Number(id);
  const upgrades = parse(jsonDbPath, defaultUpgrades);
  const indexUpgrade = upgrades.findIndex((upgrade) => upgrade.id === idNumber);
  if (indexUpgrade < 0) return undefined;

  return upgrades[indexUpgrade];
}

function createUpgrade(title, operation, cost, upgradeClickerValue) {
  const upgrades = parse(jsonDbPath, defaultUpgrades);

  const createdUpgrade = {
    id: getNextId(),
    title: escape(title),
    operation: escape(operation),
    cost: escape(cost),
    upgradeClickerValue: escape(upgradeClickerValue),
  };

  upgrades.push(createdUpgrade);

  serialize(jsonDbPath, upgrades);

  return createdUpgrade;
}

function getNextId() {
  const upgrades = parse(jsonDbPath, defaultUpgrades);
  const lastItemIndex = upgrades?.length !== 0 ? upgrades.length - 1 : undefined;
  if (lastItemIndex === undefined) return 1;
  const lastId = upgrades[lastItemIndex]?.id;
  const nextId = lastId + 1;
  return nextId;
}

function deleteOneUpgrade(id) {
  const idNumber = Number(id);
  const upgrades = parse(jsonDbPath, defaultUpgrades);
  const foundIndex = upgrades.findIndex((upgrade) => upgrade.id === idNumber);
  if (foundIndex < 0) return undefined;
  const deletedUpgrades = upgrades.splice(foundIndex, 1);
  const deletedUpgrade = deletedUpgrades[0];
  serialize(jsonDbPath, upgrades);

  return deletedUpgrade;
}

function updateOneUpgrade(id, propertiesToUpdate) {
  const idNumber = Number(id);
  const upgrades = parse(jsonDbPath, defaultUpgrades);
  const foundIndex = upgrades.findIndex((upgrade) => upgrade.id === idNumber);
  if (foundIndex < 0) return undefined;

  const updatedUpgrade = { ...upgrades[foundIndex], ...propertiesToUpdate };

  upgrades[foundIndex] = updatedUpgrade;

  serialize(jsonDbPath, upgrades);

  return updatedUpgrade;
}

function upgradeCost(idUpgrade) {
  const upgrades = parse(jsonDbPath, defaultUpgrades);
  const foundIndex = upgrades.findIndex((upgrade) => upgrade.id === parseInt(idUpgrade, 10));

  const upgrade = upgrades[foundIndex];

  return upgrade.cost;
}

module.exports = {
  readAllUpgrades,
  readOneUpgrade,
  createUpgrade,
  deleteOneUpgrade,
  updateOneUpgrade,
  upgradeCost,
};
