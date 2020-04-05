'use strict';

const express = require(`express`);
const commonRoutes = require(`./routes/common`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);
const path = require(`path`);

const EXPRESS_DEFAULT_PORT = 8080;
const PUBLIC_DIR = `public`;

const app = express();

app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(``, commonRoutes);
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.join(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.listen(EXPRESS_DEFAULT_PORT);

