if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  // List of options passed in the constructor to be merged as properties.
  var viewOptions = ['template', 'templateData', 'elements'];

  var BaseView = Backbone.View.extend({
    // Override _configure to do some additional setup for BaseView
    _configure: function(options) {
      Backbone.View.prototype._configure.call(this, options);

      // Merge any options passed in the contructor onto to the view instance.
      _.extend(this, _.pick(options, viewOptions));

      // Wrap the original initialize() so we can execute code either side.
      // Subclasses can safely define their own initialize() without causing
      // this wrapper to stop working.
      var originalIntialize = this.initialize;
      this.initialize = function() {
        // Attempt to cache elements on initialization for views that are given
        // an existing el in the constructor.
        this.cacheElements();
        originalIntialize.apply(this, arguments);
      };

      // Wrap the original render() so we can execute code either side.
      var originalRender = this.render;
      this.render = function() {
        if (_.isFunction(this.beforeRender)) this.beforeRender();
        var result = originalRender.apply(this, arguments);
        this.cacheElements();
        // TODO: Should we attach child views before or after afterRender()?
        if (_.isFunction(this.afterRender)) this.afterRender();
        return result;
      };
    },

    // Default render simply injects the template directly into View.$el
    render: function() {
      var template = this.template;
      if (template) {
        // Normally a template function has at least one argument: template data.
        // If the template property is a function with no arguments then assume
        // it's a function that will return a template function.
        if (!template.length) {
          template = template();
        }
        this.$el.html(template(_.result(this, 'templateData')));
      }
      return this;
    },
    
    // Copies each property in elements onto the view instance and sets the
    // value to a jQuery wrapped element, if it finds one.
    cacheElements: function() {
      _.forEach(_.result(this, 'elements'), function(selector, key) {
        this[key] = this.$(selector);
      }, this);
    }
  });

  return BaseView;
});
