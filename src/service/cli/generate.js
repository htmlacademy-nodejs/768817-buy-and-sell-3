'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {nanoid} = require(`nanoid`);
const {getRandomInt, shuffle, readContent} = require(`../../utils`);
const {
  FILE_CATEGORIES_PATH,
  FILE_COMMENTS_PATH,
  FILE_SENTENCES_PATH,
  FILE_TITLE_PATH
} = require(`../../constants`);

const ID_LENGTH = 6;
const DEFAULT_AMOUNT = 1;
const FILE_NAME = `mocks.json`;
const MAX_OFFERS_COUNT = 1000;

const OfferType = {
  offer: `offer`,
  sale: `sale`,
};

const SumRestrict = {
  min: 1000,
  max: 100000,
};

const PictureRestrict = {
  min: 1,
  max: 16,
};

const getPictureFileName = (number) => number >= 10 ? `item${number}.jpg` : `item0${number}.jpg`;
const getComment = (comments) => {
  const count = getRandomInt(0, comments.length - 1);
  return shuffle(comments).slice(1, count).join(` `);
};

const generateOffers = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(ID_LENGTH),
    category: [categories[getRandomInt(0, categories.length - 1)]],
    description: shuffle(sentences).slice(1, 5).join(` `),
    picture: getPictureFileName(getRandomInt(PictureRestrict.min, PictureRestrict.max)),
    title: titles[getRandomInt(0, titles.length - 1)],
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.min, SumRestrict.max),
    comments: Array(getRandomInt(0, 3)).fill({}).map(() => ({id: nanoid(ID_LENGTH), text: getComment(comments)}))
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count, preventExit] = args;
    if (count > MAX_OFFERS_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }
    const titles = await readContent(FILE_TITLE_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const countOffer = Number.parseInt(count, 10) || DEFAULT_AMOUNT;
    const content = JSON.stringify(generateOffers(countOffer, titles, categories, sentences, comments));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      if (!preventExit) {
        process.exit(0);
      }
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(1);
    }
  }
};
