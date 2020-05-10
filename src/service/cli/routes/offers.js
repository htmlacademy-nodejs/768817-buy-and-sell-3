'use strict';
const {Router} = require(`express`);
const {find, propEq, any, isNil, isEmpty, includes} = require(`ramda`);
const {nanoid} = require(`nanoid`);
const {getMocks} = require(`../../../utils`);
const ID_LENGTH = 6;

const offersRouter = new Router();

const getElementByPropName = (propKey, propValue, arr) => {
  return find(propEq(propKey, propValue))(arr);
};

offersRouter.get(`/`, async (req, res) => {
  try {
    const mocks = await getMocks();
    res.status(200).json(mocks);
  } catch (err) {
    res.json([]);
  }
});

offersRouter.get(`/:offerId`, async (req, res) => {
  try {
    const mocks = await getMocks();
    const offerId = req.params.offerId;
    const offer = find(propEq(`id`, offerId))(mocks) || {};
    res.status(200).json(offer);
  } catch (err) {
    res.status(400).json({});
  }
});

offersRouter.post(`/`, (req, res) => {
  const {category, description, title, type, sum} = req.body;
  if (any(isNil)([category, description, title, type, sum])) {
    return res.status(400).send({ok: false});
  }

  return res.status(200).send({ok: true});
});

offersRouter.put(`/:offerId`, (req, res) => {
  if (isEmpty(req.body)) {
    return res.status(400).send({ok: false});
  }

  return res.status(200).send({ok: true});
});

offersRouter.delete(`/:offerId`, (req, res) => {
  return res.status(200).send({ok: true});
});

offersRouter.get(`/:offerId/comments`, async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const mocks = await getMocks();
    const offer = getElementByPropName(`id`, offerId, mocks);
    const comments = offer.comments || [];

    return res.status(200).json(comments);
  } catch (err) {
    res.status(400);
    return res.json([]);
  }
});

offersRouter.delete(`/:offerId/comments/:commentId`, async (req, res) => {
  try {
    const mocks = await getMocks();
    const {offerId, commentId} = req.params;
    const offer = getElementByPropName(`id`, offerId, mocks);
    const commentIds = offer.comments.map((item) => item.id);
    if (!includes(commentId, commentIds)) {
      return res.status(400).send(`your commentId does not match to any of commentIds of this offer`);
    }
    const editedOffer = offer.comments.filter((item) => item.id !== commentId);

    return res.status(200).json(editedOffer);
  } catch (err) {
    return res.status(400).json({});
  }
});

offersRouter.post(`/:offerId/comments`, async (req, res) => {
  try {
    const mocks = await getMocks();
    const {offerId} = req.params;
    const offer = getElementByPropName(`id`, offerId, mocks);
    const newComment = {
      id: nanoid(ID_LENGTH),
      text: req.body.text
    };
    const editedOffer = offer.comments.concat(newComment);

    return res.status(200).json(editedOffer);
  } catch (err) {
    return res.status(400).json([]);
  }
});

module.exports = offersRouter;
