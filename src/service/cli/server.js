'use strict';

const express = require(`express`);

const {getLogger} = require(`../../logger`);
const {HttpCodes, API_PREFIX} = require(`../../constants`);
const routes = require(`./routes/api`);

const DEFAULT_PORT = 3000;
const logger = getLogger();

const app = express();

app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
});

app.use(express.json());
app.use(API_PREFIX, routes);


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    app.listen(port, () => {
      logger.info(`Starts SERVICE server on: localhost:${port}`);
    }).on(`error`, (err) => {
      logger.error(`Cannot start server. Error: ${err}`);
    });
  },
  app,
};

app.use((req, res) => {
  res.status(HttpCodes.NOT_FOUND).send(`Not found`);
  logger.error(`End request with error ${res.statusCode}`);
});


