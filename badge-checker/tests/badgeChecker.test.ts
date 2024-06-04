import { describe } from "node:test";
import { badgeChecker, isPng, checkSize } from "../src/badgeChecker";
import fs from "fs";
import path from "path";

/* const mockImage = Buffer.from(
  []
);  Creates mockImage with bytes from provided array(empty) */

const mockImage = fs.readFileSync(
  path.join(__dirname, "..", "images", "test.png")
);

describe("badgeChecker function exists", () => {
  it("should exist", () => {
    expect(typeof badgeChecker).toBe("function");
  });
});

describe("badgeChecker takes an image as an argument", () => {
  it("sould not throw an error when called with Buffer argument", () => {
    expect(() => badgeChecker(mockImage)).not.toThrow();
  });
});

describe("badgeChecker should return a boolean", () => {
  it("should return as true or false", async () => {
    const result = await badgeChecker(mockImage);
    expect(typeof result).toBe("boolean");
  });
});

describe("isPng", () => {
  it("should return true for PNG images", async () => {
    const pngImage = fs.readFileSync(
      path.join(__dirname, "..", "images", "test.png")
    );
    const result = await isPng(pngImage);
    expect(result).toBe(true);
  });

  it("should return false for non-PNG images", async () => {
    const nonPngImage = fs.readFileSync(
      path.join(__dirname, "..", "images", "test.jpg")
    );
    const result = await isPng(nonPngImage);
    expect(result).toBe(false);
  });
});

describe("checkSize", () => {
  it("should return true if size is 512x512", async () => {
    const correctSizeImage = fs.readFileSync(
      path.join(__dirname, "..", "images", "512test.png")
    );
    const result = await checkSize(correctSizeImage);
    expect(result).toBe(true);
  });

  it("should return false for images not sized 512x512", async () => {
    const incorrectSizeImage = fs.readFileSync(
      path.join(__dirname, "..", "images", "test.jpg")
    );
    const result = await checkSize(incorrectSizeImage);
    expect(result).toBe(false);
  });
});
