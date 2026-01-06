const request = require("supertest");
const app = require("../../src/server");

describe("GET /hello", () => {
  it("should return 'Hello world!' when no name is provided", async () => {
    const res = await request(app).get("/hello");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return 'Hello world! From [name]' when a name is provided", async () => {
    const name = "Alice";
    const res = await request(app).get(`/hello/${name}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe(`Hello world! From ${name}`);
  });
});

describe("POST /hello", () => {
  it("should return 'Hello world!' when no name header is provided", async () => {
    const res = await request(app).post("/hello");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello world!");
  });

  it("should return 'Hello world! From [name]' when a name header is provided", async () => {
    const name = "Bob";
    const res = await request(app).post("/hello").set("x-name", name);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe(`Hello world! From ${name}`);
  });
});
