"use strict";

const fs = require(`fs`).promises;
const http = require(`http`);
const chalk = require(`chalk`);

const DEFAULT_PORT = 3000;
const FILENAME = `mocks.json`;
const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};

const sendResponse = (res, statusCode, message) => {
  const template = `
    <!DOCTYPE html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`.trim();

  res.statusCode = HttpCode.OK;
  res.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`,
  });

  res.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundMsg = `Page Not Found`;
  switch (req.url) {
    case `/`:
      try {
        const mocks = await fs.readFile(FILENAME);
        const mocksParsed = JSON.parse(mocks);
        const message = mocksParsed.map((item) => `<li>${item.title}</li>`).join(``);
        sendResponse(res, HttpCode.OK, `<ul>${message}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundMsg);
      }
      break;

    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundMsg);
      break;
  }
};


module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number(customPort) || DEFAULT_PORT;

    http.createServer(onClientConnect).listen(port).on(`listening`, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  }
};


