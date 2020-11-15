'use strict';

const {Router} = require(`express`);
const {concat} = require(`ramda`);

const {getAPI} = require(`../api`);
const {getLogger} = require(`../../logger`);

const logger = getLogger();
const myRouter = new Router();
const api = getAPI();

myRouter.get(`/`, async (req, res) => {
  let offers = [];
  offers = await api.getOffers();
  return res.render(`./tickets/my-tickets`, {offers});

});
myRouter.get(`/comments`, async (req, res) => {
  let offers = [];
  let comments = [];
  const query = {size: 3};

  try {
    offers = await api.getOffers(query);
    offers.map((item) => {
      comments = concat(comments, item.comments);
    });
    return res.render(`comments`, {offers});
  } catch (err) {
    logger.error(`error`, err);
    return res.render(`comments`, {comments});
  }
});

module.exports = myRouter;
