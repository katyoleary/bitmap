'use strict';

const fs = require('fs');

const writeFileHelper = module.exports = (data, transformedFilePath, wfCallback) => {
  if(transformedFilePath.indexOf('.bmp') < 0) throw new Error(`${transformedFilePath} is not a bmp file. Please execute your command again with ${transformedFilePath}.bmp as your new file name.`);
  if(typeof data === 'object' && data.constructor !== Buffer || typeof data !== 'object' || typeof transformedFilePath !== 'string' || typeof wfCallback !== 'function') throw new Error('argument data type error');
  // if(arguments.length !== 5) throw new Error('must have exactly 3 arguments'); 
  fs.writeFile(`${__dirname}/../assets/${transformedFilePath}`, data, function(err) {
    if (err) return wfCallback(err);
    return wfCallback(null);
  });
};