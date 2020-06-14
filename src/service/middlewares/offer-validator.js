'use strict';
const {HttpCodes} = require(`../../constants`);

const requiredKeys = [`category`, `description`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = requiredKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCodes.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
