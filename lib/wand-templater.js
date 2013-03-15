
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(
  [
    'require',
    'underscore',
    './wand-base-class'
  ],
  function (
    require,
    _,
    BaseClass
  ) {
    
    return BaseClass.extend(
      {
        constructor: function()
        {
          console.log('Templater constructor');
        },
        doSomething: function()
        {
          console.log('Templater.doSomething');
        }
      }
    );

});