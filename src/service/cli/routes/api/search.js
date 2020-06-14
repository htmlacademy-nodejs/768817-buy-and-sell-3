'use strict';
const {Router} = require(`express`);
const {HttpCodes} = require(`../../../../constants`);

const route = new Router();

module.exports = (app, service) => {
  app.use(`/search`, route);

  route.get(`/`, (req, res) => {
    const {title = ``} = req.query;
    if (!title) {
      return res.status(HttpCodes.BAD_REQUEST).send([]);
    }

    const result = service.findAll(title);
    const status = result.length > 0 ? HttpCodes.OK : HttpCodes.NOT_FOUND;
    return res.status(status).json(result);
  });
};
