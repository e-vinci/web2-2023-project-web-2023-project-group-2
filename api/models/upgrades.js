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
    title: 'click: x2',
    operation: 'multiply',
    cost: 100,
    upgradeClickerValue: 2,
  },
  {
    id: 4,
    title: 'click: +10',
    operation: 'add',
    cost: 200,
    upgradeClickerValue: 10,
  },
  {
    id: 5,
    title: 'click: x5',
    operation: 'multiply',
    cost: 1000,
    upgradeClickerValue: 5,
  },
];

function readAllUpgrades(theOperation) {
  const upgrades = parse(jsonDbPath, defaultUpgrades);

  if (theOperation === undefined || theOperation !== 'multiply' || theOperation !== 'add') return upgrades;

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

module.exports = {
  readAllUpgrades,
  readOneUpgrade,
  createUpgrade,
  deleteOneUpgrade,
  updateOneUpgrade,
};
