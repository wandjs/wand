if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  
  var _ = require('underscore');
  var BaseControl = require('./BaseControl');

  return BaseControl.extend({

    initialize: function() {
      // Redefining event handlers to be self bound 
      this.onChange = _.bind(this.onChange, this);

      // Define the default control element selector
      this.controlElementTypeSelector = 'select';

      // Call initialize in the super class
      BaseControl.prototype.initialize.apply(this, arguments);
    },
    
    startListeningToControlElements: function() {
      this.getControlElement().on('change', this.onChange);
    },

    stopListeningToControlElements: function() {
      this.getControlElement().off('change', this.onChange);
    },

    refreshView: function() {
      this.$el.val(this.getValue());
    },

    onChange: function() {
      this.setValue(this.$el.val());
    }
  });
});
