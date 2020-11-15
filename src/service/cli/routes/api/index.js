'use strict';
const {Router} = require(`express`);

const category = require(`./category`);
const offer = require(`./offer`);
const search = require(`./search`);
const {getOffers} = require(`../../../lib/get-offers`);
const {
  CategoryService,
  OfferService,
  CommentService,
  SearchService
} = require(`../../../data-service`);

const app = new Router();

(async () => {
  const offers = await getOffers();

  category(app, new CategoryService(offers));
  offer(app, new OfferService(offers), new CommentService());
  search(app, new SearchService(offers));
}
)();

module.exports = app;

