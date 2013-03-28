define(
  [
    'underscore',
    'backbone',
    '../controls/base-control'
  ],
  function(
    _,
    Backbone,
    BaseControl
  )
  {
    return BaseControl.extend({

      initialize: function() {
        
        // Redefining event handlers to be self bound 
        this.onChange = _.bind(this.onChange, this);

        // Define the default control element selector
        this.controlElementTypeSelector = 'select';

        // Call initialize in the super class
        BaseControl.prototype.initialize.apply(this, arguments);
      },
      
      startListeningToElements: function() {
        this.getControlElement().on('change', this.onChange);
      },

      stopListeningToElements: function() {
        this.getControlElement().off('change', this.onChange);
      },

      refreshView: function() {
        this.$el.val(this.getValue());
      },

      onChange: function() {
        this.setValue(this.$el.val());
      }

    });
  }
);