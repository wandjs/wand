if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
  /* global Image */

  var $ = require('jquery');
  var AbstractLoader = require('./AbstractLoader');

  module.exports = AbstractLoader.extend({

    start:function(){
      var self = this;
      this.image = new Image();
      
      $(this.image).load(function() {
        self.data = this.image;
        self.complete = true;
        self.onComplete();
      });

      $(this.image).error(function(error) {
        self.complete = true;
        self.onError(error);
      });

      this.image.src = this.getPath();
      this.onStart();
    }
  });
});
