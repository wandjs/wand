var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var eventBus = require('../lib/event-bus');

chai.use(sinonChai);

var expect = chai.expect;
var should = chai.should;




describe('EventBus', function(){

  // var simpleEventHandler = function(){};

  var obj = {
    simpleEventHandler: function(){}
  }

  beforeEach(function(){
    // sinon.spy(simpleEventHandler);
  });

  describe('trigger', function(){
    
    it('simple event handler should fire', function(done){
      
      var callBack = sinon.spy();
      // var callBack = function(){
      //   console.log('arguments: ', arguments);
      // }
      eventBus.on('myEvent', callBack);
      eventBus.trigger('myEvent', 'hello');
      
      expect(callBack).to.be.calledOnce;
      expect(callBack).to.be.calledWithExactly('hello');

      done();
    });
    
  });

  


});
