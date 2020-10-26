'use strict';

const {Router} = require(`express`);

const {concat} = require(`ramda`);

const {BASE_URL_SERVICE, offersList} = require(`../../endPoints`);

const myRouter = new Router();

myRouter.get(`/`, async (req, res) => {
  let offers = [];
  try {
    offers = await request(`${BASE_URL_SERVICE + offersList}`, {json: true});
    return res.render(`./tickets/my-tickets`, {offers});
  } catch (err) {
    console.error(`error:`, err);
    return res.render(`./tickets/my-tickets`, {offers});
  }
});
myRouter.get(`/comments`, async (req, res) => {
  let offers = [];
  let comments = [];
  try {
    const options = {uri: `${BASE_URL_SERVICE + offersList}`, qs: {size: 3}, json: true};
    offers = await request(options);
    offers.map((item) => {
      comments = concat(comments, item.comments);
    });
    return res.render(`comments`, {offers});
  } catch (err) {
    console.error(`error`, err);
    return res.render(`comments`, {comments});
  }
});

module.exports = myRouter;
