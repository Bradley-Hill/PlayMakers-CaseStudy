import { describe } from "node:test";
import { badgeChecker, isPng } from "../src/badgeChecker";

const mockImage = Buffer.from(
  []
); /* Creates mockImage with bytes from provided array */

describe("badgeChecker function exists", () => {
  it("should exist", () => {
    expect(typeof badgeChecker).toBe("function");
  });
});

describe("badgeChecker takes an image as an argument", () => {
  it("sould not throw an error when called with Buffer argument", () => {
    expect(() => badgeChecker(mockImage)).not.toThrow();
  });

  describe("badgeChecker should return a boolean", () => {
    it("should return as true or false", async () => {
      const result = await badgeChecker(mockImage);
      expect(typeof result).toBe("boolean");
    });
  });
});
