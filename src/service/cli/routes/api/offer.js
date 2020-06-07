'use strict';
const {Router} = require(`express`);
const {getLogger} = require(`../../../../logger`);
const {HttpCodes} = require(`../../../../constants`);
const offerValidator = require(`../../../middlewares/offer-validator`);
const offerExist = require(`../../../middlewares/offer-exist`);
const commentValidator = require(`../../../middlewares/comment-validator`);

const logger = getLogger();
const route = new Router();

module.exports = (app, offerService, commentService) => {
  app.use(`/offers`, route);

  route.get(`/`, (req, res) => {
    logger.info(`End request with status code ${res.statusCode}`);
    const {size = null} = req.query;
    const offers = size ? offerService.findSeveral(size) : offerService.findAll();

    res.status(HttpCodes.OK).json(offers);
  });

  route.get(`/:offerId`, (req, res) => {
    logger.info(`End request with status code ${res.statusCode}`);
    const {offerId} = req.params;
    const offer = offerService.findOne(offerId);

    if (!offer) {
      return res.status(HttpCodes.NOT_FOUND).send(`Not found with ${offerId}`);
    }
    return res.status(HttpCodes.OK).json(offer);
  });

  route.post(`/`, offerValidator, (req, res) => {
    logger.info(`End request with status code ${res.statusCode}`);
    const offer = offerService.create(req.body);

    return res.status(HttpCodes.CREATED).json(offer);
  });

  route.put(`/:offerId`, offerValidator, (req, res) => {
    logger.info(`End request with status code ${res.statusCode}`);
    const {offerId} = req.params;
    const offer = offerService.update(offerId, req.body);

    return res.status(HttpCodes.OK).json(offer);
  });

  route.delete(`/:offerId`, offerValidator, (req, res) => {
    logger.info(`End request with status code ${res.statusCode}`);
    const {offerId} = req.params;
    const offer = offerService.update(offerId, req.body);

    return res.status(HttpCodes.OK).json(offer);
  });

  route.get(`/:offerId/comments`, offerExist(offerService), (req, res) => {
    logger.info(`End request with status code ${res.statusCode}`);
    const {offer} = res.locals;
    const comments = commentService.findAll(offer);

    return res.status(HttpCodes.OK).json(comments);
  });

  route.delete(`/:offerId/comments/:commentId`, offerExist(offerService), (req, res) => {
    logger.info(`End request with status code ${res.statusCode}`);
    const {offer} = res.locals;
    const {commentId} = req.params;
    const deletedComment = commentService.delete(offer, commentId);

    if (!deletedComment) {
      return res.status(HttpCodes.NOT_FOUND).send(`Comment with ${commentId} not found`);
    }

    return res.status(HttpCodes.ok).send(deletedComment);
  });

  route.post(`/:offerId/comments`, [offerExist(offerService), commentValidator], (req, res) => {
    logger.info(`End request with status code ${res.statusCode}`);
    const {offer} = res.locals;
    const comment = commentService.create(offer, req.body);

    return res.status(HttpCodes.CREATED).json(comment);
  });
};
