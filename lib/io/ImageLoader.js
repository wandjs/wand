define([
	'jquery',
	'underscore',
	'backbone',
	'../base-class',
], function(
	$,
	_,
	Backbone,
	BaseClass
){
	var ImageLoader =  BaseClass.extend({

		initialize:function(options){
			this.id = options.id;
			this.path = options.path;
			this.params = options.params;
			this.complete = false;
		},

		start:function(){
			this.image = new Image();
			
			var self = this;

			$(this.image).load(_.bind(function() {
				this.data = this.image;
				this.complete = true;
				this.trigger('complete', { target: self });
			}, this));

			// If the image isn't found we still dispatch a complete event
			// A webpage should at least load even if an image is broken...
			$(this.image).error(_.bind(function() {
				this.complete = true;
				this.trigger('error', { target: self });
			}, this));

			this.image.src = _.result(this, 'path');
		}

	});

	_.extend(ImageLoader.prototype, Backbone.Events);

	return ImageLoader;
});
