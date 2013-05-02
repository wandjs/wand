if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var color = {};

  // Convert 8 bit rgb color values into a hex color value. You can also pass a
  // single object to the function that specifies the colors as 3 separate
  // keys, eg: rgbToHex({r:255, g:0, b:128})
  color.rgbToHex = function(r, g, b) {
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
  color.hexToRgb = function(hex) {
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

  module.exports = color;
});