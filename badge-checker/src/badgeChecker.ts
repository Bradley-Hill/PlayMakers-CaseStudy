import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import * as util from "util";
import * as colorThief from "color-thief-node";

const writeFile = util.promisify(fs.writeFile);
const unlinkFile = util.promisify(fs.unlink);

export async function badgeChecker(image: Buffer): Promise<boolean> {
  if (!(await isPng(image))) {
    return false;
  }

  if (!(await checkSize(image))) {
    return false;
  }

  if (!(await onlyTransparentOutsideCircle(image))) {
    return false;
  }
  if (!(await isHappyColour(image))) {
    return false;
  }
  return true;
}

export async function isPng(image: Buffer): Promise<boolean> {
  const metadata = await sharp(image).metadata();
  return metadata.format === "png";
}

export async function checkSize(image: Buffer): Promise<boolean> {
  const metadata = await sharp(image).metadata();
  return metadata.width === 512 && metadata.height === 512;
}

export async function onlyTransparentOutsideCircle(
  image: Buffer
): Promise<boolean> {
  const {
    data,
    info: { width, height },
  } = await sharp(image).raw().toBuffer({ resolveWithObject: true });
  //   converting image to raw pixel data, returning object with the width,height and data
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width / 2;
  //   defining constants for the circle checks

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // nested loops for iterating over all the pixels, probably very inefficient....
      const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
      // makes teh distance from the center point to check against radius
      if (distance > radius) {
        const index = 4 * (width * y + x);
        // finds the correct pixel in the raw data array, which is one dimensional, 4bytes accounts for the pixel information (RGBA)
        const alphaValue = data[index + 3];
        if (alphaValue !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

export async function isHappyColour(image: Buffer): Promise<boolean> {
  const filePath = path.join(__dirname, "tempImage.png");
  await writeFile(filePath, image);
  // create a file from the image to be used with color-thief-node, and then deleted afterwards
  const dominantColour = colorThief.getColor(
    filePath as unknown as HTMLImageElement
  );
  const dominantColourRGB = {
    r: dominantColour[0],
    g: dominantColour[1],
    b: dominantColour[2],
  };
  //have to use this ugly typing definition as a workaround for teh typescript error from not being able to submit a string as an argument here.
  // use colorthief to extract teh dominant color from the image
  const happyColours = [
    { r: 255, g: 0, b: 0 }, // Red
    { r: 255, g: 255, b: 0 }, // Yellow
    { r: 255, g: 105, b: 180 }, // Pink
    { r: 255, g: 165, b: 0 }, // Orange
  ];
  const differenceThreshold = 75;
  //threshold for teh difference between the happy colours and dominantColours to be acceptable.

  for (const happyColour of happyColours) {
    const colourDifference =
      Math.abs(dominantColourRGB.r - happyColour.r) +
      Math.abs(dominantColourRGB.g - happyColour.g) +
      Math.abs(dominantColourRGB.b - happyColour.b);
    if (colourDifference <= differenceThreshold) {
      return true;
    }
  }
  return false;
}
