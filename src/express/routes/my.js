'use strict';

const {Router} = require(`express`);
const request = require(`request-promise-native`);
const {concat, reduce} = require(`ramda`);

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
  let comments = [];
  try {
    const options = {uri: `${BASE_URL_SERVICE + offersList}`, qs: {size: 3}, json: true};
    const offers = await request(options);
    comments = reduce(concat, [], offers.comments);
    console.log(`comments`, comments);
    return res.render(`comments`, {comments});
  } catch (err) {
    console.error(`error`, err);
    return res.render(`comments`, {comments});
  }
});

module.exports = myRouter;
