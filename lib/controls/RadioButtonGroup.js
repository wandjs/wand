if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  
  var $ = require('jquery');
  var _ = require('underscore');
  var BaseControl = require('./BaseControl');

  return BaseControl.extend({

    initialize: function(){
      // Redefining event handlers to be self bound 
      this.onChange = _.bind(this.onChange, this);

      // Define the default control element selector
      this.controlElementTypeSelector = 'input[type=radio]';

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
      // Iterate over each item and check the one that matches the current value
      _.each(
        this.$el,
        function(item){
          if (String($(item).val()) === String(this.getValue())) {
            $(item).prop('checked', true);
          }
        },
        this
      );
    },

    onChange: function(event) {
      this.setValue($(event.target).val());
    }
  });
});
