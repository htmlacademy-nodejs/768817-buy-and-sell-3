'use strict';
const {FILENAME_MOCKS} = require(`../../constants`);

const fs = require(`fs`).promises;
let data = null;

const getOffers = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILENAME_MOCKS);
    data = JSON.parse(fileContent);
  } catch (err) {
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = {
  getOffers
};
