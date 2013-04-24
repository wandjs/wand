if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var $ = require('jquery');
  var AbstractLoader = require('./AbstractLoader');

  module.exports = AbstractLoader.extend({

    start: function() {
      var self = this;

      $.ajax({
        url: this.getPath(),
        dataType: this.dataType,
        data: this.params,
        success: function(data){
          self.data = data;
          self.complete = true;
          self.onComplete();
        },
        error: function(error){
          this.hadError = true;
          self.complete = true;
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