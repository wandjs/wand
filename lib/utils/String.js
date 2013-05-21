if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var _ = require('underscore');

  var string = {};

  // Replaces all instances of a search term in a string.
  // You can alternatively call this function with an object for the search
  // argument, allowing you to specify multiple replacements. The object's
  // key:value properties should map to the search:replace strings, eg:
  // replaceAll('quick brown fox', {'quick':'slow', 'brown':'red'});
  string.replaceAll = function(string, search, replace) {
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

  module.exports = string;
});