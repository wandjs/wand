var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var EventBus = require('../lib/EventBus');

chai.use(sinonChai);

var expect = chai.expect;

describe('EventBus', function(){
  describe('trigger', function(){
    it('should not do anything when triggered with no parameters', function(done) {
      expect(EventBus.trigger()).to.equal(EventBus);
      done();
    });
    
    it('it should trigger a single event namespace', function(done){
      var callback1 = sinon.spy();
      EventBus.on('one', callback1);
      EventBus.trigger('one');
      expect(callback1).to.be.calledOnce;
      done();
    });
    
    it('it should trigger a double event namespace', function(done){
      var callback1 = sinon.spy();
      var callback2 = sinon.spy();
      EventBus.on('one', callback1);
      EventBus.on('one:two', callback2);
      EventBus.trigger('one:two');
      expect(callback1).to.be.calledOnce;
      expect(callback2).to.be.calledOnce;
      done();
    });

    it('it should trigger a single event namespace with additional arguments', function(done){
      var callback1 = sinon.spy();
      EventBus.on('one', callback1);
      EventBus.trigger('one', 'hello', 5);
      expect(callback1).to.be.calledWithExactly('hello', 5);
      done();
    });

    it('it should trigger a double event namespace with additional arguments', function(done){
      var callback1 = sinon.spy();
      var callback2 = sinon.spy();
      EventBus.on('one', callback1);
      EventBus.on('one:two', callback2);
      EventBus.trigger('one:two', 'hello', 5);
      expect(callback1).to.be.calledWithExactly('hello', 5);
      expect(callback2).to.be.calledWithExactly('hello', 5);
      done();
    });
    
    it('it should trigger the deepest namespaced event first', function(done){
      var callback1 = sinon.spy();
      var callback2 = sinon.spy();
      EventBus.on('one', callback1);
      EventBus.on('one:two', callback2);
      EventBus.trigger('one:two');
      expect(callback2).to.be.calledBefore(callback1);
      done();
    });
  });
});
