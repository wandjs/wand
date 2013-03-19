if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var _ = require('underscore');

  var utils = {};

  // Clamps value inside range.
  utils.clamp = function(value, min, max) {
    return value < min ? min : (value > max ? max : value);
  };

  // Rounds value to a given precision in decimal places. Precision can be
  // between 0 and 20. Shortcuts to Math.round if precision isn't specified.
  utils.round = function(value, precision) {
    if (!precision) return Math.round(value);
    return parseFloat(value.toFixed(precision));
  };

  // Rounds value to the nearest multiple. Will round to the nearest whole
  // number if multiple isn't specified.
  utils.roundTo = function(value, multiple) {
    multiple = multiple || 1;
    return Math.round(value / multiple) * multiple;
  };

  // Positive modulo. Returns a positive result from negative modulo operation.
  // In javascript the result of the modulo operation (%) has the same sign as
  // the dividend (a), this function ensures the result has the same sign as
  // the divisor (n). http://en.wikipedia.org/wiki/Modulo_operation
  utils.pmod = function(a, n) {
    return a - (n * Math.floor(a/n));
  };

  // Returns the sign of the value, 1 for positive numbers, -1 for negative,
  // and 0 for 0.
  utils.sign = function(value) {
    if (isNaN(value)) return value;
    return value === 0 ? 0 : (value < 0 ? -1 : 1);
  };

  // Linear interpolation. Returns an interpolated value between the ranges.
  utils.lerp = function(ratio, start, end) {
    return start + (end - start) * ratio;
  };

  // Normalizes value. Returns the ratio of the value inside the range.
  utils.norm = function(value, min, max){
    return (value - min) / (max - min);
  };

  // Returns a number along one scale in another scale.
  utils.scale = function(value, inMin, inMax, outMin, outMax) {
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
  };

  // Loops the value inside the range. If value is less than min it returns
  // max, and if it's greater than max it returns min.
  utils.loop = function(value, min, max){
    return value < min ? max : (value > max ? min : value);
  };

  // Checks if value is within the specified range, with optional threshold.
  utils.inRange = function(value, min, max, threshold) {
    threshold = threshold || 0;
    return value + threshold >= min && value - threshold <= max;
  };

  // Checks if value is near a target and within threshold.
  utils.isNear = function(value, target, threshold){
    threshold = threshold || 0;
    return Math.abs(value - target) <= threshold;
  };

  // Gets a property value inside a complex object using path notation.
  // The path can be either a string 'a.b.c', or an array ['a','b','c']
  utils.walk = function(obj, path) {
    if (typeof path === 'string') {
      path = path.split('.');
    }
    while (obj && path && path.length) {
      obj = obj[path.shift()];
    }
    return obj;
  };

  // Adds together an array of numbers. If key is specified it will add together
  // the property values on each object in the array.
  utils.sum = function(obj, key) {
    return _.reduce(obj, function(memo, value) {
      return memo + (key ? value[key] : value);
    }, 0);
  };

  // Depth-first recursive iterator for object properties. Iterates over both
  // complex objects and arrays. Note that the actual nested objects will also
  // be passed to the iterator, so you might want to check object type inside.
  utils.deepEach = utils.deepForEach = function(obj, iterator, context) {
    _(obj).forEach(function(value, key, obj) {
      iterator.call(context, value, key, obj);
      // Functions have a length, defined by the number of arguments, but we
      // don't want to iterate over them.
      if (_.isObject(value) && !_.isFunction(value)) {
        utils.deepEach(value, iterator, context);
      }
    });
  };

  // Replaces all instances of a search term in a string.
  // You can alternatively call this function with an object for the search
  // argument, allowing you to specify multiple replacements. The object's
  // key:value properties should map to the search:replace strings, eg:
  // replaceAll('quick brown fox', {'quick':'slow', 'brown':'red'});
  utils.replaceAll = function(string, search, replace) {
    // If search isn't a string then assume it's an object map
    if (typeof search !== 'string') {
      var result = string;
      _(search).forEach(function(value, key) {
        result = result.split(key).join(value);
      });
      return result;
    } else {
      return string.split(search).join(replace);
    }
  };

  // Convert 8 bit rgb color values into a hex color value. You can also pass a
  // single object to the function that specifies the colors as 3 separate
  // keys, eg: rgbToHex({r:255, g:0, b:128})
  utils.rgbToHex = function(r, g, b) {
    if (typeof r === 'object') {
      b = r.b;
      g = r.g;
      r = r.r;
    }
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).substr(1);
  };

  // Convert hex color to 8 bit rgb values, returned as an object with 3 keys.
  // Accepts both short (3-digit) and full (6-digit) hex colors, and optional
  // leading hash (#).
  utils.hexToRgb = function(hex) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split(''); // Only ES5 can access chars by array index
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16)
    };
  };

  // Removes all properties of an object, or items in an array.
  utils.empty = function(obj){
    if(obj instanceof Array){
      obj.length = 0;
    } else {
      _(obj).forEach(function(value, key) {
        delete obj[key];
      });
    }
  };

  module.exports = utils;
});
