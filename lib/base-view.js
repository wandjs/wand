if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['underscore', 'backbone'], function(_, Backbone) {
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

    // Default functionality simply renders the compiled template and data
    // directly into the view's main element.
    render: function() {
      var template = _.result(this, 'template');
      if (template) {
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
