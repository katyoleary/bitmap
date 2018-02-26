'use strict';

const fileReader = require('../lib/file-reader.js');
require('jest');

describe('File Reader Module', function() {
  describe('with improper file paths', function() {
    it('should return an error', function(done) {
      fileReader('doesnotexist.bmp', function(err) {
        expect(err).toBeTruthy();
        expect(err.code).toEqual('ENOENT');
        done();
      });
    });
  });
  describe('with proper file paths', function() {
    it('should return file data', function(done) {
      fileReader('palette-bitmap.bmp', function(err) {
        expect(err).toBe(null);
        done();
      });
    });
  });
});