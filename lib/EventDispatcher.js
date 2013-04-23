if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var BaseClass = require('./BaseClass');

  var EventDispatcher = BaseClass.extend({});

  _.extend(EventDispatcher.prototype, Backbone.Events);

  return EventDispatcher;
});
