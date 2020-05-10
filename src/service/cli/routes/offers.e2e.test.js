'use strict';

const {runServer} = require(`../server`);
const request = require(`supertest`);


describe(`offers api end-points`, () => {
  afterAll(() => {
    process.exit();
  });

  test(`should have code status 200, when calling GET /api/offers`, async () => {
    const res = await request(runServer(3000)).get(`/api/offers/`);
    expect(res.statusCode).toBe(200);
  });

  test(`should have code status 200, when calling GET /api/categories`, async () => {
    const res = await request(runServer(3000)).get(`/api/categories/`);
    expect(res.statusCode).toBe(200);
  });
});
