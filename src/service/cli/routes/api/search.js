'use strict';
const {Router} = require(`express`);
const {HttpCodes} = require(`../../../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/search`, (req, res) => {
    const {query = ``} = req.query;

    if (!query) {
      return res.status(HttpCodes.BAD_REQUEST).send([]);
    }

    const result = service.findAll(query);
    const status = result.length > 0 ? HttpCodes.OK : HttpCodes.NOT_FOUND;

    return res.status(status).json(result);
  });
};
