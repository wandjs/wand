if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var AbstractLoader = require('./AbstractLoader');

	module.exports = AbstractLoader.extend({

		initialize: function(options) {
			this.id = options.id;
			this.path = options.path;
			this.dataType = options.dataType;
			this.params = options.params;
			this.complete = false;
		},

		start: function() {

			var self = this;

			$.ajax({
				url: _.result(this, 'path'),
				dataType: this.dataType,
				data: this.params,
				success: function(data){
					self.data = data;
					self.complete = true;
					self.trigger('complete', { target:self });
				},
				error: function(){
					this.hadError = true;
					self.complete = true;
					self.trigger('error', { target:self });
				}
			});
		},

		toString: function(){
		  return '[object DataLoader]';
		}

	});

});