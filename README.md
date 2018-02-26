# Bitmap CLI Application

Code Fellows 401 Advanced Software Development

Bitmap Transformer Assignment, February 2018

This application can help perform a few basic image processing transformations on bitmap files (.bmp) with color depths of 8 or 24 bits and have a header field of 'BM'. Accepted bitmaps may have any width or height although smaller sized bitmaps are recommended for faster processing, there is a 100px by 100px sample image provided in the project.

###Installation & Getting Started:
  - Fork and or clone a copy of this repo and CD into the root file.
  - Run a NPM i -S (optional - dependencies we installed during the dev process).
  - Now that you have CD'd into the project and are at the root file you are able to run your transformations from your command line (see below for examples).

###Basic Commands:
  - node index.js [originalBitmapFile] [transformedBitmapFile] [transformation]
  - node index.js palette-bitmap.bmp ihm-palette-bitmap.bmp invertedhorizontalmirror
  - The above command will take the palette-bitmap.bmp file perform a 'invertedhorizontalmirror' transformation on it and create a new file named ihm-palette-bitmap.bmp 

Note: The [originalBitmapFile] must be located in the assets folder, this is where all of your transformation files will be written to as well. Also, please include .bmp when creating your new file's name.

###Commands & Transformations Explained:
  - invert - inverts the bitmap's pixel array.
  - greyscale - modifies the bitmap's color table by converting the R, G and B value of each color to an average of the 3; thus converting the bitmap to greyscale.
  - redscale - modifies the bitmap's color table by converting the G value of each color's RGB to 0; thus converting the bitmap to redscale.
  - bluescale - modifies the bitmap's color table by converting the B value of each color's RGB to 0; thus converting the bitmap to bluescale.
  - greenscale - modifies the bitmap's color table by converting the R value of each color's RGB to 0; thus converting the bitmap to greenscale.
  - whitereplace - modifies the bitmap's color table by replacing all instances of white with black.
  - blackreplace - modifies the bitmap's color table by replacing all instances of black with white.
  - verticalmirror - modifies the second hald of bitmap's pixel array by duplicating the top half.
  - verticalmirrorinverted - modifies the second half of the bitmap's pixel array by duplicating the inverse of the top half.
  - horizontalmirror - modifies the second half of each line inside the bitmap's pixel array by duplicating the left half of the same line.
  - horizontalmirrorinverted - modifies the second half of each line inside the bitmap's pixel array by duplicating the inverse of the left half of the same line.

Note: There are 11 separate transformations, feel free to playaround with all of them and to chain multiple transformations on top each other. ex. node index.js palette-bitmap.bmp ihm-palette-bitmap.bmp invertedhorizontalmirror greyscale

###Technical Overview:
Our project is made up of 3 separate modules that live inside the lib folder(read,transform and write), the contents of which of which are exported. This project was an exercise in asynchronous callbacks, TDD (Test Driven Development), project organization and modularity among other things.

The file-reader.js module has an airity of 2 with expected inputs of a file path and a callback. The output is a buffer object, if there is a valid input of a (file path and function). If the parameter type/types are wrong or there is not 2 parameters an error will be thrown.

The file-transformer.js module has an airity of 3 with expected inputs of a buffer object, an array of transformations and a callback function. The output is an hexidecimally encoded buffer object that is ready to be written to a file, if there are valid inputs of an (buffer object, array of transformations and a callback function). If the parameter type/types are wrong or there is not 3 parameters an error will be thrown.

The file-writer.js module has an airity of 3 with expected inputs of an hexidecimally encoded buffer object, a file path string and a callback function. The expected result in a newly written file and a success message in your terminal, if there are valid inputs of an (hexidecimally encoded buffer object, a file path string and a callback function). If the parameter type/types are wrong or there is not 3 parameters an error will be thrown.