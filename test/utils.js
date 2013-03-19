var expect = require('chai').expect;
var utils = require('../lib/utils');

describe('utils', function(){

  describe('round()', function(){
    var round = utils.round;
    it('should round to nearest whole number with 0 or no precision', function(){
      expect(round(1)).to.equal(1);
      expect(round(1.4)).to.equal(1);
      expect(round(1.6, 0)).to.equal(2);
    });
    it('should round to single decimal place', function(){
      expect(round(1, 1)).to.equal(1);
      expect(round(1.4, 1)).to.equal(1.4);
      expect(round(1.45, 1)).to.equal(1.4);
    });
    it('should throw RangeError on negative precision', function(){
      expect(function() { round(1, -1); }).to.throw(RangeError);
    });
    it('should throw RangeError on precision greater than 20', function(){
      expect(function() { round(1, 21); }).to.throw(RangeError);
    });
  });

  describe('roundTo()', function(){
    var roundTo = utils.roundTo;
    it('should round to nearest whole number with 0 or no multiple', function(){
      expect(roundTo(1)).to.equal(1);
      expect(roundTo(1.4)).to.equal(1);
      expect(roundTo(1.65, 0)).to.equal(2);
    });
    it('should round to nearest multiple', function(){
      expect(roundTo(7, 5)).to.equal(5);
      expect(roundTo(7, 10)).to.equal(10);
      expect(roundTo(2.5, 2)).to.equal(2);
      expect(roundTo(2.56, 0.1)).to.equal(2.6);
    });
  });

  describe('clamp()', function(){
    var clamp = utils.clamp;
    it('should not clamp number within range', function(){
      expect(clamp(5, 0, 10)).to.equal(5);
      expect(clamp(-5, -10, 0)).to.equal(-5);
      expect(clamp(1.5, 1, 2)).to.equal(1.5);
    });
    it('should clamp number below range to min', function(){
      expect(clamp(-5, 0, 10)).to.equal(0);
      expect(clamp(-15, -10, 0)).to.equal(-10);
      expect(clamp(-1.5, -1, 0)).to.equal(-1);
    });
    it('should clamp number above range to max', function(){
      expect(clamp(15, 0, 10)).to.equal(10);
      expect(clamp(5, -10, 0)).to.equal(0);
      expect(clamp(1.5, 0, 1)).to.equal(1);
    });
  });

  describe('pmod()', function(){
    var pmod = utils.pmod;
    it('should return value with same sign as the divisor', function(){
      expect(pmod(-10, 7)).to.equal(4);
      expect(pmod(10, -7)).to.equal(-4);
      expect(pmod(-10, -7)).to.equal(-3);
    });
  });

  describe('sign()', function(){
    var sign = utils.sign;
    it('should return 1 when value is a positive number', function(){
      expect(sign(1)).to.equal(1);
      expect(sign(0.1)).to.equal(1);
    });
    it('should return -1 when value is a negative number', function(){
      expect(sign(-1)).to.equal(-1);
      expect(sign(-0.1)).to.equal(-1);
    });
    it('should return 0 when value is 0', function(){
      expect(sign(0)).to.equal(0);
      expect(sign(+0)).to.equal(0);
      expect(sign(-0)).to.equal(0);
    });
  });

  describe('lerp()', function(){
    var lerp = utils.lerp;
    it('should return start value when ratio is 0', function(){
      expect(lerp(0, 0, 10)).to.equal(0);
      expect(lerp(0, -10, 0)).to.equal(-10);
    });
    it('should return to end value when ratio is 1', function(){
      expect(lerp(1, 0, 10)).to.equal(10);
      expect(lerp(1, -10, 0)).to.equal(0);
    });
    it('should return average of range when ratio is 0.5', function(){
      expect(lerp(0.5, 0, 10)).to.equal(5);
      expect(lerp(0.5, -10, 0)).to.equal(-5);
    });
    it('should calculate value even outside of range', function(){
      expect(lerp(2, 0, 10)).to.equal(20);
      expect(lerp(-1, -10, 0)).to.equal(-20);
    });
  });

  describe('norm()', function(){
    var norm = utils.norm;
    it('should return 0 when value equals min', function(){
      expect(norm(0, 0, 10)).to.equal(0);
      expect(norm(-10, -10, 0)).to.equal(0);
    });
    it('should return 1 when value equals max', function(){
      expect(norm(10, 0, 10)).to.equal(1);
      expect(norm(0, -10, 0)).to.equal(1);
    });
    it('should return 0.5 when value is average of range', function(){
      expect(norm(5, 0, 10)).to.equal(0.5);
      expect(norm(-5, -10, 0)).to.equal(0.5);
    });
    it('should calculate value even outside of range', function(){
      expect(norm(20, 0, 10)).to.equal(2);
      expect(norm(-20, -10, 0)).to.equal(-1);
    });
  });

  describe('scale()', function(){
    var scale = utils.scale;
    it('should return outputFrom when value equals inputFrom', function(){
      expect(scale(0, 0, 1, 0, 10)).to.equal(0);
      expect(scale(10, 10, 20, 30, 40)).to.equal(30);
      expect(scale(0.2, 0.2, 0.8, 20, 80)).to.equal(20);
    });
    it('should return outputTo when value equals inputTo', function(){
      expect(scale(1, 0, 1, 0, 10)).to.equal(10);
      expect(scale(20, 10, 20, 30, 40)).to.equal(40);
      expect(scale(0.8, 0.2, 0.8, 20, 80)).to.equal(80);
    });
    it('should return average of outputs when value is average of inputs', function(){
      expect(scale(0.5, 0, 1, 0, 10)).to.equal(5);
      expect(scale(15, 10, 20, 30, 40)).to.equal(35);
      expect(scale(1.5, 1, 2, 30, 40)).to.equal(35);
    });
  });

  describe('loop()', function(){
    var loop = utils.loop;
    it('should return min if value is greater than max', function(){
      expect(loop(11, 0, 10)).to.equal(0);
      expect(loop(1, -10, 0)).to.equal(-10);
      expect(loop(2.6, 1.5, 2.5)).to.equal(1.5);
    });
    it('should return max if value is lesser than min', function(){
      expect(loop(-1, 0, 10)).to.equal(10);
      expect(loop(-11, -10, 0)).to.equal(0);
      expect(loop(1.4, 1.5, 2.5)).to.equal(2.5);
    });
    it('should return value if value is within range', function(){
      expect(loop(0, 0, 10)).to.equal(0);
      expect(loop(10, 0, 10)).to.equal(10);
      expect(loop(-10, -10, 0)).to.equal(-10);
      expect(loop(0, -10, 0)).to.equal(0);
      expect(loop(2, 1.5, 2.5)).to.equal(2);
    });
  });

  describe('inRange()', function(){
    var inRange = utils.inRange;
    it('should return true if value is in range', function(){
      expect(inRange(0, 0, 10)).to.be.true;
      expect(inRange(10, 0, 10)).to.be.true;
      expect(inRange(0, -10, 0)).to.be.true;
      expect(inRange(5.4, 0, 10)).to.be.true;
    });
    it('should return false if value is out of range', function(){
      expect(inRange(-1, 0, 10)).to.be.false;
      expect(inRange(11, 0, 10)).to.be.false;
      expect(inRange(1, -10, 0)).to.be.false;
      expect(inRange(-11, -10, 0)).to.be.false;
    });
    it('should return true if value is within range and threshold', function(){
      expect(inRange(12, 0, 10, 2)).to.be.true;
      expect(inRange(-2, 0, 10, 2)).to.be.true;
      expect(inRange(2, -10, 0, 2)).to.be.true;
      expect(inRange(-12, -10, 0, 2)).to.be.true;
    });
    it('should return false if value is outside range and threshold', function(){
      expect(inRange(13, 0, 10, 2)).to.be.false;
      expect(inRange(-3, 0, 10, 2)).to.be.false;
      expect(inRange(-13, -10, 0, 2)).to.be.false;
      expect(inRange(-13, -10, 0, 2)).to.be.false;
    });
  });

  describe('isNear()', function(){
    var isNear = utils.isNear;
    it('should return true if value is in range', function(){
      expect(isNear(5, 5, 0)).to.be.true;
      expect(isNear(5, 6, 1)).to.be.true;
      expect(isNear(-2, 0, 2)).to.be.true;
    });
    it('should return false if value is out of range', function(){
      expect(isNear(6, 5, 0)).to.be.false;
      expect(isNear(8, 5, 2)).to.be.false;
      expect(isNear(-3, 0, 2)).to.be.false;
    });
    it('should return true if no threshold is given', function(){
      expect(isNear(5, 5)).to.be.true;
    });
  });

  describe('sum()', function(){
    var sum = utils.sum;
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
      expect((function() { return utils.sum(arguments); }(1,2,3))).to.equal(6);
    });
  });

  describe('walk()', function(){
    var walk = utils.walk;
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
    var deepForEach = utils.deepForEach;
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

  describe('replaceAll()', function(){
    var replaceAll = utils.replaceAll;
    var phrase = 'the quick brown fox is quick and brown';
    it('should replace the search string with the replace string', function(){
      expect(replaceAll(phrase, 'quick', 'slow')).to.equal('the slow brown fox is slow and brown');
    });
    it('should replace multiple search strings with an object map of replacements', function(){
      expect(replaceAll(phrase, {
          'quick': 'slow',
          'brown': 'red'
        })).to.equal('the slow red fox is slow and red');
    });
    it('should return the original string if no search is provided', function(){
      expect(replaceAll(phrase)).to.equal(phrase);
    });
  });

  describe('rgbToHex()', function(){
    var rgbToHex = utils.rgbToHex;
    it('should return correct hex color value when separate arguments are used', function(){
      expect(rgbToHex(255,255,255)).to.equal('#ffffff');
      expect(rgbToHex(0,0,0)).to.equal('#000000');
      expect(rgbToHex(0,128,64)).to.equal('#008040');
    });
    it('should return correct hex color value when single object argument is used', function(){
      expect(rgbToHex({r:255,g:255,b:255})).to.equal('#ffffff');
      expect(rgbToHex({r:0,g:0,b:0})).to.equal('#000000');
      expect(rgbToHex({r:0,g:128,b:64})).to.equal('#008040');
    });
  });

  describe('hexToRgb()', function(){
    var hexToRgb = utils.hexToRgb;
    it('should return correct rgb colors for short 3-digit hex value', function(){
      expect(hexToRgb('#fff')).to.eql({r:255,g:255,b:255});
      expect(hexToRgb('#000')).to.eql({r:0,g:0,b:0});
      expect(hexToRgb('#084')).to.eql({r:0,g:136,b:68});
    });
    it('should return correct rgb colors for full 6-digit hex value', function(){
      expect(hexToRgb('#ffffff')).to.eql({r:255,g:255,b:255});
      expect(hexToRgb('#000000')).to.eql({r:0,g:0,b:0});
      expect(hexToRgb('#008844')).to.eql({r:0,g:136,b:68});
    });
    it('should return correct rgb colors when hex has no leading hash', function(){
      expect(hexToRgb('ffffff')).to.eql({r:255,g:255,b:255});
      expect(hexToRgb('000')).to.eql({r:0,g:0,b:0});
    });
  });

});
