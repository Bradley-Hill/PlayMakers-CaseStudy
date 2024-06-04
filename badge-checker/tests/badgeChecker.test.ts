import { describe } from "node:test";
import { badgeChecker } from "../src/badgeChecker";

describe("badgeChecker function", () => {
  it("should exist", () => {
    expect(typeof badgeChecker).toBe("function");
  });
});
