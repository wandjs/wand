if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var utils = require('./Utils');

  // The basic constructor function that forms the top-most 'class' in the
  // pseudo class creation system.
  var BaseClass = function(options) {
    if (this.initialize) {
      this.initialize.apply(this, arguments);
    }
  };

  // Partially applied function that calls the createClass utility function
  // with the first argument (parentConstructor) pre-filled to be the value
  // of the calling object.
  // This calling object will be whatever object extend() is called on, in
  // most circumstances this will be either BaseClass or a custom subclass:
  //   var Animal = BaseClass.extend({}) // parentConstructor is BaseClass
  //   var Dog = Animal.extend({}) // parentConstructor is Animal
  // The details argument follows the specs laid out in Utils.createClass().
  BaseClass.extend = function(details) {
    var Child = utils.object.createClass(this, details);
    // Ensure the returned constructor function has extend() so you can call
    // it on subclasses.
    Child.extend = BaseClass.extend;
    return Child;
  };

  return BaseClass;
});
