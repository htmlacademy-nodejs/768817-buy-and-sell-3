'use strict';

const express = require(`express`);
const path = require(`path`);

const commonRoutes = require(`./routes/common`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);
const {getLogger} = require(`../logger`);

const EXPRESS_DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();
const logger = getLogger();

app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(``, commonRoutes);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(EXPRESS_DEFAULT_PORT)
  .on(`error`, (err) => logger.error(`An error occured on EXPRESS server: ${err}`));

logger.info(`Starts EXPRESS server on localhost:${EXPRESS_DEFAULT_PORT}`);

