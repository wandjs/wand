if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var EventBus = _.extend({}, Backbone.Events);

  // We wrap the original trigger so we can execute code either side.
  var originalTrigger = EventBus.trigger;

  EventBus.trigger = function(name) {
    if (!name) return this;

    // Keep a reference to the extra arguments
    var args = Array.prototype.slice.call(arguments, 1);

    // This triggers an event for each event combined namespace, from deep to
    // shallow. This means more specific event namespaces are triggered first.
    // For example: EventBus.trigger('one:two:three') will trigger 3 events:
    // 'one:two:three', 'one:two', 'one', in that order.
    var namespaces = name.split(':');
    while (namespaces.length) {
      var eventName = namespaces.join(':');
      originalTrigger.apply(this, [eventName].concat(args));
      namespaces.pop();
    }
    return this;
  };

  module.exports = EventBus;
});
