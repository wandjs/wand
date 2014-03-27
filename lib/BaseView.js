if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  // Taken from Backbone.View
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;
  var tapEvent = "touchup" in window ? "touchup" : "click";

  var BaseView = Backbone.View.extend({
    
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];

        if(eventName === 'tap') {
          eventName = tapEvent;
        }

        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    processRender: function(){
      this.beforeRender();
      var renderReturn = this.render();
      this.updateElements();
      this.afterRender();
      return renderReturn;
    },

    beforeRender: function(){
    },

    afterRender: function(){
    },

    // Default render simply injects the template directly into View.$el
    render: function() {
      var template = this.template;
      if (template) {
        // Normally a template function has at least one argument: template data.
        // If the template property is a function with no arguments then assume
        // it's a function that returns the template function.
        if (!template.length) {
          template = template();
        }
        this.$el.html(template(_.result(this, 'templateData')));
      }
      return this;
    },
    
    // Updates the cached references to DOM elements in the view
    updateElements: function() {
      _.forEach(_.result(this, 'elements'), function(selector, key) {
        this[key] = this.$(selector);
      }, this);
    },

    remove: function() {
      // Delete references to the cached element selectors
      _.forEach(_.result(this, 'elements'), function(selector, key) {
        delete this[key];
      }, this);
      return Backbone.View.prototype.remove.call(this);
    }

  });

  // Proxy a subset of jQuery DOM insertion methods.
  // These are used to insert subviews. It ensures events are re-bound
  // and the subviews are added *then* rendered.
  _.each(['append', 'prepend', 'replaceWith'], function(methodName) {
    BaseView.prototype[methodName] = function(view, element) {
      view.delegateEvents();
      (element || this.$el)[methodName](view.$el);
      view.processRender();
      return view;
    };
  });

  _.each(['appendTo', 'prependTo'], function(methodName) {
    BaseView.prototype[methodName] = function(element) {
      this.delegateEvents();
      this.$el[methodName](element);
      this.processRender();
      return this;
    };
  });

  BaseView.prototype.replace = function(element) {
    this.delegateEvents();
    element.replaceWith(this.$el);
    this.processRender();
    return this;
  };

  module.exports = BaseView;
});