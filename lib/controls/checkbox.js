if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  
  var _ = require('underscore');
  var BaseControl = require('./BaseControl');

  return BaseControl.extend({

    initialize: function(options) {
      // Set default values
      this.options.checkedClass = options.checkedClass ? options.checkedClass : 'checked';
      this.options.initialValue = options.initialValue ? options.initialValue : false;

      // Redefining event handlers to be self bound 
      this.onTap = _.bind(this.onTap, this);

      // Define the default control element selector
      this.controlElementTypeSelector = 'input[type=checkbox]';
      
      // Call initialize in the super class
      BaseControl.prototype.initialize.apply(this, arguments);
    },

    startListeningToControlElements: function() {
      this.getControlElement().on('click', this.onTap);
    },

    stopListeningToControlElements: function(){
      this.getControlElement().off('click', this.onTap);
    },

    refreshView: function() {
      if (this.getValue()) {
        this.$el.prop('checked', true);
        this.$el.addClass(this.options.checkedClass);
      } else {
        this.$el.prop('checked', false);
        this.$el.removeClass(this.options.checkedClass);
      }
    },

    onTap: function(event) {
      // Make sure the target of the click wasn't a nested anchor, which would be acting as
      // an external link to a privacy policy or something similar.
      if (event.target.nodeName.toLowerCase() !== 'a') {
        if (this.hasBinding() && (this.options.binding.direction === 'bidirectional' || this.options.binding.direction === 'modelToView')) {
          this.setModelValue(!this.getModelValue());
        } else {
          this.setValue(!this.getValue());
        }
      }
    }
  });
});
