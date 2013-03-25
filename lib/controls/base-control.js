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

      initialize: function(options){

        if(options){

        }


        ///////////////////////////

        // Define a bound version of onModelChange so it can be removed later on
        this.boundModelChange = _.bind(this.onModelChange, this);

        if(this.hasBinding())
        {

          if(this.options.binding.direction == 'bidirectional' || this.options.binding.direction == 'modelToView') {
            this.setLocalValueFromModelValue(true);
            this.options.binding.model.on('change:' + this.options.binding.property, this.boundModelChange);
          } else if(this.options.binding.direction == 'viewToModel') {
            this.setModelValueFromLocalValue();
          }

        } else {

          if(this.options.initialValue)
          {
            this.setValue(this.options.initialValue, true);
          }

        }

        ///////////////////////////

      },

      // configure: function(config)
      // {
      //   this.config = config;
      //   this.refreshView();
      // },

      refreshView: function()
      {
        // If necessary this should be overidden in subclasses
      },

      triggerChange: function()
      {
        // Trigger change handlers if present
        if(this.options.change)
        {
          this.options.change(this.value);
        }

        this.trigger(
          "change",
          {
            value: this.getValue()
          }
        );
      },

      

      setValue: function(value, suppressChangeEvent) {

          // Only set the value if it has changed
          if(this.value != value)
          {
            this.value = value;
            
            if(this.hasBinding() && (this.options.binding.direction == 'viewToModel' || this.options.binding.direction == 'bidirectional'))
            {
              this.setModelValueFromLocalValue();
            }

            if(!suppressChangeEvent)
            {
              this.triggerChange();  
            }
            
            this.refreshView();  
          }
      },

      getValue: function() {
          return this.value;
      },

      enable: function()
      {
        this.$el.removeClass("disabled");
      },

      disable: function()
      {
        this.$el.addClass("disabled");
      },






      //////////////////////////






      

      refreshModelListener: function() {
        var model = this.getModel();

        model.off(this.options.binding.model, boundModelChange);

        if(model instanceof Backbone.Model)
        {
          model.on(this.options.binding.model, boundModelChange);
        }
      },

      onModelChange: function(event) {
        if(this.options.binding.direction == 'bidirectional' || this.options.binding.direction == 'modelToView') {
          this.setLocalValueFromModelValue();  
        }
        
      },

      hasBinding: function() {
        return !!this.options.binding;
      },

      getModel: function() {
        return this.options.binding.model;
      },

      // Returns the value of the model, accounting for whether or not its a Backbone.Model or standard Object
      getModelValue: function() {
        if(this.hasBinding())
        {
          if(this.options.binding.model instanceof Backbone.Model)
          {
            return this.options.binding.model.get(this.options.binding.property);
          }
          else
          {
            return this.options.binding.model[this.options.binding.property];
          }
        }

        return null;
      },

      // Sets the value of the model, accounting for whether or not its a Backbone.Model or standard Object
      setModelValue: function(value) {
        if(this.hasBinding())
        {
          if(this.options.binding.model instanceof Backbone.Model)
          {
            this.options.binding.model.set(this.options.binding.property, value);
          }
          else
          {
            this.options.binding.model[this.options.binding.property] = value;
          }
        }
        else
        {
          // console.log('Warning: Trying to set the value of a model that doesn\'t exist');
        }
      },

      setModelValueFromLocalValue: function() {
        this.setModelValue(this.getValue());
      },

      setLocalValueFromModelValue: function(suppressChangeEvent) {
        this.setValue(this.getModelValue(), suppressChangeEvent);
      }

    });
  }
);