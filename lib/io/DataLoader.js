define([
	'jquery',
	'underscore',
	'backbone',
	'../base-class'
], function(
	$,
	_,
	Backbone,
	BaseClass
){
	var DataLoader = BaseClass.extend({

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
		}

	});

	_.extend(DataLoader.prototype, Backbone.Events);
	
	return DataLoader;
});
