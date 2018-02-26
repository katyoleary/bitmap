'use strict';

const fs = require('fs');

const readFileHelper = module.exports = (filePath, rfCallback) => {
  if(filePath.indexOf('.bmp') < 0) throw new Error(`${filePath} is not a bmp file. Please visit https://online-converting.com/image/convert2bmp/ to convert this image to a bmp file.`);
  if(typeof filePath !== 'string' || typeof rfCallback !== 'function') throw new Error('argument data type error');
  // if(arguments.length !== 2) throw new Error('must have exactly 2 arguments');

  fs.readFile(`${__dirname}/../assets/${filePath}`, function(err, data) {
    if (err) return rfCallback(err);
    // console.log(data.toString('hex'));
    return rfCallback(null, data);
  });
};
