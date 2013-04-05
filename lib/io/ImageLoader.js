if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var AbstractLoader = require('./AbstractLoader');

	module.exports = AbstractLoader.extend({

		initialize:function(options){
			this.id = options ? options.id : null;
			this.path = options ? options.path : null;
			this.params = options ? options.params : null;
			this.complete = false;
		},

		start:function(){
			this.image = new Image();
			
			$(this.image).load(_.bind(function() {
				this.data = this.image;
				this.complete = true;
				this.trigger('complete', { target: this });
			}, this));

			$(this.image).error(_.bind(function() {
				this.complete = true;
				this.trigger('error', { target: this });
			}, this));

			this.image.src = _.result(this, 'path');
		}

	});

});
