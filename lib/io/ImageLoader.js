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

	_.extend(ImageLoader.prototype, Backbone.Events);

	return ImageLoader;
});
