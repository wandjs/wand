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

        if(options && options.config){
          this.configure(options.config);
        }


        ///////////////////////////

        // Define a bound version of onModelChange so it can be removed later on
        this.boundModelChange = _.bind(this.onModelChange, this);

        if(this.hasBinding())
        {

          if(this.config.binding.direction == 'bidirectional' || this.config.binding.direction == 'modelToView') {
            this.setLocalValueFromModelValue(true);
            this.config.binding.model.on('change:' + this.config.binding.property, this.boundModelChange);
          } else if(this.config.binding.direction == 'viewToModel') {
            this.setModelValueFromLocalValue();
          }

        } else {

          if(this.config && this.config.initialValue)
          {
            this.setValue(this.config.initialValue, true);
          }

        }

        ///////////////////////////

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

      

      setValue: function(value, suppressChangeEvent) {

          // Only set the value if it has changed
          if(this.value != value)
          {
            this.value = value;

            if(this.hasBinding() && (this.config.binding.direction == 'viewToModel' || this.config.binding.direction == 'bidirectional'))
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

        model.off(this.config.binding.model, boundModelChange);

        if(model instanceof Backbone.Model)
        {
          model.on(this.config.binding.model, boundModelChange);
        }
      },

      onModelChange: function(event) {
        if(this.config.binding.direction == 'bidirectional' || this.config.binding.direction == 'modelToView') {
          this.setLocalValueFromModelValue();  
        }
        
      },

      hasBinding: function() {
        return !!this.config && this.config.binding;
      },

      getModel: function() {
        return this.config.binding.model;
      },

      // Returns the value of the model, accounting for whether or not its a Backbone.Model or standard Object
      getModelValue: function() {
        if(this.hasBinding())
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
      setModelValue: function(value) {
        if(this.hasBinding())
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

      setModelValueFromLocalValue: function() {
        this.setModelValue(this.getValue());
      },

      setLocalValueFromModelValue: function(suppressChangeEvent) {
        this.setValue(this.getModelValue(), suppressChangeEvent);
      }

    });
  }
);