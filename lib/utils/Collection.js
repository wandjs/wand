if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var _ = require('underscore');

  var collectionUtil = {};

  // Gets a property value inside a complex object using path notation.
  // The path can be either a string 'a.b.c', or an array ['a','b','c']
  collectionUtil.walk = function(obj, path) {
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
  collectionUtil.sum = function(obj, key) {
    return _.reduce(obj, function(memo, value) {
      return memo + (key ? value[key] : value);
    }, 0);
  };

  // Depth-first recursive iterator for object properties. Iterates over both
  // complex objects and arrays. Note that the actual nested objects will also
  // be passed to the iterator, so you might want to check object type inside.
  collectionUtil.deepEach = collectionUtil.deepForEach = function(obj, iterator, context) {
    _(obj).forEach(function(value, key, obj) {
      iterator.call(context, value, key, obj);
      // Functions have a length, defined by the number of arguments, but we
      // don't want to iterate over them.
      if (_.isObject(value) && !_.isFunction(value)) {
        collectionUtil.deepEach(value, iterator, context);
      }
    });
  };

  // Removes all properties of an object, or elements in an array.
  collectionUtil.empty = function(obj) {
    if (obj instanceof Array) {
      obj.length = 0;
    } else {
      _(obj).forEach(function(value, key) {
        delete obj[key];
      });
    }
    return obj;
  };


  module.exports = collectionUtil;
});  