'use strict';
const {isEmpty} = require(`ramda`);
const {Router} = require(`express`);
const {getAPI} = require(`../api`);

const commonRouter = new Router();
const api = getAPI();

commonRouter.get(`/`, async (req, res) => {
  let offers = [];
  offers = await api.getOffers();
  return res.render(`main`, {offers});
});

commonRouter.get(`/search`, async (req, res) => {
  if (isEmpty(req.query)) {
    return res.render(`search-result`, {offers: []});
  }
  const offers = await api.search(req.query);

  return res.render(`search-result`, {offers});
});
commonRouter.get(`/register`, (req, res) => res.render(`sign-up`));
commonRouter.get(`/login`, (req, res) => res.render(`login`));

module.exports = commonRouter;
