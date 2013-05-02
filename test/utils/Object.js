var expect = require('chai').expect;
var ObjectUtils = require('../../lib/utils/Object');

describe('Object', function(){

  describe('createClass()', function(){
    var createClass = ObjectUtils.createClass;
    it('should return a constructor function when no arguments are given', function(){
      var Animal = createClass();
      expect(Animal).to.be.a('function');
    });
    it('should return a constructor function with valid prototype when no arguments are given', function(){
      var Animal = createClass();
      expect(Animal.prototype).to.be.an('object');
    });
    it('should return a constructor function with valid prototype.constructor when no arguments are given', function(){
      var Animal = createClass();
      expect(Animal.prototype.constructor).to.be.a('function');
      expect(Animal.prototype.constructor).to.equal(Animal);
    });
    it('should return the constructor function specified in the details', function(){
      var details = {
        constructor: function() {}
      };
      var Animal = createClass(details);
      expect(Animal).to.be.a('function');
      expect(Animal).to.equal(details.constructor);
    });
    it('should return a constructor function even if no constructor is specified in the details', function(){
      var Animal = createClass({});
      expect(Animal).to.be.a('function');
    });
    it('should copy detail properties onto the new constructor prototype', function(){
      var Animal = createClass({
        species: 'cat'
      });
      expect(Animal.prototype.species).to.equal('cat');
    });
    it('new instance should create an object whose prototype has the details properties', function(){
      var Animal = createClass({
        species: 'cat'
      });
      var cat = new Animal();
      expect(Object.getPrototypeOf(cat).species).to.equal('cat');
    });
    it('new instance should create an object whose prototype.constructor is the original constructor', function(){
      var details = {
        constructor: function() {},
        species: 'cat'
      };
      var Animal = createClass(details);
      var cat = new Animal();
      expect(Object.getPrototypeOf(cat).constructor).to.equal(details.constructor);
    });
    it('should return a valid constructor function for a subclass', function(){
      var Animal = createClass({});
      var Dog = createClass(Animal, {});
      expect(Dog).to.be.an('function');
    });
    it('should return a valid constructor function for a subclass with specified constructor function', function(){
      var Animal = createClass({});
      var dogDetails = {
        constructor: function() {}
      };
      var Dog = createClass(Animal, dogDetails);
      expect(Dog).to.equal(dogDetails.constructor);
    });
    it('should create a subclass constructor function whose prototype is an instance of the superclass', function(){
      var Animal = createClass({
        species: 'unknown'
      });
      var Dog = createClass(Animal, {
        species: 'dog'
      });
      expect(Object.getPrototypeOf(Dog.prototype)).to.be.an('object');
      expect(Object.getPrototypeOf(Dog.prototype).species).to.equal('unknown');
    });
    it('new instance of subclass should create an object prototype has the details properties', function(){
      var Animal = createClass({});
      var Dog = createClass(Animal, {
        species: 'dog'
      });
      var dog = new Dog();
      expect(Object.getPrototypeOf(dog).species).to.equal('dog');
    });
    it('new instance of subclass should create an object whose prototype.constructor is the original constructor', function(){
      var Animal = createClass({});
      var dogDetails = {
        constructor: function() {}
      };
      var Dog = createClass(Animal, dogDetails);
      var dog = new Dog();
      expect(Object.getPrototypeOf(dog).constructor).to.equal(dogDetails.constructor);
    });
    it('new instance of subclass should create an object whose __proto__._proto__ should have superclass details', function(){
      var Animal = createClass({
        species: 'unknown'
      });
      var Dog = createClass(Animal, {});
      var dog = new Dog();
      expect(Object.getPrototypeOf(Object.getPrototypeOf(dog)).species).to.equal('unknown');
    });
    it('new instance of subclass should create an object whose details override the superclass', function(){
      var Animal = createClass({
        species: 'unknown'
      });
      var Dog = createClass(Animal, {
        species: 'dog'
      });
      var dog = new Dog();
      expect((dog).species).to.equal('dog');
    });
  });

  describe('mergeOptions', function(){
    
    var dog;
    var cat;
    var weirdCat;

    var dogName = 'Jasper';
    var dogType = 'Retriever';
    var catName = 'Boots';
    var catType = 'Persian';
    var catNumLegs = 4;
    var weirdCatNumLegs = 5;
    var weirdCatNumEyes = 3;

    beforeEach(function(){
      
      dog = {};
      ObjectUtils.mergeOptions(
        dog,
        ['name', 'type'],
        {
          name: dogName,
          type: dogType
        }
      );

      cat = {};
      ObjectUtils.mergeOptions(
        cat,
        { name: null, type: null, numLegs:catNumLegs },
        { name: catName, type: catType }
      );

      weirdCat = {};
      ObjectUtils.mergeOptions(
        weirdCat,
        { name: null, type: null, numLegs:catNumLegs },
        { name: catName, type: catType, numLegs: weirdCatNumLegs, numEyes: weirdCatNumEyes}
      );

    });
    
    it('should set values using array style definition', function() {
      expect(dog.name).to.equal(dogName);
      expect(dog.type).to.equal(dogType);
    });

    it('should set values using object style definition', function() {
      expect(cat.name).to.equal(catName);
      expect(cat.type).to.equal(catType);
    });

    it('should set default values using object style definition', function() {
      expect(weirdCat.numEyes).to.equal(weirdCatNumEyes);
    });

    it('should allow overriding default values using object style definition', function() {
      expect(weirdCat.numLegs).to.equal(catNumLegs);
    });

    it('should set defaults if no options are passed in', function() {
      var tempCat = {};
      ObjectUtils.mergeOptions(tempCat, null, { name: catName, type: null });

      expect(tempCat.name).to.equal(catName);
      expect(tempCat.type).to.be.null;
    });

    it('should set defaults if empty options are passed in', function() {
      var tempCat = {};
      ObjectUtils.mergeOptions(tempCat, {}, { name: catName, type: null });

      expect(tempCat.name).to.equal(catName);
      expect(tempCat.type).to.be.null;
    });

  });
});