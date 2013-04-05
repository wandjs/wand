if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var _ = require('underscore');
  var EventDispatcher = require('../event-dispatcher');

  module.exports = EventDispatcher.extend({

    initialize:function(options){
      
    }

  });

});