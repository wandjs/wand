define(
[
  'jquery',
  'underscore',
  'backbone',
  '../controls/base-control'
],
function(
  $,
  _,
  Backbone,
  BaseControl
)
{
  return BaseControl.extend({
    events: {
      'change': 'onChange'
    },

    initialize: function(){
      BaseControl.prototype.initialize.apply(this, arguments);
    },

    refreshView: function() {
      // Iterate over each item and check the one that matches the current value
      _.each(
        this.$el,
        function(item){
          if(String($(item).val()) === String(this.getValue()))
          {
            $(item).prop('checked', true);
          }
        },
        this
      );
    },

    onChange: function(event)
    {
      this.setValue($(event.target).val());
    }

  });
});