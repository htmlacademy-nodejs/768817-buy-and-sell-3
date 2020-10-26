'use strict';

const {Router} = require(`express`);
const multer = require(`multer`);
const path = require(`path`);

const {BASE_URL_SERVICE, offerItem, offersList} = require(`../../endPoints`);

const offersRouter = new Router();
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, `./avatars`);
  },
  filename(req, file, cb) {
    cb(null, file.fieldname + `-` + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({storage});

offersRouter.get(`/category/:id`, (req, res) => res.render(`category`));
offersRouter.get(`/add`, (req, res) => res.render(`./tickets/new-ticket`));
offersRouter.post(`/add`, upload.any(), async (req, res) => {
  const body = req.body;
  const options = {method: `POST`, uri: `${BASE_URL_SERVICE + offersList}`, body, json: true};
  try {
    await request(options);
    return res.redirect(`/offers/my`);
  } catch (err) {
    console.error(`Error occured`, err);
    return res.redirect(`back`);
  }
});

offersRouter.get(`/edit/:id`, async (req, res) => {
  let offer = {};
  const offerId = req.params.id;
  try {
    offer = await request(`${BASE_URL_SERVICE + offerItem(offerId)}`, {json: true});
    return res.render(`./tickets/ticket-edit`, {offer});
  } catch (err) {
    console.error(`Error:`, err);
    return res.render(`./tickets/ticket-edit`, {offer});
  }
});
offersRouter.get(`/:id`, (req, res) => res.render(`./tickets/ticket`));

module.exports = offersRouter;
