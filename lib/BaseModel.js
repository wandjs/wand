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
    },

    // If options.deep is true then will recursively call toJSON on all
    // nested models.
    toJSON: function(options) {
      if (options && options.deep) {
        var submodels = _.result(this, 'submodels');
        var source = this.attributes;
        var dest = {};
        for (var prop in source) {
          if (submodels && submodels[prop]) {
            dest[prop] = source[prop].toJSON(options);
          } else {
            dest[prop] = source[prop];
          }
        }
        return dest;
      } else {
        return _.clone(this.attributes);
      }
    },

    // Override sync and use a custom serialize method if it's defined.
    sync: function(method, model, options) {
      if ((method === 'create' || method === 'update' || method === 'patch') && model.serialize) {
        options.data = _.result(model, 'serialize');
        options.contentType = 'application/json';
      }
      return Backbone.sync.call(this, method, model, options);
    }
  });

  module.exports = BaseModel;
});
