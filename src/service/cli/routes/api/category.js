'use strict';
const {Router} = require(`express`);
const {HttpCodes} = require(`../../../../constants`);

module.exports = (app, service) => {
  const route = new Router();

  app.use(`/category`, route);

  route.get(`/`, (req, res) => {
    const categories = service.findAll();
    return res.status(HttpCodes.OK).json(categories);
  });
};
