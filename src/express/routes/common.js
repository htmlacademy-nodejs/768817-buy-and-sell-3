'use strict';

const {Router} = require(`express`);
const request = require(`request-promise-native`);

const {BASE_URL_SERVICE, offersList} = require(`../../endPoints`);

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
commonRouter.get(`/search`, (req, res) => res.render(`search-result`));
commonRouter.get(`/register`, (req, res) => res.render(`sign-up`));
commonRouter.get(`/login`, (req, res) => res.render(`login`));

module.exports = commonRouter;
