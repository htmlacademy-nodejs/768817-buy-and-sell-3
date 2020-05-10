'use strict';

const {app} = require(`../server`);
const request = require(`supertest`);

describe(`server api end-points`, () => {
  test(`should have code status 200, when calling GET /api/categories`, async (done) => {
    const res = await request(app).get(`/api/categories/`);
    expect(res.statusCode).toBe(200);
    done();
  });

  test(`should have code status 200 and send array, when calling SEARCH /api/search`, async (done) => {
    const res = await request(app).get(`/api/search`).query({id: `eYf1UG`});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
    done();
  });
});

