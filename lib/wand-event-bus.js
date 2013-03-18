
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(
  [
    'require',
    'underscore',
    'backbone',
    './wand-base-class'
  ],
  function (
    require,
    _,
    Backbone,
    BaseClass
  ) {
    
    var EventBus = BaseClass.extend(
      {
       
        constructor: function(){
          
        }

      }
    );

    var instance = new EventBus();

    _.extend(instance, Backbone.Events);

    return instance;
});