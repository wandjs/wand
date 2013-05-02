if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var _ = require('underscore');

  var utils = {};

  utils.color = require('./utils/Color.js');
  utils.math = require('./utils/Math.js');
  utils.object = require('./utils/Object.js');
  utils.string = require('./utils/String.js');

  module.exports = utils;
});
