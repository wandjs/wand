define([
	'underscore',
	'backbone',
	'../base-class'
], function(
	_,
	Backbone,
	BaseClass
){
	var LoadQueue = BaseClass.extend({

		initialize:function(){
			this.id = null;
			this.successCount = 0;
			this.errorCount = 0;
			this.items = [];
			this.complete = false;
			this.minDuration = 0;
		},

		addItem:function(loader) {
		    // console.log('MultiLoader.addItem: ' + loader.path);
		    this.items.push(loader);


		    //NOTE: Need to make sure we listen to ITEM_ERROR to catch nested MultiLoaders
		    loader.on('complete', _.bind(this.onItemComplete, this));
		    loader.on('error', _.bind(this.onItemError, this));
		    loader.on('itemError', _.bind(this.onItemError, this));
		},

		getItemById: function(id){
			for(var i=0 ; i<this.items.length ; i++)
			{
				var item = this.items[i];
				if(item.id === id)
				{
					return item;
				}
			}

			return undefined;
		},

		start:function() {
			this.startTime = (new Date()).getTime();
			this.loadNextItem();
		},

		loadNextItem: function(){

			if(this.getProgress() === 1)
			{
				var currentTime = (new Date()).getTime();
				var loadDuration = currentTime - this.startTime;

				if(this.minDuration !== 0 && loadDuration < this.minDuration)
				{
					setTimeout(_.bind(this.loadNextItem, this), this.minDuration - loadDuration);
				}
				else
				{
					this.complete = true;
					this.trigger('complete');
				}
			}
			else
			{
				for(var i=0 ; i<this.items.length ; i++)
				{
					var item = this.items[i];

					if(!item.complete)
					{
						item.start();
						break;
					}
				}
			}
		},

		onItemComplete: function(event){
			this.trigger('itemComplete', { target: event.target });
			this.loadNextItem();
		},

		onItemError: function(event){
			this.trigger('itemError', { target: event.target });
			this.trigger('error', { target: event.target });
		},

		

		getProgress:function(){
			//If there are no items in the loader report that it is finished, so that processes relying on load complete will run even if loader is empty
			if(this.items.length === 0)
			{
				return 1;
			}

			var completeCount = 0;

			for(var i=0 ; i<this.items.length ; i++)
			{
				if(this.items[i].complete)
				{
					completeCount++;
				}
			}

			// console.log(completeCount , this.items.length);
			return completeCount / this.items.length;
		},

		getNumItems:function(){
			return this.items.length;
		},

		isComplete: function() {
		    return (this.queue.length === this.successCount + this.errorCount);
		}

	});
	
	_.extend(LoadQueue.prototype, Backbone.Events);

	return LoadQueue;
});
