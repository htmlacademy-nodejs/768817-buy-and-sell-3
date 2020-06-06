'use strict';

class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(query) {
    return this._offers.filter((item) => item.title.includes(query));
  }
}

module.exports = SearchService;


