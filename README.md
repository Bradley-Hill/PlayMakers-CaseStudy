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
- detour revising mathematics of circles. (x-a)^2 + (y-b)^2 = r^2 where x and y are any given coordinates and a,b are the centre of the circle. This can be used for checking when pixels are outside of the circle.
- the inequality version (x-a)^2 + (y-b)^2 <= r^2 is useful for checking the pixels within the circle. A useful tool that may be used later.
- learned the math for converting 2D array coordinates into 1d array and that it is necessary for image data which while often represented as having height and width, the raw image data is still stored in a 1D array.
- index = 4 _ (width _ y + x)

## Third Steps

- ColorThief documentation reading and how I'm going to define happy colours, (Red,Yellow,Pink,Orange will be my happy colours)
- had to create a declaration.d.ts file to spoof the colorthief library into working with TypeScript, a shame, but its a quick and ugly fix that seems to work.
- uninstalled colorthief, as it relies on canvas, and installed color-thief-node, which works better in a node environment.
- more maths, of a simpler sort just defining acceptable difference in values between what i have defined as my happy colours and the dominantColour returned by color-thief-node

## What I would have liked to have done

- Really enjoyed teh exercise, have been learning new things left and right, which is always satisfying.
- Would have liked to have created the parallel function that would have convert any given image into the specified object, but I have probably already spent more time on this than 'no more than a few hours' implies....But definitely would have enjoyed seeing it through to the end. Instead I am going to see if i can't do some exercises to reinforce and integrate the things I have learned today.
- Maths, it's been a while, but I enjoyed wrapping my head around some Maths after a long time away from its most simple forms.
- More testing, but it gets to a point where I had to prioritise actually getting functionality in place over testing the functions, but I do like to try and practice TDD, definitely results in better cleaner stronger code (at least for me)

**Thanks for this exercise, it has been very stimulating, and I'm looking forward to discussing it with you in the near future!**
