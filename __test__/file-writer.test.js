'use strict';

const fileWriter = require('../lib/file-writer.js');
require('jest');

describe('File Writer Module', function() {
  describe('with improper file paths', function() {
    it('should throw argument data type error', function(done) {
      expect(function() {
        fileWriter(Buffer.from('00 00 00', 'hex'), 'abc', function() {});
      }).toThrow('abc is not a bmp file. Please execute your command again with abc.bmp as your new file name.');
      expect(function() {
        fileWriter(Buffer.from('00 00 00', 'hex'), 'abc.bmp', []);
      }).toThrow('argument data type error');
      done();
    });
  });
  describe('with proper file paths', function() {
    it('should return file data', function(done) {
      fileWriter(Buffer.from('00 00 00', 'hex'), 'abc.bmp', function(err) {
        expect(err).toBe(null);
        done();
      });
    });
  });
});

// could do err,data function and expected results for data value