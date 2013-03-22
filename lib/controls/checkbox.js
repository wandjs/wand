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

      postInitialize: function(options){

        this.config.checkedClass = options.config.checkedClass ? options.config.checkedClass : 'checked';

        //TODO get this from the html or from config and set html?
        this.checked = false;
      },

      setValue: function(value){
        this.value = value;
      },

      getValue: function(){
        return this.value;
      },

      refreshView: function() {
        
        // if(this.hasModel()) {

        // } else {

        // }

        if(this.value) {
          this.$el.prop('checked', true);
          this.$el.addClass(this.config.checkedClass);
        } else {
          this.$el.prop('checked', false);
          this.$el.removeClass(this.config.checkedClass);
        }


        // // Set the styles
        // if(this.getModelValue()) {
        //   this.$el.addClass('checked');
        // } else {
        //   this.$el.removeClass('checked');
        // }
      },

      onTap: function(event)
      {
        this.setValue(!this.getValue());

        // Make sure the target of the click wasn't a nested anchor, which would be acting as
        // an external link to a privacy policy or something similar.
        if (event.target.nodeName.toLowerCase() !== 'a') {
          // event.preventDefault();


          // if(this.hasModel()) {
          //   //Toggle the checked value
          //   this.setModelValue(!this.getModelValue());
          // } else {
          //   this.value = !this.value;
          // }

          

          
        }

        this.triggerChange();

        this.refreshView();
      }

    });
  }
);