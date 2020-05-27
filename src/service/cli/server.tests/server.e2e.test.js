'use strict';
const {app} = require(`../server`);
const request = require(`supertest`);
const {HttpCodes} = require(`../../../constants`);
const {run} = require(`../generate`);

describe(`server api end-points`, () => {
  beforeAll(async (done) => {
    const preventExit = true;
    await run([1, preventExit]);
    done();
  });
  test(`should have code status 200, when calling GET /api/categories`, async (done) => {
    const res = await request(app).get(`/api/categories/`);
    expect(res.statusCode).toBe(HttpCodes.OK);
    done();
  });

  test(`should have code status 200 and send array, when calling SEARCH /api/search`, async (done) => {
    const res = await request(app).get(`/api/search`).query({id: `10`});
    expect(res.statusCode).toBe(HttpCodes.OK);
    expect(res.body).toEqual(expect.arrayContaining([]));
    done();
  });
});

