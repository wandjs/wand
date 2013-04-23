var _ = require('underscore');
var chai = require('chai');
var OptionMerger = require('../lib/OptionMerger');

var expect = chai.expect;

describe('EventBus', function(){

  var DogClass;
  var CatClass;
  var dog;
  var cat;
  var weirdCat;

  var dogName = 'Jasper';
  var dogType = 'Retriever';
  var catName = 'Boots';
  var catType = 'Persian';
  var catNumLegs = 4;
  var weirdCatNumLegs = 5;

  beforeEach(function(){
    
    // Class definitions
    DogClass = function(options){
      this.mergeOptions(options, ['name', 'type']); 
    };
    _.extend(DogClass.prototype, OptionMerger);
    
    CatClass = function(options){
      this.mergeOptions(options, {name: null, type: null, numLegs:catNumLegs}); 
    };
    _.extend(CatClass.prototype, OptionMerger);

    // Variable definitions
    dog = new DogClass(
      {
        name: dogName,
        type: dogType
      }
    );

    cat = new CatClass(
      {
        name: catName,
        type: catType
      }
    );

    weirdCat = new CatClass(
      {
        name: catName,
        type: catType,
        numLegs: weirdCatNumLegs
      }
    );

  });

  describe('mergeOptions', function(){
    
    it('should set values using array style definition', function() {
      expect(dog.name).to.equal(dogName);
      expect(dog.type).to.equal(dogType);
    });

    it('should set values using object style definition', function() {
      expect(cat.name).to.equal(catName);
      expect(cat.type).to.equal(catType);
    });

    it('should set default values using object style definition', function() {
      expect(cat.numLegs).to.equal(catNumLegs);
    });

    it('should allow overriding default values using object style definition', function() {
      expect(cat.numLegs).to.equal(catNumLegs);
    });

    it('should work if no options are passed in', function() {
      var tempCat = new CatClass();
      expect(tempCat.name).to.be.null;
      expect(tempCat.type).to.be.null;
      expect(tempCat.numLegs).to.be.equal(catNumLegs);
    });

    it('should work if an empty options object is passed in', function() {
      var tempCat = new CatClass({});
      expect(tempCat.name).to.be.null;
      expect(tempCat.type).to.be.null;
      expect(tempCat.numLegs).to.be.equal(catNumLegs);
    });

  });

});
