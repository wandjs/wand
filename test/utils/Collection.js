var expect = require('chai').expect;
var CollectionUtils = require('../../lib/utils/Collection');

describe('Collection', function(){

  describe('sum()', function(){
    var sum = CollectionUtils.sum;
    it('should return 0 when non-array is passed', function(){
      expect(sum()).to.equal(0);
      expect(sum('')).to.equal(0);
      expect(sum(1)).to.equal(0);
      expect(sum({})).to.equal(0);
      expect(sum(null)).to.equal(0);
      expect(sum(undefined)).to.equal(0);
    });
    it('should return 0 when array is empty', function(){
      expect(sum([])).to.equal(0);
    });
    it('should return the addition of numbers', function(){
      expect(sum([1,2,3])).to.equal(6);
    });
    it('should return the addition of numbers by key', function(){
      expect(sum([{a:1}, {a:2}, {a:3}], 'a')).to.equal(6);
    });
    it('should return the addition of an arguments object', function(){
      expect((function() { return CollectionUtils.sum(arguments); }(1,2,3))).to.equal(6);
    });
  });

  describe('walk()', function(){
    var walk = CollectionUtils.walk;
    var example = {
      a: {
        b: true
      }
    };
    it('should return the value specified by the string path', function(){
      expect(walk(example, 'a.b')).to.ok;
      expect(walk(example, 'a')).to.equal(example.a);
    });
    it('should return the value specified by the array path', function(){
      expect(walk(example, ['a','b'])).to.ok;
      expect(walk(example, ['a'])).to.equal(example.a);
    });
    it('should return undefined if an invalid path is given', function(){
      expect(walk(example, '')).to.be.undefined;
      expect(walk(example, 'z')).to.be.undefined;
    });
    it('should return the input value if no path is given', function(){
      expect(walk(example)).to.equal(example);
    });
    it('should return the input value if path is falsy', function(){
      expect(walk(example, null)).to.equal(example);
      expect(walk(example, undefined)).to.equal(example);
      expect(walk(example, false)).to.equal(example);
      expect(walk(example, 0)).to.equal(example);
    });
  });

  describe('deepForEach()', function(){
    var deepForEach = CollectionUtils.deepForEach;
    it('should iterate over nested objects', function(){
      var example = {
        a: 'one',
        b: {
          c: 'two',
          d: {e: 'three'}
        }
      };
      var result = '';
      deepForEach(example, function(value) {
        if (typeof value === 'string') result += value;
      });
      expect(result).to.equal('onetwothree');
    });
    it('should iterate over nested arrays', function(){
      var example = [
        'one',
        ['two', 'three']
      ];
      var result = '';
      deepForEach(example, function(value) {
        if (typeof value === 'string') result += value;
      });
      expect(result).to.equal('onetwothree');
    });
    it('should iterate over nested objects and arrays', function(){
      var example = {
        a: 'one',
        b: [
          'two',
          {c: 'three'}
        ]
      };
      var result = '';
      deepForEach(example, function(value) {
        if (typeof value === 'string') result += value;
      });
      expect(result).to.equal('onetwothree');
    });
  });

  describe('empty()', function(){
    var empty = CollectionUtils.empty;
    it('should remove all elements of an array', function(){
      expect(empty([1,2])).to.be.empty;
    });
    it('should remove all properties of an object', function(){
      expect(empty({a:1,b:2})).to.be.empty;
    });
    it('should return an empty object or array unchanged', function(){
      expect(empty([])).to.be.empty;
      expect(empty({})).to.be.empty;
    });
    it('should return the original object passed in', function(){
      var a = [1,2];
      var b = {a:1,b:2};
      expect(empty(a)).to.equal(a);
      expect(empty(b)).to.equal(b);
    });
  });

});