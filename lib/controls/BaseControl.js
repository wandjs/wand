if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  
  var _ = require('underscore');
  var Backbone = require('backbone');
  var BaseView = require('../BaseView');
  
  return BaseView.extend({

    initialize: function(options) {
      // Set default name for disabledClass
      this.options.disabledClassName = options.disabledClassName ? options.disabledClassName : 'disabled';

      // Define a bound version of onModelChange so it can be removed later on
      this.boundModelChange = _.bind(this.onModelChange, this);

      // Set up binding if an option is specified
      if (this.hasBinding()) {
        var direction = this.options.binding.direction;

        if (direction === 'bidirectional' || direction === 'modelToView') {
          this.setLocalValueFromModelValue(true);
          this.refreshModelListener();
        } else if (direction === 'viewToModel') {
          this.setModelValueFromLocalValue();
        }
      } else {
        if (this.options.initialValue) {
          this.setValue(this.options.initialValue, true);
        }
      }

      this.startListeningToControlElements();
    },

    refreshView: function()
    {
      // If necessary this should be overidden in subclasses
    },

    // Causes a change event to be triggered from the instance, and the
    // change method passed in during construction to be called if present
    triggerChange: function() {
      // Trigger change handler if present
      if (this.options.change) {
        this.options.change(this.value);
      }

      // Always trigger change event
      this.trigger(
        "change",
        {
          value: this.getValue()
        }
      );
    },

    // Sets the local value of the instance and flushes values into the model if
    // viewToModel or bidrectional binding are specified
    setValue: function(value, suppressChangeEvent) {
      // Only set the value if it has changed
      if (this.value !== value) {
        this.value = value;
        var direction = this.options.binding.direction;

        if (this.hasBinding() && (direction === 'viewToModel' || direction === 'bidirectional')) {
          this.setModelValueFromLocalValue();
        }
        if (!suppressChangeEvent) {
          this.triggerChange();  
        }
        this.refreshView();  
      }
    },

    getValue: function() {
      return this.value;
    },

    enable: function() {
      this.$el.removeClass("disabled");
    },

    disable: function() {
      this.$el.addClass("disabled");
    },

    //////////////////////////
    // Deeper nested controls

    startListeningToControlElements: function() {
      // This should be overidden in sub classes
    },

    stopListeningToControlElements: function() {
      // This should be overidden in sub classes
    },

    getControlElement: function() {
      var checkboxElement;
      if (this.options.controlElement) {
        checkboxElement = this.options.controlElement;
      } else {
        if (this.$el.is(this.controlElementTypeSelector)) {
          checkboxElement = this.$el;
        } else {
          checkboxElement = this.$el.find(this.controlElementTypeSelector);
        }
      }
      return checkboxElement;
    },

    //////////////////////////
    // Model binding
    
    // Listens for model changes, cancelling previous listeners if necessary.
    refreshModelListener: function() {
      var model = this.options.binding.model;
      var property = this.options.binding.property;

      model.off('change:' + property, this.boundModelChange);

      if (model instanceof Backbone.Model) {
        model.on('change:' + property, this.boundModelChange);
      }
    },

    // Returns true if a binding option is present or false if not
    hasBinding: function() {
      return !!this.options.binding;
    },

    // Returns the value of the model, accounting for whether or not its a Backbone.Model or standard Object
    getModelValue: function() {
      if (this.hasBinding()) {
        if (this.options.binding.model instanceof Backbone.Model) {
          return this.options.binding.model.get(this.options.binding.property);
        } else {
          return this.options.binding.model[this.options.binding.property];
        }
      }

      return null;
    },

    // Sets the value of the model, accounting for whether or not its a Backbone.Model or standard Object
    setModelValue: function(value) {
      if (this.hasBinding()) {
        if (this.options.binding.model instanceof Backbone.Model)
        {
          this.options.binding.model.set(this.options.binding.property, value);
        } else {
          this.options.binding.model[this.options.binding.property] = value;
        }
      }
    },

    // Sets the model value from the local value
    setModelValueFromLocalValue: function() {
      this.setModelValue(this.getValue());
    },

    // Sets the local value from the model value, supressing the change event if specified
    setLocalValueFromModelValue: function(suppressChangeEvent) {
      this.setValue(this.getModelValue(), suppressChangeEvent);
    },

    // Event handler for model changes
    onModelChange: function() {
      if (this.options.binding.direction === 'bidirectional' || this.options.binding.direction === 'modelToView') {
        this.setLocalValueFromModelValue();  
      }
    }
  });
});
