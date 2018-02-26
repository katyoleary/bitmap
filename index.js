'use strict';

const readFileHelper = require('./lib/file-reader.js');
const transformFileHelper = require('./lib/file-transformer.js');
const writeFileHelper = require('./lib/file-writer.js');

let transformedFilePath = process.argv[3];
let transformationArray = [];

const wfCallback = function(err) {
  if(err) return err;
  console.log(`*** successfully created ${transformedFilePath} ***`);
};

const tfCallback = function(err, data) {
  if(err) return err;
  writeFileHelper(data, transformedFilePath, wfCallback);
};

const rfCallback = function(err, data) {
  if(err) return err;
  transformFileHelper(data, transformationArray, tfCallback);
};

(function () {
  for(let i=4; i< process.argv.length; i++) {
    transformationArray.push(process.argv[i]);
  }
  readFileHelper(process.argv[2], rfCallback);
})();


// node index.js palette-bitmap.bmp transformed-palette-bitmap.bmp invert