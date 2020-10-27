'use strict';
const {Router} = require(`express`);
const {HttpCodes} = require(`../../../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {search = ``} = req.query;

    if (!search) {
      return res.status(HttpCodes.BAD_REQUEST).send([]);
    }
    const result = service.findAll(search);
    return res.status(HttpCodes.OK).json(result);
  });
};
