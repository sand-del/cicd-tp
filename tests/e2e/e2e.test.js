const axios = require('axios');
const app = require('../../src/server');
let server;
let baseURL;

beforeAll((done) => {
  server = app.listen(0, () => {
    const { port } = server.address();
    baseURL = `http://127.0.0.1:${port}`;
    done();
  });
});

afterAll((done) => {
  server.close(done);
});

describe('E2E GET /hello', () => {
  it('responds with Hello world when no name is provided', async () => {
    const res = await axios.get(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe('Hello world!');
  });

  it('responds with Hello world From [name] when name is provided', async () => {
    const name = 'Alice';
    const res = await axios.get(`${baseURL}/hello/${name}`);
    expect(res.status).toBe(200);
    expect(res.data).toBe(`Hello world! From ${name}`);
  });

  it('handles names with special characters in URL', async () => {
    const name = 'Alice%20Bob';
    const res = await axios.get(`${baseURL}/hello/${name}`);
    expect(res.status).toBe(200);
    expect(res.data).toBe('Hello world! From Alice Bob');
  });

  it('returns 404 for invalid paths', async () => {
    try {
      await axios.get(`${baseURL}/invalid`);
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});

describe('E2E POST /hello', () => {
  it('responds with Hello world when no name header is provided', async () => {
    const res = await axios.post(`${baseURL}/hello`);
    expect(res.status).toBe(200);
    expect(res.data).toBe('Hello world!');
  });

  it('responds with Hello world From [name] when name header is provided', async () => {
    const name = 'Bob';
    const res = await axios.post(`${baseURL}/hello`, {}, {
      headers: { 'x-name': name }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe(`Hello world! From ${name}`);
  });

  it('handles names with special characters in header', async () => {
    const name = 'Alice & Bob';
    const res = await axios.post(`${baseURL}/hello`, {}, {
      headers: { 'x-name': name }
    });
    expect(res.status).toBe(200);
    expect(res.data).toBe('Hello world! From Alice & Bob');
  });
});

describe('E2E Error Handling', () => {
  it('returns 400 for names that are too long', async () => {
    const longName = 'A'.repeat(101);
    try {
      await axios.get(`${baseURL}/hello/${longName}`);
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBe('Name is too long');
    }
  });

  it('returns 404 for unsupported HTTP methods', async () => {
    try {
      await axios.put(`${baseURL}/hello`);
      fail('Should have thrown an error');
    } catch (error) {
      expect(error.response.status).toBe(404);
    }
  });
});
