var expect = require('chai').expect;
var BaseClass = require('../lib/BaseClass');

describe('BaseClass', function() {

  // The majority of class inheritance tests are covered by the
  // Utils.createClass test. The following simply check BaseClass and it's
  // extend() method.

  it('should be a function', function() {
    expect(BaseClass).to.be.a('function');
  });

  describe('extend()', function() {
    it('should be a function', function() {
      expect(BaseClass.extend).to.be.a('function');
    });
    it('should return a constructor function with no details provided', function() {
      var Animal = BaseClass.extend();
      expect(Animal).to.be.a('function');
    });
    it('should return a constructor function with an extend function on it', function() {
      var Animal = BaseClass.extend();
      expect(Animal.extend).to.be.a('function');
      expect(Animal.extend).to.equal(BaseClass.extend);
    });
    it('should return the constructor function specified in the details object', function() {
      var animalDetails = {
        constructor: function() {}
      };
      var Animal = BaseClass.extend(animalDetails);
      expect(Animal).to.equal(animalDetails.constructor);
    });
    it('should return the constructor function specified in the details object with an extend function on it', function() {
      var Animal = BaseClass.extend({
        constructor: function() {}
      });
      expect(Animal.extend).to.be.a('function');
      expect(Animal.extend).to.equal(BaseClass.extend);
    });
    it('should return a subclass of a subclass of BaseClass', function() {
      var Animal = BaseClass.extend({
        species: 'unknown'
      });
      var Dog = Animal.extend({
        species: 'dog'
      });
      expect(Dog).to.be.a('function');
      expect(Dog.prototype.species).to.equal('dog');
      expect(Object.getPrototypeOf(Dog.prototype).species).to.equal('unknown');
    });
  });

});
