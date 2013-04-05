if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

  var _ = require('underscore');
  var Backbone = require('backbone');
  var AbstractLoader = require('./AbstractLoader');
  
  var DataLoader = require('./DataLoader');
  var ImageLoader = require('./ImageLoader');

  module.exports = AbstractLoader.extend({

    initialize:function(options) {
      this.id = options ? options.id : null;
      this.successCount = 0;
      this.errorCount = 0;
      this.items = [];
      this.complete = false;
      this.minDuration = 0;
      this.loaderMap = {};

      this.registerLoaderType('json', DataLoader);
      this.registerLoaderType('image', ImageLoader);

      this.onItemComplete = _.bind(this.onItemComplete, this);
      this.onItemError = _.bind(this.onItemError, this);
    },

    registerLoaderType: function(id, type, additionMethod){
      this.loaderMap[id] = type;
    },

    add: function(loader) {

      if( !(loader instanceof AbstractLoader) ) {
        var loaderType = this.loaderMap[loader.type];
        if(!loaderType) {
          throw new Error('Cannot find loader of type: ', loader.type);
        } else {
          loader = new loaderType(loader);
        }
      }
      
      this.items.push(loader);

      //NOTE: Need to make sure we listen to itemError to catch nested LoadQueues
      loader.on('complete', this.onItemComplete);
      loader.on('error', this.onItemError);
      loader.on('itemError', this.onItemError);
    },

    get: function(id) {
      for(var i=0 ; i<this.items.length ; i++) {
        var item = this.items[i];
        
        if(item.id === id) {
          return item;
        }
      }

      return undefined;
    },

    start:function() {
      this.startTime = (new Date()).getTime();
      this.loadNextItem();
    },

    loadNextItem: function() {

      if(this.getProgress() === 1) {
        var currentTime = (new Date()).getTime();
        var loadDuration = currentTime - this.startTime;

        if(this.minDuration !== 0 && loadDuration < this.minDuration) {
          setTimeout(_.bind(this.loadNextItem, this), this.minDuration - loadDuration);
        } else {
          this.complete = true;
          this.trigger('complete', {target: this});
        }
      } else {
        for(var i=0 ; i<this.items.length ; i++) {
          var item = this.items[i];

          if(!item.complete) {
            item.start();
            break;
          }
        }
      }
    },

    getProgress:function() {
      //If there are no items in the loader report that it is finished, so that processes relying on load complete will run even if loader is empty
      if(this.items.length === 0) {
        return 1;
      }

      var completeCount = 0;

      for(var i=0 ; i<this.items.length ; i++) {
        if(this.items[i].complete) {
          completeCount++;
        }
      }

      // console.log(completeCount , this.items.length);
      return completeCount / this.items.length;
    },

    getNumItems:function() {
      return this.items.length;
    },

    isComplete: function() {
      return (this.queue.length === this.successCount + this.errorCount);
    },

    onItemComplete: function(event) {
      this.trigger('itemComplete', { target: event.target });
      this.loadNextItem();
    },

    onItemError: function(event) {
      this.trigger('itemError', { target: event.target });
      this.trigger('error', { target: event.target });
    }

  });
  
});
