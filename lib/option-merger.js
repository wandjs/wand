if (typeof define !== 'function') { var define = require('amdefine')(module); }

// The Wand option merger is a mixin that facilitates the storage of values as object properties.
// These are expressed declaratively and can be specified in a simple list using an Array or 
// with defaults using an Object.
// 
// Example:
// 
////////////////////////////////////////////////////////////////////////////////////////////////////
// // Class definitions
// var DogClass = function(options){
//   this.mergeOptions(options, ['name', 'type']); 
// }
// _.extend(DogClass.prototype, OptionMerger);

// var CatClass = function(options){
//   this.mergeOptions(options, {name: null, type: null, numLegs: 4}); 
// }
// _.extend(CatClass.prototype, OptionMerger);

// // Variable definitions
// var dog = new DogClass(
//   {
//     name: 'Jasper',
//     type: 'Retriever'
//   }
// );
// console.log('dog.name: ', dog.name);
// console.log('dog.type: ', dog.type);

// var cat = new CatClass(
//   {
//     name: catName,
//     type: catType
//   }
// );
// console.log('cat.name: ', cat.name);
// console.log('cat,type: ', cat,type);
// console.log('cat.numLegs: ', cat.numLegs);
////////////////////////////////////////////////////////////////////////////////////////////////////

define(function(require, exports, module) {

  var _ = require('underscore');

  return {
    mergeOptions: function(options, storedOptions) {
      // Default to an empty object here to avoid errors
      options = options ? options : {};

      if (storedOptions) {
        if (storedOptions instanceof Array) {
          _.extend(this, _.pick(options, storedOptions));
        } else if (storedOptions instanceof Object) {
          _.each(
            storedOptions,
            function(value, key) {
              var optionValue = options[key];
              this[key] = optionValue ? optionValue : value;
            },
            this
          );
        }
      }
    },
  };
});
