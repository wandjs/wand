if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var utils = {};

  utils.collection = require('./utils/Collection');
  utils.color = require('./utils/Color');
  utils.math = require('./utils/Math');
  utils.object = require('./utils/Object');
  utils.string = require('./utils/String');

  module.exports = utils;
});
