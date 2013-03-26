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
      _.each(
        this.$el,
        function(item){
          
          // TODO Check this works in all cases... Casting to String used to get around linting issues
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