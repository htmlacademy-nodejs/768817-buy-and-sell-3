'use strict';
const {HttpCodes} = require(`../../constants`);

const requirableOfferKeys = [`category`, `description`, `title`, `type`, `sum`];

module.exports = (req, res, next) => {
  const newOffer = req.body;
  const keys = Object.keys(newOffer);
  const keysExists = requirableOfferKeys.every((key) => keys.includes(key));

  if (!keysExists) {
    return res.status(HttpCodes.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
