var expect = require('chai').expect;
var MathUtils = require('../../lib/utils/Math');

describe('Math', function(){

  describe('round()', function(){
    var round = MathUtils.round;
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
    var roundTo = MathUtils.roundTo;
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
    var clamp = MathUtils.clamp;
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
    var pmod = MathUtils.pmod;
    it('should return value with same sign as the divisor', function(){
      expect(pmod(-10, 7)).to.equal(4);
      expect(pmod(10, -7)).to.equal(-4);
      expect(pmod(-10, -7)).to.equal(-3);
    });
  });

  describe('sign()', function(){
    var sign = MathUtils.sign;
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
    var lerp = MathUtils.lerp;
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
    var norm = MathUtils.norm;
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
    var scale = MathUtils.scale;
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
    var loop = MathUtils.loop;
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
    var inRange = MathUtils.inRange;
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
    var isNear = MathUtils.isNear;
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
});