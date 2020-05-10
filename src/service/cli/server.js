'use strict';

const express = require(`express`);
const {keys, includes} = require(`ramda`);

const offersRouter = require(`./routes/offers`);
const {readContent, getMocks} = require(`../../utils`);
const {FILE_CATEGORIES_PATH, HttpCodes} = require(`../../constants`);

const DEFAULT_PORT = 3000;

const app = express();

app.use(express.json());
app.use(`/api/offers`, offersRouter);

app.get(`/api/categories`, async (req, res) => {
  try {
    const categories = await readContent(FILE_CATEGORIES_PATH);
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(400).json([]);
  }
});

app.get(`/api/search`, async (req, res) => {
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

const runServer = (port) => app.listen(port);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    runServer(port);
  },
  runServer
};

app.use((req, res) => res.status(HttpCodes.NOT_FOUND).send(`Not found`));


