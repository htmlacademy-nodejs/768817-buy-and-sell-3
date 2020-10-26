'use strict';

const express = require(`express`);
const request = require(`supertest`);

const search = require(`./search`);
const DataService = require(`../../../data-service/search`);
const {HttpCodes} = require(`../../../constants`);

const mockData = [{
  "id": `J7vfCs`,
  "category": [
    `Животные`
  ],
  "description": `Продаю с болью в сердце... Если товар не понравится — верну всё до последней копейки. Даю недельную гарантию. Пользовались бережно и только по большим праздникам.`,
  "picture": `item03.jpg`,
  "title": `Продам отличную подборку фильмов на VHS`,
  "type": `offer`,
  "sum": 51739,
  "comments": [
    {
      "id": `4a9LVw`,
      "text": `А сколько игр в комплекте? Вы что?! В магазине дешевле. Неплохо но дорого`
    },
    {
      "id": `dqObiK`,
      "text": ``
    }
  ]
},
{
  "id": `SlvocX`,
  "category": [
    `Игры`
  ],
  "description": `Даю недельную гарантию. Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Товар в отличном состоянии.`,
  "picture": `item16.jpg`,
  "title": `Куплю антиквариат`,
  "type": `offer`,
  "sum": 70296,
  "comments": [
    {
      "id": `kDV49v`,
      "text": `А где блок питания?  Неплохо но дорого А сколько игр в комплекте? Оплата наличными или перевод на карту? Совсем немного...`
    },
    {
      "id": `f2tOwK`,
      "text": `Вы что?! В магазине дешевле. С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?`
    },
    {
      "id": `yuIRoi`,
      "text": `А где блок питания?  Оплата наличными или перевод на карту? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво?`
    }
  ]
}];

const app = express();
app.use(express.json());
search(app, new DataService(mockData));

describe(`API returns offer based on search query`, () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get(`/search`).query({query: `Продам отличную подборку фильмов на VHS`});
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCodes.OK));
  test(`1 offer found`, () => expect(response.body.length).toBe(1));
  test(`Offer has correct id`, () => expect(response.body[0].id).toBe(`J7vfCs`));

});

test(`API returns code 404 if nothing is found`,
    () => request(app)
      .get(`/search`)
      .query({query: `Продам bmw`})
      .expect(HttpCodes.NOT_FOUND)
);

test(`API returns 400 when query string is absent`,
    () => request(app)
      .get(`/search`)
      .expect(HttpCodes.BAD_REQUEST)
);
