"use strict";

const fs = require(`fs`).promises;
const express = require(`express`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const app = express();

app.use(express.json());
app.get(`/offers`, async (req, res) => {
  try {
    const content = await fs.readFile(FILENAME);
    const mocks = JSON.parse(content);
    res.json(mocks);
  } catch (err) {
    res.json([]);
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


