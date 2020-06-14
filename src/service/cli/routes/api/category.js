'use strict';
const {Router} = require(`express`);
const {HttpCodes} = require(`../../../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/category`, route);

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    res.status(HttpCodes.OK).json(categories);
  });
};
