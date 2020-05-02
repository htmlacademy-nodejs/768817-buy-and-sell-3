"use strict";

const express = require(`express`);
const offersRouter = require(`./routes/offers`);
const {readContent} = require(`../../utils`);
const {FILE_CATEGORIES_PATH} = require(`../../constants`);
const {getMocks} = require(`../../utils`);
const {keys, includes} = require(`ramda`);

const DEFAULT_PORT = 3000;
const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const app = express();

app.use(express.json());
app.use(`/offers`, offersRouter);

app.get(`/categories`, async (req, res) => {
  try {
    const categories = await readContent(FILE_CATEGORIES_PATH);
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(400).json([]);
  }
});

app.get(`/search`, async (req, res) => {
  try {
    const mocks = await getMocks();
    const queryParams = req.query;
    const queryKeys = keys(queryParams);

    let filteredMocks = mocks;
    for (let i = 0; i < queryKeys.length; i++) {
      let a = filteredMocks;
      let currentParam = queryKeys[i];
      filteredMocks = a.filter((item) => includes(queryParams[currentParam], item[currentParam]));
    }
    return res.status(200).json(filteredMocks);
  } catch (err) {
    return res.status(400).json(`try again`);
  }
});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    app.listen(port);
  }
};

app.use((req, res) => res
  .status(HttpCode.NOT_FOUND)
  .send(`Not found`));


