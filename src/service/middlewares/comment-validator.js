'use strict';
const {HttpCodes} = require(`../../constants`);

const requiredKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const keys = Object.keys(comment);
  const keysExists = requiredKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCodes.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
