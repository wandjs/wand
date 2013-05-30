if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var math = {};

  // Clamps value inside range.
  math.clamp = function(value, min, max) {
    return value < min ? min : (value > max ? max : value);
  };

  // Rounds value to a given precision in decimal places. Precision can be
  // between 0 and 20. Shortcuts to Math.round if precision isn't specified.
  math.round = function(value, precision) {
    if (!precision) return Math.round(value);
    return parseFloat(value.toFixed(precision));
  };

  // Rounds value to the nearest multiple. Will round to the nearest whole
  // number if multiple isn't specified.
  math.roundTo = function(value, multiple) {
    multiple = multiple || 1;
    return Math.round(value / multiple) * multiple;
  };

  // Positive modulo. Returns a positive result from negative modulo operation.
  // In javascript the result of the modulo operation (%) has the same sign as
  // the dividend (a), this function ensures the result has the same sign as
  // the divisor (n). http://en.wikipedia.org/wiki/Modulo_operation
  math.pmod = function(a, n) {
    return a - (n * Math.floor(a/n));
  };

  // Returns the sign of the value, 1 for positive numbers, -1 for negative,
  // and 0 for 0.
  math.sign = function(value) {
    if (isNaN(value)) return value;
    return value === 0 ? 0 : (value < 0 ? -1 : 1);
  };

  // Linear interpolation. Returns an interpolated value between the ranges.
  math.lerp = function(ratio, start, end) {
    return start + (end - start) * ratio;
  };

  // Normalizes value. Returns the ratio of the value inside the range.
  math.norm = function(value, min, max){
    return (value - min) / (max - min);
  };

  // Returns a number along one scale in another scale.
  math.scale = function(value, inMin, inMax, outMin, outMax) {
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
  };

  // Loops the value inside the range. If value is less than min it returns
  // max, and if it's greater than max it returns min.
  math.loop = function(value, min, max){
    return value < min ? max : (value > max ? min : value);
  };

  // Checks if value is within the specified range, with optional threshold.
  math.inRange = function(value, min, max, threshold) {
    threshold = threshold || 0;
    return value + threshold >= min && value - threshold <= max;
  };

  // Checks if value is near a target and within threshold.
  math.isNear = function(value, target, threshold){
    threshold = threshold || 0;
    return Math.abs(value - target) <= threshold;
  };

  module.exports = math;
});
