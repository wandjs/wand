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
    events: {
      'click': 'onTap'
    },

    initialize: function(options){
      // Set default values
      this.options.checkedClass = options.checkedClass ? options.checkedClass : 'checked';
      this.options.initialValue = options.initialValue ? options.initialValue : false;
      
      BaseControl.prototype.initialize.apply(this, arguments);
    },

    refreshView: function() {
      if(this.getValue()) {
        this.$el.prop('checked', true);
        this.$el.addClass(this.options.checkedClass);
      } else {
        this.$el.prop('checked', false);
        this.$el.removeClass(this.options.checkedClass);
      }
    },

    onTap: function(event)
    {
      // Make sure the target of the click wasn't a nested anchor, which would be acting as
      // an external link to a privacy policy or something similar.
      if (event.target.nodeName.toLowerCase() !== 'a') {
        if(this.hasBinding() && (this.options.binding.direction === 'bidirectional' || this.options.binding.direction === 'modelToView')) {
          
          this.setModelValue(!this.getModelValue());
        } else {
          this.setValue(!this.getValue());
        }
      }
    }

  });
});