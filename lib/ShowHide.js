if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var _ = require('underscore');
  var $ = require('jquery');

  module.exports = {

    transitionInDuration: 300,
    transitionOutDuration: 300,

    setTransitionState: function(transitionState){
      this.transitionState = transitionState;
      this.trigger('transitionStateChange', this.transitionState);
    },

    show: function(doImmediately)
    {
      return doImmediately ? this.showImmediately() : this.showWithTransition();
    },

    showWithTransition: function()
    {
      var self = this;

      this.onPreShowStart();

      return $.when(
        this.$el
        .stop()
        .css(
          {
            'display': 'block'
          }
        )
        .animate(
          {
            opacity: 1
          },
          {
            duration: this.transitionInDuration
          }
        )
        .queue(
          function()
          {
            self.$el.dequeue();
            self.onPreShowComplete();
          }
        )
      );
    },

    showImmediately: function()
    {
      var self = this;

      this.onPreShowStart();

      return $.when(
        this.$el
        .queue(
          function()
          {
            self.$el.css(
              {
                opacity: 1,
                display: 'block'
              }
            );

            self.$el.dequeue();
            self.onPreShowComplete();
          }
        )
      );
    },

    onPreShowStart: function(){
      this.setTransitionState('showing');
      this.onShowStart();

      if(this.trigger){
        this.trigger('showStart');
      }
    },

    onShowStart: function(){
      // Override in mixin target.
    },

    onPreShowComplete: function()
    {
      this.setTransitionState('shown');
      this.onShowComplete();

      if(this.trigger){
        this.trigger('showComplete');
      }
    },

    onShowComplete: function()
    {
      // Override in mixin target.
    },

    hide: function(doImmediately)
    {
      return doImmediately ? this._hideImmediately() : this._hideTransition();
    },

    _hideTransition: function()
    {
      var self = this;
      
      this.onPreHideStart()

      return $.when(

        this.$el
          .stop()
          .animate(
            {
              opacity: 0
            },
            {
              duration: this.transitionOutDuration
            }
          )
          .queue(
            function()
            {
              self.$el.css(
                {
                  'display': 'none'
                }
              );
              
              self.$el.dequeue();
              self.onPreHideComplete();
            }
          )
      );
    },

    _hideImmediately: function()
    {
      var self = this;

      this.onPreHideStart();

      return $.when(
        this.$el
        .queue(
          function()
          {
            self.$el.css(
              {
                opacity: 0,
                display: 'none'
              }
            );

            self.$el.dequeue();
            self.onPreHideComplete();
          }
        )
      );
    },

    onPreHideStart: function(){
      this.setTransitionState('hiding');
      this.onHideStart();
      
      if(this.trigger){
        this.trigger('hideStart');
      }
    },

    onHideStart: function(){
      // Override in mixin target
    },

    onPreHideComplete: function()
    {
      this.setTransitionState('hidden');
      this.onHideComplete();
      
      if(this.trigger){
        this.trigger('hideComplete');
      }
    },

    onHideComplete: function()
    {
      // Override in mixin target
    }

  }

});