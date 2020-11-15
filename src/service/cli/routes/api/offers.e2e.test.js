'use strict';

const request = require(`supertest`);
const express = require(`express`);

const {HttpCodes} = require(`../../../../constants`);
const DataService = require(`../../../data-service/offer`);
const CommentService = require(`../../../data-service/comment`);

const offer = require(`./offer`);
let mockData = [
  {
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
  },
  {
    "id": `AqCmT7`,
    "category": [
      `Книги`
    ],
    "description": `Пользовались бережно и только по большим праздникам. Таких предложений больше нет! Это настоящая находка для коллекционера! Бонусом отдам все аксессуары.`,
    "picture": `item12.jpg`,
    "title": `Продам книги Стивена Кинга`,
    "type": `offer`,
    "sum": 42106,
    "comments": [
      {
        "id": `S1wHL_`,
        "text": `Неплохо но дорого А где блок питания?  Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца. Оплата наличными или перевод на карту? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `r2b3mC`,
        "text": `А где блок питания?  А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `9mOiZl`,
    "category": [
      `Посуда`
    ],
    "description": `Это настоящая находка для коллекционера! Бонусом отдам все аксессуары. При покупке с меня бесплатная доставка в черте города. Даю недельную гарантию.`,
    "picture": `item09.jpg`,
    "title": `Продам книги Стивена Кинга`,
    "type": `offer`,
    "sum": 94256,
    "comments": [
      {
        "id": `3Kv1by`,
        "text": `Оплата наличными или перевод на карту? Совсем немного... С чем связана продажа? Почему так дешёво? А где блок питания?  Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. Продаю в связи с переездом. Отрываю от сердца.`
      },
      {
        "id": `VwpAn_`,
        "text": `Совсем немного... Вы что?! В магазине дешевле. А где блок питания?  Почему в таком ужасном состоянии? Оплата наличными или перевод на карту? Неплохо но дорого С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `tCVjdD`,
        "text": ``
      }
    ]
  },
  {
    "id": `2-Bppk`,
    "category": [
      `Разное`
    ],
    "description": `Если товар не понравится — верну всё до последней копейки. Это настоящая находка для коллекционера! Бонусом отдам все аксессуары. Продаю с болью в сердце...`,
    "picture": `item08.jpg`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "type": `offer`,
    "sum": 37457,
    "comments": [
      {
        "id": `gFlC0j`,
        "text": `А где блок питания?  Почему в таком ужасном состоянии? Вы что?! В магазине дешевле. Неплохо но дорого Совсем немного... Продаю в связи с переездом. Отрываю от сердца. А сколько игр в комплекте?`
      },
      {
        "id": `WdG6tk`,
        "text": `Продаю в связи с переездом. Отрываю от сердца. А где блок питания?  Почему в таком ужасном состоянии? А сколько игр в комплекте? С чем связана продажа? Почему так дешёво?`
      },
      {
        "id": `rky8yU`,
        "text": `Оплата наличными или перевод на карту? Совсем немного... Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? Вы что?! В магазине дешевле. А где блок питания? `
      }
    ]
  },
  {
    "id": `Ezddd-`,
    "category": [
      `Посуда`
    ],
    "description": `Даю недельную гарантию. Если найдёте дешевле — сброшу цену. Пользовались бережно и только по большим праздникам. Таких предложений больше нет!`,
    "picture": `item09.jpg`,
    "title": `Куплю породистого кота`,
    "type": `offer`,
    "sum": 37273,
    "comments": [
      {
        "id": `-qJfWZ`,
        "text": ``
      },
      {
        "id": `nS09E4`,
        "text": `Неплохо но дорого С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии? А сколько игр в комплекте? А где блок питания? `
      }
    ]
  },
  {
    "id": `VnzrPc`,
    "category": [
      `Игры`
    ],
    "description": `Товар в отличном состоянии. Это настоящая находка для коллекционера! Если найдёте дешевле — сброшу цену. Продаю с болью в сердце...`,
    "picture": `item11.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `offer`,
    "sum": 48106,
    "comments": [
      {
        "id": `yM0r1I`,
        "text": ``
      },
      {
        "id": `n596RA`,
        "text": `А сколько игр в комплекте?`
      }
    ]
  },
  {
    "id": `cFFVNx`,
    "category": [
      `Разное`
    ],
    "description": `Если найдёте дешевле — сброшу цену. Товар в отличном состоянии. Бонусом отдам все аксессуары. Даю недельную гарантию.`,
    "picture": `item10.jpg`,
    "title": `Куплю антиквариат`,
    "type": `sale`,
    "sum": 70913,
    "comments": [
      {
        "id": `hbbII3`,
        "text": `С чем связана продажа? Почему так дешёво? Совсем немного... Почему в таком ужасном состоянии? Неплохо но дорого А где блок питания? `
      },
      {
        "id": `77Mkr4`,
        "text": `Вы что?! В магазине дешевле. А сколько игр в комплекте? Продаю в связи с переездом. Отрываю от сердца. С чем связана продажа? Почему так дешёво? Почему в таком ужасном состоянии?`
      },
      {
        "id": `0SlMMh`,
        "text": `Совсем немного...`
      }
    ]
  },
  {
    "id": `CP0eY3`,
    "category": [
      `Животные`
    ],
    "description": `Продаю с болью в сердце... Если найдёте дешевле — сброшу цену. Таких предложений больше нет! Это настоящая находка для коллекционера!`,
    "picture": `item07.jpg`,
    "title": `Продам новую приставку Sony Playstation 5`,
    "type": `offer`,
    "sum": 31159,
    "comments": [
      {
        "id": `2drCTq`,
        "text": `А сколько игр в комплекте? Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? Оплата наличными или перевод на карту? А где блок питания? `
      },
      {
        "id": `Rix_L5`,
        "text": `С чем связана продажа? Почему так дешёво? А сколько игр в комплекте? Вы что?! В магазине дешевле. Совсем немного... Неплохо но дорого А где блок питания?  Оплата наличными или перевод на карту?`
      }
    ]
  },
  {
    "id": `8GjrPg`,
    "category": [
      `Животные`
    ],
    "description": `Товар в отличном состоянии. Бонусом отдам все аксессуары. Продаю с болью в сердце... Если найдёте дешевле — сброшу цену.`,
    "picture": `item10.jpg`,
    "title": `Продам отличную подборку фильмов на VHS`,
    "type": `offer`,
    "sum": 41702,
    "comments": [
      {
        "id": `ifMXV4`,
        "text": `А где блок питания?  Оплата наличными или перевод на карту?`
      },
      {
        "id": `F-uqkE`,
        "text": `А сколько игр в комплекте? А где блок питания?  Вы что?! В магазине дешевле. Почему в таком ужасном состоянии? Неплохо но дорого Оплата наличными или перевод на карту?`
      },
      {
        "id": `5UM0wP`,
        "text": ``
      }
    ]
  }
];

const createAPI = () => {
  const app = express();
  const cloneData = JSON.parse(JSON.stringify(mockData));
  app.use(express.json());
  offer(app, new DataService(cloneData), new CommentService());
  return app;
};

describe(`API returns a list of all offers`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCodes.OK));
  test(`Returns a list of 10 offers`, () => expect(response.body.length).toBe(10));
  test(`First offer's id equals "J7vfCs"`, () => expect(response.body[0].id).toBe(`J7vfCs`));
});

describe(`API returns an offer with given id`, () => {
  const app = createAPI();

  let response;

  beforeAll(async () => {
    response = await request(app)
      .get(`/offers/J7vfCs`);
  });

  test(`Status code 200`, () => expect(response.statusCode).toBe(HttpCodes.OK));

  test(`Offer's title is "Продам отличную подборку фильмов на VHS"`, () => expect(response.body.title).toBe(`Продам отличную подборку фильмов на VHS`));

});

describe(`API creates an offer if data is valid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();
  let response;

  beforeAll(async () => {
    response = await request(app)
      .post(`/offers`)
      .send(newOffer);
  });


  test(`Status code 201`, () => expect(response.statusCode).toBe(HttpCodes.CREATED));


  test(`Returns offer created`, () => expect(response.body).toEqual(expect.objectContaining(newOffer)));

  test(`Offers count is changed`, () => request(app)
    .get(`/offers`)
    .expect((res) => expect(res.body.length).toBe(11))
  );

});


describe(`API refuses to create an offer if data is invalid`, () => {

  const newOffer = {
    category: `Котики`,
    title: `Дам погладить котика`,
    description: `Дам погладить котика. Дорого. Не гербалайф`,
    picture: `cat.jpg`,
    type: `OFFER`,
    sum: 100500
  };
  const app = createAPI();

  test(`Without any required property response code is 400`, async () => {
    for (const key of Object.keys(newOffer)) {
      let badOffer = {...newOffer};
      delete badOffer[key];
      await request(app)
        .post(`/offers`)
        .send(badOffer)
        .expect(HttpCodes.BAD_REQUEST);
    }
  });

});
