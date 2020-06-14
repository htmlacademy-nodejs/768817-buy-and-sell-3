'use strict';
const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class OfferCategory {
  constructor(offers) {
    this._offers = offers;
  }

  findAll() {
    return this._offers;
  }

  findOne(id) {
    return this._offers.find((item) => item.id === id);
  }

  findSeveral(count) {
    return this._offers.slice(0, Number(count));
  }

  create(offer) {
    const newOffer = Object.assign({id: nanoid(MAX_ID_LENGTH), comments: []}, offer);
    this._offers.push(newOffer);

    return newOffer;
  }

  delete(id) {
    const offer = this._offers.find((item) => item.id === id);

    if (!offer) {
      return null;
    }

    this._offers.filter((item) => item.id !== id);
    return offer;
  }

  update(id, offer) {
    const oldOffer = this._offers.find((item) => item.id === id);

    return Object.assign(oldOffer, offer);
  }
}

module.exports = OfferCategory;
