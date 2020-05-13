'use strict';
const {Router} = require(`express`);
const {find, propEq, any, isNil, isEmpty, includes} = require(`ramda`);
const {nanoid} = require(`nanoid`);
const {getData} = require(`../../../utils`);
const {HttpCodes} = require(`../../../constants`);
const ID_LENGTH = 6;

const offersRouter = new Router();

const getElementByPropName = (propKey, propValue, arr) => {
  return find(propEq(propKey, propValue))(arr);
};

offersRouter.get(`/`, async (req, res) => {
  try {
    const mocks = await getData();
    res.status(HttpCodes.OK).json(mocks);
  } catch (err) {
    res.json([]);
  }
});

offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const mocks = await getData();
    const offerId = req.params.offerId;
    const offer = find(propEq(`id`, offerId))(mocks) || {};
    res.status(HttpCodes.OK).json(offer);
  } catch (err) {
    res.status(HttpCodes.BAD_REQUEST).json({});
  }
});

offersRouter.post(`/`, (req, res) => {
  const {category, description, title, type, sum} = req.body;
  if (any(isNil)([category, description, title, type, sum])) {
    return res.status(HttpCodes.BAD_REQUEST).send({ok: false});
  }

  return res.status(HttpCodes.OK).send({ok: true});
});

offersRouter.put(`/:offerId`, (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(HttpCodes.BAD_REQUEST).send({ok: false});
  }

  return res.status(HttpCodes.OK).send({ok: true});
});

offersRouter.delete(`/:offerId`, (req, res) => {
  return res.status(HttpCodes.OK).send({ok: true});
});

offersRouter.get(`/:offerId/comments`, async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const mocks = await getData();
    const offer = getElementByPropName(`id`, offerId, mocks);
    const comments = offer.comments || [];

    return res.status(HttpCodes.OK).json(comments);
  } catch (err) {
    res.status(HttpCodes.BAD_REQUEST);
    return res.json([]);
  }
});

offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  try {
    const mocks = await getData();
    const {offerId, commentId} = req.params;
    const offer = getElementByPropName(`id`, offerId, mocks);
    const commentIds = offer.comments.map((item) => item.id);
    if (!includes(commentId, commentIds)) {
      return res.status(HttpCodes.BAD_REQUEST).send(`your commentId does not match to any of commentIds of this offer`);
    }
    const editedOffer = offer.comments.filter((item) => item.id !== commentId);

    return res.status(HttpCodes.OK).json(editedOffer);
  } catch (err) {
    return res.status(HttpCodes.BAD_REQUEST).json({});
  }
});

offersRouter.post(`/:offerId/comments`, async (req, res) => {
  try {
    const mocks = await getData();
    const {offerId} = req.params;
    const offer = getElementByPropName(`id`, offerId, mocks);
    const newComment = {
      id: nanoid(ID_LENGTH),
      text: req.body.text
    };
    const editedOffer = offer.comments.concat(newComment);

    return res.status(HttpCodes.OK).json(editedOffer);
  } catch (err) {
    return res.status(HttpCodes.BAD_REQUEST).json([]);
  }
});

module.exports = offersRouter;
