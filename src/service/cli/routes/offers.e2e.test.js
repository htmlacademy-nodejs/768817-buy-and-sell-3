'use strict';
const request = require(`supertest`);
const {app} = require(`../server`);
const {HttpCodes} = require(`../../../constants`);
const {getData} = require(`../../../utils`);
const {run} = require(`../generate`);

let mocks = [];
describe(`offers api end-points`, () => {
  beforeAll(async (done) => {
    const preventExit = true;
    await run([1, preventExit]);
    mocks = await getData();
    done();
  });

  test(`GET /api/offers should return: 200 and Array of Objects`, async (done) => {
    const res = await request(app).get(`/api/offers/`);
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toEqual(expect.arrayContaining([]));
    done();
  });

  test(`GET /api/offers/:id should return: 200 and Offer with given id`, async (done) => {
    const mockId = mocks[0].id;
    const res = await request(app).get(`/api/offers/${mockId}`);
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toHaveProperty(`id`);
    done();
  });

  test(`GET /api/offers/:id should return: 200 and empty Object`, async (done) => {
    const res = await request(app).get(`/api/offers/33`);
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toEqual({});
    done();
  });

  test(`POST api/offers/ should return: 200`, async (done) => {
    const res = await request(app)
      .post(`/api/offers`)
      .send({category: `aaa`, description: `bbb`, title: `ccc`, type: `ddd`, sum: 123});
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toEqual({ok: true});

    done();
  });

  test(`PUT api/offers/:id should return: 200`, async (done) => {
    const mockId = mocks[0].id;
    const res = await request(app)
      .put(`/api/offers/${mockId}`)
      .send({category: `aaa`, description: `bbb`, title: `ccc`, type: `ddd`, sum: 123});
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toEqual({ok: true});

    done();
  });

  test(`PUT api/offers/:id should return: 404`, async (done) => {
    const res = await request(app)
      .put(`/api/offers/`)
      .send({category: `aaa`, description: `bbb`, title: `ccc`, type: `ddd`, sum: 123});
    expect(res.statusCode).toBe(HttpCodes.NOT_FOUND);

    done();
  });

  test(`DELETE api/offers/:offerId should return: 200`, async (done) => {
    const mockId = mocks[0].id;
    const res = await request(app).delete(`/api/offers/${mockId}`);
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toEqual({ok: true});

    done();
  });

  test(`GET /api/offers/:offerId/comments should return: 200 and Array`, async (done) => {
    const mockId = mocks[0].id;
    const res = await request(app).get(`/api/offers/${mockId}/comments`);
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toEqual(expect.arrayContaining([]));
    done();
  });

  test(`POST /api/offers/:offerId/comments should return: 200 and Object`, async (done) => {
    const mockId = mocks[0].id;
    const res = await request(app).post(`/api/offers/${mockId}/comments`);
    console.log(res);
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toEqual(expect.objectContaining([]));
    done();
  });
});
