if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var _ = require('underscore');
  var Utils = require('../Utils');
  var EventDispatcher = require('../EventDispatcher');

  module.exports = EventDispatcher.extend({

    storedOptions: ['id', 'path', 'dataType', 'params', 'onStart', 'onComplete'],
    
    constructor: function(options){
      Utils.object.mergeOptions(this, options, this.storedOptions);
      this.initialize(options);
    },

    initialize:function(options){
      this.complete = false;
    },

    getPath: function(){
      return _.result(this, 'path');
    },

    start: function(callback){
      if(callback) {
        callback(null, null, this);  
      }
      
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
