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
        'change': 'onChange'
      },

      initialize: function(options){
        BaseControl.prototype.initialize.apply(this, arguments);
      },

      refreshView: function() {
        this.$el.val(this.getValue());
      },

      onChange: function(event)
      {
        this.setValue(this.$el.val());
      }

    });
  }
);