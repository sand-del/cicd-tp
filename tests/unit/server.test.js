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

  it("should handle names with special characters in URL", async () => {
    const name = "Alice%20Bob";
    const res = await request(app).get(`/hello/${name}`);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello world! From Alice Bob");
  });

  it("should return 404 for invalid paths", async () => {
    const res = await request(app).get("/invalid");
    expect(res.statusCode).toEqual(404);
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

  it("should handle names with special characters in header", async () => {
    const name = "Alice & Bob";
    const res = await request(app).post("/hello").set("x-name", name);
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello world! From Alice & Bob");
  });
});

describe("Unsupported HTTP methods", () => {
  it("should return 404 for PUT /hello", async () => {
    const res = await request(app).put("/hello");
    expect(res.statusCode).toEqual(404);
  });

  it("should return 404 for DELETE /hello", async () => {
    const res = await request(app).delete("/hello");
    expect(res.statusCode).toEqual(404);
  });
});
