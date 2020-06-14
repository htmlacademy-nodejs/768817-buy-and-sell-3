'use strict';
const {isEmpty} = require(`ramda`);
const {Router} = require(`express`);
const request = require(`request-promise-native`);

const {BASE_URL_SERVICE, offersList, searching} = require(`../../endPoints`);

const commonRouter = new Router();

commonRouter.get(`/`, async (req, res) => {
  let offers = [];
  try {
    offers = await request(`${BASE_URL_SERVICE + offersList}`, {json: true});
    return res.render(`main`, {offers});
  } catch (err) {
    console.error(`error:`, err);
    return res.render(`main`, {offers});
  }
});
commonRouter.get(`/search`, async (req, res) => {
  if (isEmpty(req.query)) {
    return res.render(`search-result`, {offers: []});
  }
  let offers = [];
  const options = {
    uri: `${BASE_URL_SERVICE + searching}`,
    qs: req.query,
    json: true
  };
  try {
    offers = await request(options);
  } catch (err) {
    console.error(`Error occured:`, err);
  }
  return res.render(`search-result`, {offers});
});
commonRouter.get(`/register`, (req, res) => res.render(`sign-up`));
commonRouter.get(`/login`, (req, res) => res.render(`login`));

module.exports = commonRouter;
