# PlayMakers-CaseStudy

Playmakers Case Study - Exercise with functions for uploading a Badge

## The exercise

### We want users to upload a badge: an avatar within a circle.

1. Create a function taking a png as input and verifying that:
2. Size = 512x512
3. That only non transparent pixels are within a circle
4. That the colors is the badge give a "happy" feeling
5. Additionally, you can create a parallel function that converts the given image (of any format) into the specified object.

## Initial Planning

So my first thoughts are to start thusly :

- Set-up environment ( Going to be using TypeScript and (hopefully) some useful libraries )
- Researching useful libraries for image manipulation/verification
- Researching useful libraries for color analysis
- Breakdown functions into basic elements
- Test Driven Development

## First steps

- [ColorThief](https://lokeshdhakar.com/projects/color-thief/#examples) seems pretty popular and more importantly, not too complicated
- [Sharp](https://sharp.pixelplumbing.com/) Ditto for Sharp, a robust image manipulation library, lets give it a go.
- Setup Node project in badge-checker, and installed TypeScript and Jest, standard config for TypeScript and created jest.config to play nice with TypeScript.
- Installed sharp and colorthief
- First test written.
- added `"types": ["node", "jest"]` to tsconfig.json
- First test passed, now down to business.

## Second steps

- Creating helper functions to breakdown the responsibility of the badgeChecker function.
- added images to images folder to be used in testing, on .png and one .jpg
- tests for checkSize and isPng added in.
- test for onlyTransparentOutsideCircle tests started
- detour revising mathematics of circles. (x-h)^2 + (y-k)^2 = r^2 where x and y are any given coordinates and h,k are the centre of the circle. This can be used for checking when pixels are outside of the circle.
