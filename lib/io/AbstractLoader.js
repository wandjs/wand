if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var _ = require('underscore');
  var EventDispatcher = require('../event-dispatcher');

  module.exports = EventDispatcher.extend({

    //////////////////////////////////////////////////////
    // TODO: Move into BaseClass and automatically call mergeOptions pre initialize

    storedOptions: [],

    mergeOptions: function(options){
      if(this.storedOptions instanceof Array) {
        _.extend(this, _.pick(options, this.storedOptions));
      } else if(this.storedOptions instanceof Object) {
        _.each(
          this.storedOptions,
          function(value, key) {
            var optionValue = options[key];
            this[key] = optionValue ? optionValue : value;
          },
          this
        );
      }
      
    },

    //////////////////////////////////////////////////////
    
    constructor: function(options){
      
      if(options && this.storedOptions) {
        this.mergeOptions(options);
      }
      
      this.initialize(options);
    },

    initialize:function(options){
      
      
      this.complete = false;
    },

    getPath: function(){
      return _.result(this, 'path');
    }

  });

});