'use strict';

const express = require(`express`);
const {keys, includes} = require(`ramda`);
const logger = require(`pino`)({
  name: `pino-and-express`,
  level: process.env.LOG_LEVEL || `info`,
});

logger.info(`Hello, world!`);
logger.warn(`Test warning`);
logger.error(`Add error`);

const offersRouter = require(`./routes/offers`);
const {readContent, getData} = require(`../../utils`);
const {FILE_CATEGORIES_PATH, HttpCodes, FILENAME_MOCKS} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();

app.use((req, res, next) => {
  logger.debug(`Start request to url ${req.url}`);
  next();
});

app.use(express.json());
app.use(`/api/offers`, offersRouter);

app.get(`/api/categories`, async (req, res) => {
  try {
    const categories = await readContent(FILE_CATEGORIES_PATH);
    logger.info(`End request with status code ${res.statusCode}`);
    return res.status(HttpCodes.OK).json(categories);
  } catch (err) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json([]);
  }
});

app.get(`/api/search`, async (req, res) => {
  try {
    const mocks = await getData(FILENAME_MOCKS);
    const queryParams = req.query;
    const queryKeys = keys(queryParams);
    if (!queryParams) {
      return res.status(HttpCodes.BAD_REQUEST);
    }

    let filteredMocks = mocks;
    for (let i = 0; i < queryKeys.length; i++) {
      let a = filteredMocks;
      let currentParam = queryKeys[i];
      filteredMocks = a.filter((item) => includes(queryParams[currentParam], item[currentParam]));
    }
    return res.status(HttpCodes.OK).json(filteredMocks);
  } catch (err) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({});
  }
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    app.listen(port, () => {
      logger.info(`Start server on port ${port}`);
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


