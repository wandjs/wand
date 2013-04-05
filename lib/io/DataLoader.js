if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {

	var $ = require('jquery');
	var _ = require('underscore');
	var Backbone = require('backbone');
	var AbstractLoader = require('./AbstractLoader');

	

	module.exports = AbstractLoader.extend({

		storedOptions: ['id', 'path', 'dataType', 'params'],
		// storedOptions: {
		// 	id: null,
		// 	path: null,
		// 	dataType: null,
		// 	params: null,
		// 	testValue: 'hello'
		// },

		start: function() {

			var self = this;

			$.ajax({
				url: this.getPath(),
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