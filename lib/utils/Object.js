if (typeof define !== 'function') { var define = require('amdefine')(module); }

var _ = require('underscore');

define(function(require, exports, module) {
  var object = {};

  // Gets a property value inside a complex object using path notation.
  // The path can be either a string 'a.b.c', or an array ['a','b','c']
  object.walk = function(obj, path) {
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
  object.sum = function(obj, key) {
    return _.reduce(obj, function(memo, value) {
      return memo + (key ? value[key] : value);
    }, 0);
  };

  // Depth-first recursive iterator for object properties. Iterates over both
  // complex objects and arrays. Note that the actual nested objects will also
  // be passed to the iterator, so you might want to check object type inside.
  object.deepEach = object.deepForEach = function(obj, iterator, context) {
    _(obj).forEach(function(value, key, obj) {
      iterator.call(context, value, key, obj);
      // Functions have a length, defined by the number of arguments, but we
      // don't want to iterate over them.
      if (_.isObject(value) && !_.isFunction(value)) {
        object.deepEach(value, iterator, context);
      }
    });
  };

  // Removes all properties of an object, or elements in an array.
  object.empty = function(obj) {
    if (obj instanceof Array) {
      obj.length = 0;
    } else {
      _(obj).forEach(function(value, key) {
        delete obj[key];
      });
    }
    return obj;
  };

  var baseConstructor = function() {};

  // Returns a constructor function that can be used to create instances of a
  // objects. It helps set up the prototype chain to create a class-like
  // inheritance hierarchy.
  // An optional 'parentConstructor' argument can be specified for inheritance,
  // this must be another constructor function.
  // The 'details' argument is an object whose properties will be copied onto
  // the new constructor function's prototype. This means they become part of
  // the prototype chain hierarchy, simulating class-like inheritance.
  // The details object can have an optional 'constructor' property, which is a
  // function that acts as the constructor function returned by this method:
  //   var Dog = createClass(Animal, {
  //     constructor: function() {}
  //   })
  // Two forms of the createClass function can be called:
  //   var Dog = createClass(Animal, {}) // Dog inherits from Animal
  //   var Dog = createClass({}) // Dog has no inheritance
  object.createSubclass = object.createClass = function(parentConstructor, details) {
    // If parentConstructor is an object then assume it's the second form of
    // the function call, meaning no inheritance was specified.
    if (parentConstructor && typeof parentConstructor === 'object') {
      details = parentConstructor;
      parentConstructor = baseConstructor;
    } else if (!parentConstructor) {
      // Also allow the function to be called with no arguments at all.
      // Rare, but permissible, and will return an empty class.
      parentConstructor = baseConstructor;
    }

    // Child is the constructor function that will eventually be returned.
    var Child;
    if (details && details.hasOwnProperty('constructor')) {
      // The user supplied a constructor property in their details object
      // so we'll use that as our constructor function
      Child = details.constructor;
    } else {
      // The user hasn't provided a constructor property so we create one that
      // just calls the parentConstructor function.
      Child = function() { parentConstructor.apply(this, arguments); };
    }

    // The only way to set up a prototype chain is by calling 'new' on a
    // constructor function, however this also runs the function, which
    // we don't want at this stage as we just want to set up inheritance.
    // To get around this we create an anonymous constructor function and copy
    // across the prototype from the parent. This allows us to call 'new' and
    // set the prototype chain, but without calling the parentConstructor.
    var ParentProxy = function() {};
    ParentProxy.prototype = parentConstructor.prototype;
    Child.prototype = new ParentProxy();
    Child.prototype.constructor = Child;

    // Copy across the properties from the details object onto our new
    // constructor's prototype.
    for (var key in details) {
      Child.prototype[key] = details[key];
    }

    return Child;
  };

  // Merges whitelisted properties from one object into another, with optional defaults
  //
  // Simple property list:
  // Utils.mergeOptions(destination, {name: 'Jasper', type: 'Retriever'}, ['name', 'type']); 
  //
  // Property list with defaults:
  // Utils.mergeOptions(destination, {name: 'Fudge', type: 'Terrier'}, {name: null, type: null, numLegs: 4}); 
  object.mergeOptions = function(destination, options, storedOptions) {
    // Default to an empty object here to avoid errors
    options = options ? options : {};

    // Only try to store options if some are specified
    if (storedOptions) {
      if (storedOptions instanceof Array) {
        _.extend(destination, _.pick(options, storedOptions));
      } else if (storedOptions instanceof Object) {
        _.each(
          storedOptions,
          function(value, key) {
            var optionValue = options[key];
            destination[key] = optionValue ? optionValue : value;
          },
          destination
        );
      }
    }
  };

  module.exports = object;
});  