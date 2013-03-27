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
  return BaseControl.extend(
  {
    events:
    {
      // 'keydown input[type=text], input[type=password]': 'onKeyUp',
      'keyup': 'onKeyUp',
      'focus': 'onFocus',
      'blur': 'onBlur'
    },

    initialize: function(options)
    {

      //TODO Add an extra option to define selector for input in case the el is a wrapper?
      this.$input = this.$el;

      BaseControl.prototype.initialize.apply(this, arguments);

      this.options.debounceDuration = options.debounceDuration ? options.debounceDuration : 500;

      this.debouncedKeyUp = _.debounce(_.bind(this.onDebouncedKeyUp, this), this.options.debounceDuration);
    },

    getTextField: function()
    {
      return this.$input;
    },

    refreshView: function()
    {
      this.$input.val(this.value);
    },

    isVisited: function(isVisited)
    {
      if(isVisited)
      {
        this.$el.attr('data-visited', isVisited);
      }

      return this.$el.attr('data-visited') === 'true';
    },

    focus: function()
    {
      this.$input.focus();
      this.onFocusIn();
    },

    enable: function()
    {
      this.$input.prop('disabled', false);
      BaseControl.prototype.enable.call(this);
    },

    disable: function()
    {
      this.$input.prop('disabled', true);
      BaseControl.prototype.disable.call(this);
    },

    // Handles key up when focussed
    onKeyUp: function(event)
    {
      this.value = this.$input.val();

      // If the user presses enter, flush the local value into the model, 
      // as this action may also trigger the form to submit
      if (event.which === 13) {
        this.setModelValueFromLocalValue();
      }

      this.debouncedKeyUp();
    },

    // Handles the user beginning interaction with the control instance
    onFocus: function()
    {
      // When the control becomes focussed, mark it as visited
      this.isVisited(true);
    },
    
    // Handles the user ceasing interaction with the control instance
    onBlur: function()
    {
      // When the user defocuses the controls the local value should be flushed
      // to the model as user interaction is complete
      this.setModelValueFromLocalValue();
    },

    onDebouncedKeyUp: function()
    {
      if(this.hasBinding())
      {
        this.setModelValueFromLocalValue();
      }
    }
  });
});