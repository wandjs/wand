
// A singleton through which system wide events should be dispatched.
// Events can be namespaced through the use of colons as shown below:
//
// EventBus.on('a:start', function(){}); // 1
// EventBus.on('a:stop', function(){});  // 2
// EventBus.on('a', function(){});       // 3
//
// // This will trigger listeners 1 and 3
// EventBus.trigger('a:start');

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(
  [
    'require',
    'underscore',
    'backbone',
    './wand-base-class'
  ],
  function (
    require,
    _,
    Backbone,
    BaseClass
  ) {

    // Create and empty instance and extend it with Backbone.Events
    var instance = _.extend({}, Backbone.Events);

    // Map the trigger method back to a property called standardTrigger
    instance.standardTrigger = instance.trigger;

    instance.trigger = function(eventName){

      var eventNameSplit = eventName.split(':');
      var concatenatedName = '';

      // Iterate over the splite event name, from left to right
      for (var i = 0; i < eventNameSplit.length; i++)
      {
        concatenatedName += (i === 0 ? '' : ':') + eventNameSplit[i];
        this.standardTrigger.call(this, concatenatedName);
      };
    }

    return instance;
});