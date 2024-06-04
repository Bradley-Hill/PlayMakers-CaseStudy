import sharp from "sharp";

export async function badgeChecker(image: Buffer): Promise<boolean> {
  if (!(await isPng(image))) {
    return false;
  }

  if (!(await checkSize(image))) {
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
