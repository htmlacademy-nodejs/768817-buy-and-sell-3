'use strict';

const express = require(`express`);
const commonRoutes = require(`./routes/common`);
const myRoutes = require(`./routes/my`);
const offersRoutes = require(`./routes/offers`);

const EXPRESS_DEFAULT_PORT = 8080;

const app = express();

app.use(`/my`, myRoutes);
app.use(`/offers`, offersRoutes);
app.use(``, commonRoutes);

app.listen(EXPRESS_DEFAULT_PORT);

