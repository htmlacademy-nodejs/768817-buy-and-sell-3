'use strict';
const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);
const {nanoid} = require(`nanoid`);

const {getLogger} = require('../../logger');

const logger = getLogger();
const UPLOAD_DIR = `../upload/img/`;
const uploadDirAbsolute = path.resolve(__dirname, UPLOAD_DIR);
const {getAPI} = require(`../api`);
const api = getAPI();

const offersRouter = new Router();
const storage = multer.diskStorage({
  destination: uploadDirAbsolute,
  filename: (req, file, cb) => {
    const uniqueName = nanoid(10);
    const extension = file.originalname.split(`.`).pop();
    cb(null, `${uniqueName}.${extension}`);
  }
});
const upload = multer({storage});

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, (req, res) => res.render(`./tickets/new-ticket`));
offersRouter.post(`/add`, upload.single(`avatar`), async (req, res) => {
  const {body, file} = req;
  const offer = {
    picture: file.filename,
    sum: body.price,
    type: body.action,
    description: body.comment,
    title: body[`ticket-name`],
    category: body.category
  };
  try {
    await api.createOffer(offer);
    return res.redirect(`/offers/my`);
  } catch (err) {
    logger.error(`Error occured`, err);
    return res.redirect(`back`);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  let offer = {};
  const offerId = req.params.id;
  try {
    offer = await api.getOffer(offerId);
    return res.render(`./tickets/ticket-edit`, {offer});
  } catch (err) {
    logger.error(`Error:`, err);
    return res.render(`./tickets/ticket-edit`, {offer});
  }
});
offersRouter.get(`/:id`, (req, res) => res.render(`./tickets/ticket`));

module.exports = offersRouter;
