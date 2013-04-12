if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var _ = require('underscore');

  return {
    storedOptions: [],

    mergeOptions: function(options){
      if(this.storedOptions instanceof Array) {
        _.extend(this, _.pick(options, this.storedOptions));
      } else if(this.storedOptions instanceof Object) {
        _.each(
          this.storedOptions,
          function(value, key) {
            var optionValue = options[key];
            this[key] = optionValue ? optionValue : value;
          },
          this
        );
      }
      
    },
  };

});