define(
  [
    'jquery',
    'underscore',
    'backbone',
    '../base-view'
  ],
  function(
    $,
    _,
    Backbone,
    BaseView
  )
  {
    
    

    return Backbone.View.extend(
    {

      initialize: function(options)
      {
        console.log('BaseControl.initialize');

        if(options && options.config)
        {
          this.configure(options.config);
        }

        this.postInitialize(options);
      },

      postInitialize: function(options)
      {
        // Should be overridden in child classes.
      },

      configure: function(config)
      {
        this.config = config;
        this.refreshView();
      },

      refreshView: function()
      {
        // If necessary this should be overidden in subclasses
      },

      triggerChange: function()
      {
        // Trigger change handlers if present
        if(this.config && this.config.change)
        {
          this.config.change(this.value);
        }

        this.trigger(
          "change",
          {
            value: this.getValue()
          }
        );
      },

      hasModel: function(){
        return !!this.config && this.config.binding && this.config.binding.model;
      },

      // Returns the value of the model, accounting for whether or not its a Backbone.Model or standard Object
      getModelValue: function()
      {
        if(this.config)
        {
          if(this.config.binding.model instanceof Backbone.Model)
          {
            return this.config.binding.model.get(this.config.binding.property);
          }
          else
          {
            return this.config.binding.model[this.config.binding.property];
          }
        }

        return null;
      },

      // Sets the value of the model, accounting for whether or not its a Backbone.Model or standard Object
      setModelValue: function(value)
      {
        if(this.config)
        {
          if(this.config.binding.model instanceof Backbone.Model)
          {
            this.config.binding.model.set(this.config.binding.property, value);
          }
          else
          {
            this.config.binding.model[this.config.binding.property] = value;
          }
        }
        else
        {
          // console.log('Warning: Trying to set the value of a model that doesn\'t exist');
        }
      },

      setValue: function(value, suppressChangeEvent) {
          if(this.value != value)
          {
            this.value = value;
            this.refreshView();  
          }
      },

      getValue: function() {
          return this.value;
      },

      setModelValueFromLocalValue: function(){
          
      },

      setLocalValueFromModelValue: function(){
        
      },

      flush: function() {
      },

      enable: function()
      {
        this.$el.removeClass("disabled");
      },

      disable: function()
      {
        this.$el.addClass("disabled");
      }

    });
  }
);