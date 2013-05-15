if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var $ = require('jquery');
  var AbstractLoader = require('./AbstractLoader');

  module.exports = AbstractLoader.extend({

    start: function(callback) {
      var self = this;

      $.ajax({
        url: this.getPath(),
        dataType: this.dataType,
        data: this.params,
        success: function(data){
          self.data = data;
          self.complete = true;
          if(callback) {
            callback(null, data, self);  
          }
          self.onComplete(data, self);
        },
        error: function(error){
          this.hadError = true;
          self.complete = true;
          if(callback) {
            callback(error, null, self);
          }
          self.onError(error);
        }
      });

      this.onStart();
    },

    toString: function(){
      return '[object DataLoader]';
    }
  });
});
