'use strict';
const {includes} = require(`ramda`);
class SearchService {
  constructor(offers) {
    this._offers = offers;
  }

  findAll(searchText) {
    let results = [];
    this._offers.map((item) => includes(searchText, item.title) && results.push(item));
    console.log(`results`, results);

    return results;
  }
}

module.exports = SearchService;
