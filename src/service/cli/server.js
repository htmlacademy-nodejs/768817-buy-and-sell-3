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

// app.get(`/api/categories`, async (req, res) => {
//   logger.info(`End request with status code ${res.statusCode}`);
//   try {
//     const categories = await readContent(FILE_CATEGORIES_PATH);
//     logger.info(`End request with status code ${res.statusCode}`);
//     return res.status(HttpCodes.OK).json(categories);
//   } catch (err) {
//     return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json([]);
//   }
// });

// app.get(`/api/search`, async (req, res) => {
//   logger.info(`End request with status code ${res.statusCode}`);
//   try {
//     const mocks = await getData(FILENAME_MOCKS);
//     const queryParams = req.query;
//     const queryKeys = keys(queryParams);
//     if (!queryParams) {
//       return res.status(HttpCodes.BAD_REQUEST);
//     }

//     let filteredMocks = mocks;
//     for (let i = 0; i < queryKeys.length; i++) {
//       let a = filteredMocks;
//       let currentParam = queryKeys[i];
//       filteredMocks = a.filter((item) => includes(queryParams[currentParam], item[currentParam]));
//     }
//     return res.status(HttpCodes.OK).json(filteredMocks);
//   } catch (err) {
//     return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({});
//   }
// });

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


