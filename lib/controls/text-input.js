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
        this.config.initialValue = options.config.initialValue ? options.config.initialValue : '';
      },

      refreshView: function() {
        
        
      }

    });
  }
);