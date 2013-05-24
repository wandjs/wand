if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  var _ = require('underscore');
  var Backbone = require('backbone');

  var BaseModel = Backbone.Model.extend({
    // Creates nested models for any properties mapped in the submodels hash.
    parse: function(data) {
      _.each(_.result(this, 'submodels'), function(ModelClass, prop) {
        if (data[prop]) {
          data[prop] = new ModelClass(data[prop], {parse: true});
        }
      });
      return data;
    }
  });

  module.exports = BaseModel;
});
