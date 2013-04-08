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

    storedOptions: ['id', 'path', 'dataType', 'params', 'onStart', 'onComplete'],
    
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
    },

    start: function(){
      this.onStart();
      this.onComplete();
    },

    onStart: function(){
      this.triggerStart();
    },

    onComplete: function(){
      this.triggerComplete();
    },

    onError: function(error){
      this.triggerError(error);
    },

    triggerStart: function(){
      this.trigger('start', { target:this });
    },

    triggerComplete: function(){
      this.trigger('complete', { target:this });
    },

    triggerError: function(error){
      this.trigger('error', { target: this, error: error });
    },

  });

});