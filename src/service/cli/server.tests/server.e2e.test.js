'use strict';
const FILE_NAME = `mocks.json`;
const fs = require(`fs`).promises;

const {app} = require(`../server`);
const request = require(`supertest`);

describe(`server api end-points`, () => {
  beforeAll(async (done) => {
    const content = JSON.stringify([{
      id: `10`,
      category: [`a`, `b`, `c`],
      title: `aaa`,
      type: `sale`,
      sum: 123,
      comments: [
        {
          id: `20`,
          text: `zzz`,
        },
        {
          id: `22`,
          text: `zzzzddzz`
        }
      ]
    }]);
    await fs.writeFile(FILE_NAME, content);
    done();
  });
  afterAll(async (done) => {
    await fs.writeFile(FILE_NAME, {});
    done();
  });
  test(`should have code status 200, when calling GET /api/categories`, async (done) => {
    const res = await request(app).get(`/api/categories/`);
    expect(res.statusCode).toBe(200);
    done();
  });

  test(`should have code status 200 and send array, when calling SEARCH /api/search`, async (done) => {
    const res = await request(app).get(`/api/search`).query({id: `10`});
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expect.arrayContaining([]));
    done();
  });
});

