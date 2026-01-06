const request = require("supertest");
const app = require("../../src/server");

describe("Integration tests for /hello endpoint", () => {
  describe("GET /hello", () => {
    it("should return Hello world when no name is provided", async () => {
      const res = await request(app).get("/hello");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world!");
    });

    it("should return Hello world From [name] when name is provided", async () => {
      const name = "Alice";
      const res = await request(app).get(`/hello/${name}`);
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe(`Hello world! From ${name}`);
    });

    it("should handle URL-encoded names correctly", async () => {
      const name = "Alice Bob";
      const res = await request(app).get(`/hello/${encodeURIComponent(name)}`);
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe(`Hello world! From ${name}`);
    });

    it("should return 400 for names longer than 100 characters", async () => {
      const longName = "A".repeat(101);
      const res = await request(app).get(`/hello/${longName}`);
      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Name is too long");
    });
  });

  describe("POST /hello", () => {
    it("should return Hello world when no name header is provided", async () => {
      const res = await request(app).post("/hello");
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world!");
    });

    it("should return Hello world From [name] when name header is provided", async () => {
      const name = "Bob";
      const res = await request(app).post("/hello").set("x-name", name);
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe(`Hello world! From ${name}`);
    });

    it("should handle special characters in header", async () => {
      const name = "Alice & Bob";
      const res = await request(app).post("/hello").set("x-name", name);
      expect(res.statusCode).toBe(200);
      expect(res.text).toBe("Hello world! From Alice & Bob");
    });

    it("should return 400 for names longer than 100 characters in header", async () => {
      const longName = "A".repeat(101);
      const res = await request(app).post("/hello").set("x-name", longName);
      expect(res.statusCode).toBe(400);
      expect(res.text).toBe("Name is too long");
    });
  });

  describe("Error handling", () => {
    it("should return 404 for non-existent routes", async () => {
      const res = await request(app).get("/nonexistent");
      expect(res.statusCode).toBe(404);
    });

    it("should return 404 for unsupported HTTP methods", async () => {
      const res = await request(app).put("/hello");
      expect(res.statusCode).toBe(404);
    });
  });
});
