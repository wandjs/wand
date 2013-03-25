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
        'click': 'onFocusIn'
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

        return this.$el.attr('data-visited') == 'true';
      },

      focus: function()
      {
        this.$input.focus();
        this.onFocusIn();
      },

      onKeyUp: function(event)
      {
        //this.setValue(this.$input.val());
        this.value = this.$input.val();

        if (event.which === 13) {
          this.trigger('enterKeyPressed');
        }

        this.debouncedKeyUp();
      },

      onFocusIn: function()
      {
        this.isVisited(true);
      },

      onDebouncedKeyUp: function()
      {
        if(this.hasBinding())
        {
          this.setModelValueFromLocalValue();
        }
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
      }
    });
  }
);