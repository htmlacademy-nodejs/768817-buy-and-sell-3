'use strict';
const axios = require(`axios`);


class API {
  constructor(baseURL, timeout) {
    this._axios = axios.create({baseURL, timeout});
  }

  async _load(url, options) {
    const response = await this._axios.request({url, ...options});
    return response.data;
  }

  getOffers(query = {}) {
    return this._load(`/offers`, {params: query});
  }

  getOffer(id) {
    return this._load(`/offers/${id}`);
  }

  search(query) {
    console.log(`query`, query);
    return this._load(`/search`, {params: query});
  }

  async getCategories() {
    return this._load(`/category`);
  }

  async createOffer(data) {
    return this._load(`/offers`, {
      method: `POST`,
      data
    });
  }
}

const TIMEOUT = 10000;

const port = process.env.API_PORT || 3000;
const defaultUrl = `http://localhost:${port}/api/`;

const defaultAPI = new API(defaultUrl, TIMEOUT);

module.exports = {
  API,
  getAPI: () => defaultAPI
};
