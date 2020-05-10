'use strict';

const {app} = require(`../server`);
const request = require(`supertest`);


describe(`offers api end-points`, () => {
  test(`should have code status 200 and send array, when calling GET /api/offers`, async (done) => {
    const res = await request(app).get(`/api/offers/`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
    done();
  });

  test(`should send status 200 and offer with id`, async (done) => {
    const res = await request(app).get(`/api/offers/FKqI2s`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty(`id`);

    done();
  });

  test(`should send status 200 and {} if there is no offer with given id`, async (done) => {
    const res = await request(app).get(`/api/offers/33`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({});

    done();
  });

  test(`should send status 200, on POST api/offers/`, async (done) => {
    const res = await request(app)
      .post(`/api/offers`)
      .send({category: `aaa`, description: `bbb`, title: `ccc`, type: `ddd`, sum: 123});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ok: true});

    done();
  });

  test(`should send status 200, on PUT api/offers/:offerId`, async (done) => {
    const res = await request(app)
      .put(`/api/offers/FKqI2s`)
      .send({category: `aaa`, description: `bbb`, title: `ccc`, type: `ddd`, sum: 123});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ok: true});

    done();
  });

  test(`should send status 404 if given no id, on PUT api/offers/:offerId`, async (done) => {
    const res = await request(app)
      .put(`/api/offers/`)
      .send({category: `aaa`, description: `bbb`, title: `ccc`, type: `ddd`, sum: 123});
    expect(res.statusCode).toBe(404);

    done();
  });

  test(`should send status 200, on DELETE api/offers/:offerId`, async (done) => {
    const res = await request(app).delete(`/api/offers/FKqI2s`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ok: true});

    done();
  });

  test(`should have code status 200 and send array, when calling GET /api/offers/:offerId/comments`, async (done) => {
    const res = await request(app).get(`/api/offers/FKqI2s/comments`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
    done();
  });

  test(`should have code status 200 and send object, when calling DELETE /api/offers/:offerId/comments/commentId`, async (done) => {
    const res = await request(app).delete(`/api/offers/eYf1UG/comments/P04WSc`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.objectContaining({}));
    done();
  });

  test(`should have code status 200 and send object, when calling POST /api/offers/:offerId/comments`, async (done) => {
    const res = await request(app).post(`/api/offers/FKqI2s/comments`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.objectContaining([]));
    done();
  });
});
