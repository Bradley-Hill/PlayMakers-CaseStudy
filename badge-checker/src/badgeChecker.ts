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
