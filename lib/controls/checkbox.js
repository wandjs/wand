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
        BaseControl.prototype.initialize.apply(this, arguments);

        this.config.checkedClass = options.config.checkedClass ? options.config.checkedClass : 'checked';
        this.config.initialValue = options.config.initialValue ? options.config.initialValue : false;
      },

      refreshView: function() {
        
        if(this.value) {
          this.$el.prop('checked', true);
          this.$el.addClass(this.config.checkedClass);
        } else {
          this.$el.prop('checked', false);
          this.$el.removeClass(this.config.checkedClass);
        }
      },

      onTap: function(event)
      {
        // Make sure the target of the click wasn't a nested anchor, which would be acting as
        // an external link to a privacy policy or something similar.
        if (event.target.nodeName.toLowerCase() !== 'a') {
          // event.preventDefault();

          if(this.hasBinding() && this.config.binding.direction == 'bidirectional' || this.config.binding.direction == 'modelToView') {
            this.setModelValue(!this.getModelValue());
          } else {
            this.setValue(!this.getValue());
          }
          
        }
      }

    });
  }
);