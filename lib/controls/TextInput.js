if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  
  var _ = require('underscore');
  var BaseControl = require('./BaseControl');

  return BaseControl.extend(
  {
    initialize: function(options) {
      // Redefining event handlers to be self bound 
      this.onKeyUp = _.bind(this.onKeyUp, this);
      this.onFocus = _.bind(this.onFocus, this);
      this.onBlur = _.bind(this.onBlur, this);

      // Define the default control element selector
      this.controlElementTypeSelector = 'input[type=text]';

      // Set default values
      this.options.debounceDuration = options.debounceDuration ? options.debounceDuration : 500;

      // Create a debounced version of onKeyUp so there is the option to only call setValue
      // once the user has stopped/paused typing
      this.debouncedKeyUp = _.debounce(this.onDebouncedKeyUp, this.options.debounceDuration);

      // Call initialize in the super class
      BaseControl.prototype.initialize.apply(this, arguments);
    },

    startListeningToControlElements: function() {
      this.getControlElement().on('keyup', this.onKeyUp);
      this.getControlElement().on('focus', this.onFocus);
      this.getControlElement().on('blur', this.onBlur);
    },

    stopListeningToControlElements: function() {
      this.getControlElement().off('keyup', this.onKeyUp);
      this.getControlElement().off('focus', this.onFocus);
      this.getControlElement().off('blur', this.onBlur);
    },

    refreshView: function() {
      this.getControlElement().val(this.value);
    },

    isVisited: function(isVisited) {
      if (isVisited) {
        this.$el.attr('data-visited', isVisited);
      }
      return this.$el.attr('data-visited') === 'true';
    },

    focus: function() {
      this.getControlElement().focus();
    },

    enable: function() {
      this.getControlElement().prop('disabled', false);
      BaseControl.prototype.enable.call(this);
    },

    disable: function() {
      this.getControlElement().prop('disabled', true);
      BaseControl.prototype.disable.call(this);
    },

    // Handles key up when focussed
    onKeyUp: function(event) {
      this.value = this.getControlElement().val();

      // If the user presses enter, flush the local value into the model, 
      // as this action may also trigger the form to submit
      if (event.which === 13) {
        this.setModelValueFromLocalValue();
      }

      this.debouncedKeyUp();
    },

    // Handles the user beginning interaction with the control instance
    onFocus: function() {
      // When the control becomes focussed, mark it as visited
      this.isVisited(true);
    },
    
    // Handles the user ceasing interaction with the control instance
    onBlur: function() {
      // When the user defocuses the controls the local value should be flushed
      // to the model as user interaction is complete
      this.setModelValueFromLocalValue();
    },

    onDebouncedKeyUp: function() {
      if (this.hasBinding()) {
        this.setModelValueFromLocalValue();
      }
    }
  });
});
