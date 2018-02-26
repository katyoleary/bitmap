'use strict';

const fileTransformer = require('../lib/file-transformer.js');
const testAssets = require('./test-assets/test-assets');

require('jest');

describe('File transformer Module', () => {
  describe('with improper data types', () => {
    it('should throw argument data type error', done => {
      expect(() => {
        fileTransformer(testAssets.buffer, 'greyscale', function(){});
      }).toThrow('argument data type error');
      done();
    });
  });

  describe('with proper data types', () => {
    it('should return file data', done => {
      fileTransformer(testAssets.buffer, ['greyscale'], function(err) {
        expect(err).toBe(null);
        done();
      });
    });
  });

  describe('fileTransformer invert', () => {
    it('the invert methods pixel array values should be reversed', done => {
      fileTransformer(testAssets.buffer, ['invert'], function(err, data) {
        expect(data.slice(1078, 11078).toString('hex')).toEqual(testAssets.invertedPixelArray.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer greyscale', () => {
    it('the greyscale methods color table buffer values should be an average for each rgb set', done => {
      fileTransformer(testAssets.buffer, ['greyscale'], function(err, data) {
        expect(data.slice(54, 1078).toString('hex')).toEqual(testAssets.greyscaleColorTableBuffer.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer verticalmirror', () => {
    it('the verticalmirror methods pixel array values should be reversed', done => {
      fileTransformer(testAssets.buffer2, ['verticalmirror'], function(err, data) {
        expect(data.slice(1078, 11078).toString('hex')).toEqual(testAssets.verticalmirrorPixelArray.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer redscale', () => {
    it('the redscale methods color table buffer values of g in the rgb should be 0', done => {
      fileTransformer(testAssets.buffer2, ['redscale'], function(err, data) {
        expect(data.slice(54, 1078).toString('hex')).toEqual(testAssets.redscaleColorTableBuffer.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer bluescale', () => {
    it('the bluescale methods color table buffer values of b in the rgb should be 0', done => {
      fileTransformer(testAssets.buffer3, ['bluescale'], function(err, data) {
        expect(data.slice(54, 1078).toString('hex')).toEqual(testAssets.bluescaleColorTableBuffer.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer greenscale', () => {
    it('the greenscale methods color table buffer values of r in the rgb should be 0', done => {
      fileTransformer(testAssets.buffer4, ['greenscale'], function(err, data) {
        expect(data.slice(54, 1078).toString('hex')).toEqual(testAssets.greenscaleColorTableBuffer.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer whitereplace', () => {
    it('the whitereplace methods color table buffer values of r in the rgb should be 0', done => {
      fileTransformer(testAssets.buffer5, ['whitereplace'], function(err, data) {
        expect(data.slice(54, 1078).toString('hex')).toEqual(testAssets.whitereplaceColorTableBuffer.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer blackreplace', () => {
    it('the blackreplace methods color table buffer values of r in the rgb should be 0', done => {
      fileTransformer(testAssets.buffer6, ['blackreplace'], function(err, data) {
        expect(data.slice(54, 1078).toString('hex')).toEqual(testAssets.blackreplaceColorTableBuffer.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer invertedverticalmirror', () => {
    it('the invertedverticalmirror methods pixel array values should be reversed', done => {
      fileTransformer(testAssets.buffer3, ['invertedverticalmirror'], function(err, data) {
        expect(data.slice(1078, 11078).toString('hex')).toEqual(testAssets.invertedverticalmirrorPixelArray.toString('hex'));
        done();
      });
    });
  });

  describe('fileTransformer invertedhorizontalmirror', () => {
    it('the invertedhorizontalmirror methods pixel array values should be reversed', done => {
      fileTransformer(testAssets.buffer4, ['invertedhorizontalmirror'], function(err, data) {
        expect(data.slice(1078, 11078).toString('hex')).toEqual(testAssets.invertedhorizontalmirrorPixelArray.toString('hex'));
        done(); 
      });
    });
  });

  describe('fileTransformer horizontalmirror', () => {
    it('the horizontalmirror methods pixel array values should be reversed', done => {
      fileTransformer(testAssets.buffer5, ['horizontalmirror'], function(err, data) {
        expect(data.slice(1078, 11078).toString('hex')).toEqual(testAssets.horizontalmirrorPixelArray.toString('hex'));
        done(); 
      });
    });
  });

});

