const { getGreeting } = require("../../src/greeting");

describe("getGreeting", () => {
  it("returns the hello world message", () => {
    expect(getGreeting()).toBe("Hello world!");
  });

  it("returns the hello world message with a name when provided", () => {
    const name = "Alice";
    expect(getGreeting(name)).toBe("Hello world! From Alice");
  });

  it("returns the hello world message with an empty string name", () => {
    expect(getGreeting("")).toBe("Hello world!");
  });

  it("returns the hello world message with a name containing special characters", () => {
    const name = "Alice & Bob";
    expect(getGreeting(name)).toBe("Hello world! From Alice & Bob");
  });

  it("returns the hello world message with a name containing numbers", () => {
    const name = "Alice123";
    expect(getGreeting(name)).toBe("Hello world! From Alice123");
  });
});
