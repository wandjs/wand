if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var $ = require('jquery');

  module.exports = {

    showTransitionDuration: 300,
    hideTransitionDuration: 300,

    getTransitionableDOMElement: function(){
      return !!this.transionableElement ? this.transionableElement : this.$el;
    },

    setTransitionState: function(transitionState){
      this.transitionState = transitionState;
      this.trigger('transitionStateChange', this.transitionState);
    },

    show: function(doImmediately)
    {
      return doImmediately ? this.showWithoutTransition() : this.showWithTransition();
    },

    showWithTransition: function()
    {
      var self = this;

      this.onPreShowStart();

      return $.when(
        this.getTransitionableDOMElement()
        .stop()
        .css({
          'display': 'block'
        })
        .animate(
          {
            opacity: 1
          },
          {
            duration: this.showTransitionDuration
          }
        )
        .queue(
          function()
          {
            self.getTransitionableDOMElement().dequeue();
            self.onPreShowComplete();
          }
        )
      );
    },

    showWithoutTransition: function()
    {
      var self = this;

      this.onPreShowStart();

      return $.when(
        this.getTransitionableDOMElement()
        .queue(
          function()
          {
            self.getTransitionableDOMElement().css(
              {
                opacity: 1,
                display: 'block'
              }
            );

            self.getTransitionableDOMElement().dequeue();
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
      return doImmediately ? this.hideWithoutTransition() : this.hideWithTransition();
    },

    hideWithTransition: function()
    {
      var self = this;
      
      this.onPreHideStart();

      return $.when(
        this.getTransitionableDOMElement()
        .stop()
        .animate(
          {
            opacity: 0
          },
          {
            duration: this.hideTransitionDuration
          }
        )
        .queue(
          function()
          {
            self.getTransitionableDOMElement().css(
              {
                'display': 'none'
              }
            );
            
            self.getTransitionableDOMElement().dequeue();
            self.onPreHideComplete();
          }
        )
      );
    },

    hideWithoutTransition: function()
    {
      var self = this;

      this.onPreHideStart();

      return $.when(
        this.getTransitionableDOMElement()
        .queue(
          function()
          {
            self.getTransitionableDOMElement().css(
              {
                opacity: 0,
                display: 'none'
              }
            );

            self.getTransitionableDOMElement().dequeue();
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
  };
});