'use strict';
const FILE_TITLE_PATH = `./src/data/titles.txt`;
const FILE_SENTENCES_PATH = `./src/data/sentences.txt`;
const FILE_CATEGORIES_PATH = `./src/data/categories.txt`;
const FILE_COMMENTS_PATH = `./src/data/comments.txt`;
const FILENAME_MOCKS = `mocks.json`;
const API_PREFIX = `/api`;

const HttpCodes = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};

const MAX_ID_LENGTH = 6;

module.exports = {
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLE_PATH,
  FILENAME_MOCKS,
  API_PREFIX,
  MAX_ID_LENGTH,
  HttpCodes
};
