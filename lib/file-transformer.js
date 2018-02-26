'use strict';

const transformFileHelper = module.exports = (data, transformation, tfCallback) => {
  if(typeof data === 'object' && data.constructor !== Buffer || typeof data !== 'object' || typeof transformation !== 'object' && data.constructor !== Array || typeof transformation !== 'object' || typeof tfCallback !== 'function') throw new Error('argument data type error');
  // if(arguments.length !== 5) throw new Error('must have exactly 3 arguments'); 
  function BmData(obj) {
    this.type = obj.toString('utf-8', 0, 2);
    this.size = obj.readInt32LE(2);
    this.width = obj.readInt32LE(18);
    this.height = obj.readInt32LE(22);
    this.offset = obj.readInt32LE(10);
    this.dibHeaderSize = obj.readInt32LE(14);
    this.bitsPerPixel = obj.readInt32LE(28);
    this.imageSize = obj.readInt32LE(34);
    this.colorsincolorpalatter = obj.readInt32LE(46);
    this.buffer = obj;
    this.colorTableBuffer = obj.slice(this.dibHeaderSize + 14, this.offset);
    this.pixelArray = obj.slice(this.offset, this.size);
  }

  BmData.prototype.invert =  function() {
    this.pixelArray.reverse();
    return this;
  };

  BmData.prototype.greyscale = function() {
    // console.log(this.colorTableBuffer.toString('hex'));
    // console.log(this.dibHeaderSize + 14, this.offset);
    for(var i = 0; i <this.colorTableBuffer.length; i+=4) {
      let avg = (this.colorTableBuffer[i] + this.colorTableBuffer[i+1] + this.colorTableBuffer[i+2]) / 3;
      this.colorTableBuffer[i] = avg;
      this.colorTableBuffer[i+1] = avg;
      this.colorTableBuffer[i+2] = avg;
    }
    // console.log(this.colorTableBuffer.toString('hex'));
    return this;
  };

  BmData.prototype.redscale = function() {
    // console.log('initial: ', this.colorTableBuffer.toString('hex'), 'initial ');
    for(var i = 0; i <this.colorTableBuffer.length; i+=4) {
      this.colorTableBuffer[i+1] = 0;
    }
    // console.log('second: ', this.colorTableBuffer.toString('hex'), 'second ');
    return this;
  };

  BmData.prototype.bluescale = function() {
    for(var i = 0; i <this.colorTableBuffer.length; i+=4) {
      this.colorTableBuffer[i+2] = 0;
    }
    // console.log(this.colorTableBuffer.toString('hex'));
    return this;
  };

  BmData.prototype.greenscale = function() {
    for(var i = 0; i <this.colorTableBuffer.length; i+=4) {
      this.colorTableBuffer[i] = 0;
    }
    // console.log(this.colorTableBuffer.toString('hex'));
    return this;
  };

  BmData.prototype.whitereplace = function() {
    for(var i = 0; i <this.colorTableBuffer.length; i+=4) {
      if(this.colorTableBuffer[i] == 255 && this.colorTableBuffer[i+1] == 255 &&  this.colorTableBuffer[i+2] == 255) {
        this.colorTableBuffer[i] = 0;
        this.colorTableBuffer[i+1] = 0;
        this.colorTableBuffer[i+2] = 0;
      }
    }
    // console.log(this.colorTableBuffer.toString('hex'));
    return this;
  };

  BmData.prototype.blackreplace = function() {
    for(var i = 0; i <this.colorTableBuffer.length; i+=4) {
      if(this.colorTableBuffer[i] == 0 && this.colorTableBuffer[i+1] == 0 &&  this.colorTableBuffer[i+2] == 0) {
        this.colorTableBuffer[i] = 255;
        this.colorTableBuffer[i+1] = 255;
        this.colorTableBuffer[i+2] = 255;
      }
    }
    // console.log(this.colorTableBuffer.toString('hex'));
    return this;
  };

  BmData.prototype.invertedverticalmirror = function() {
    let startingPoint = this.imageSize/2 -1;
    let mirrorPoint = this.imageSize/2 -1;

    for(var i=startingPoint; i>=0; i--) {
      this.pixelArray[i] = this.pixelArray[mirrorPoint];
      mirrorPoint ++;
    }
    // console.log(this.pixelArray.toString('hex'));
    return this;
  };
  

  BmData.prototype.verticalmirror = function() {
    console.log(this.offset, this.size);
    let startingPoint = this.imageSize/2 -1;
    let mirrorPoint = this.imageSize -1;

    for(var i=startingPoint; i>=0; i--) {
      this.pixelArray[i] = this.pixelArray[mirrorPoint];
      mirrorPoint --;
    }
    // console.log(this.pixelArray.toString('hex'));
    return this;
  };

  BmData.prototype.invertedhorizontalmirror = function() {
    let startingPoint = this.imageSize -1;
    let rowSize = this.imageSize/this.height;
    let mirrorPoint = this.imageSize - rowSize;

    for(var i=rowSize; i>=rowSize/2; i--) {
      // console.log(this.pixelArray[startingPoint], this.pixelArray[mirrorPoint]);
      this.pixelArray[startingPoint] = this.pixelArray[mirrorPoint];
      startingPoint --;
      mirrorPoint ++;
      // console.log(mirrorPoint);
      if(i=== rowSize/2 && mirrorPoint > rowSize) {
        startingPoint -= rowSize/2;
        mirrorPoint -= rowSize + rowSize/2;
        i=rowSize;
      }
    }
    // console.log(this.pixelArray.toString('hex'));
    return this;
  };
  

  BmData.prototype.horizontalmirror = function() {
    let startingPoint = this.imageSize -1;
    let rowSize = this.imageSize/this.height;
    let mirrorPoint = this.imageSize - rowSize/2-1;

    for(var i=rowSize; i>=rowSize/2; i--) {
      this.pixelArray[startingPoint] = this.pixelArray[mirrorPoint];
      startingPoint --;
      mirrorPoint --;
      if(i===rowSize/2 && mirrorPoint > 0) {
        startingPoint -= rowSize/2;
        mirrorPoint -= rowSize/2;
        i=rowSize;
      }
    }
    // console.log(this.pixelArray.toString('hex'));
    return this;
  };

  let bmData = new BmData(data);
  (function () {
    let returnString = '';
    for(let i=0; i<transformation.length; i++) {
      returnString += `.${transformation[i]}()`;
    }
    return eval(`bmData${returnString}`);
  })();
  // console.log('bmdata.buffer ', bmData.buffer.toString('hex'), 'bm data.buffer ');
  console.log('beginning: ', bmData.buffer.slice(1078, 11078).toString('hex'), 'beginning: ');
  let buf = Buffer.from(bmData.buffer, 'hex');
  // console.log(buf.slice(54, 1078).toString('hex'));
  // console.log('beginning: ', buf.slice(54, 1078).toString('hex'), 'beginning: ');
  // console.log('buf', buf);
  // console.log('bmdata.buffer ', buf.toString('hex'), 'bm data.buffer ');
  return tfCallback(null, buf);
};