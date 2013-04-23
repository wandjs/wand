var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var EventBus = require('../lib/EventBus');

chai.use(sinonChai);

var expect = chai.expect;

describe('EventBus', function(){

  var simpleArg = 'hello';
  var complexArg = { message:'world' };
  var callBack;


  beforeEach(function(){
    callBack = sinon.spy();
  });

  describe('trigger', function(){
    
    it('simple event handler should fire without arguments', function(done){

      EventBus.on('myEvent', callBack);
      
      EventBus.trigger('myEvent');

      expect(callBack).to.be.calledOnce;

      done();
    });

    it('"eventNameSpace:" should trigger "eventNameSpace"', function(done){

      EventBus.on('eventNameSpace:', callBack);
      
      EventBus.trigger('eventNameSpace:');

      expect(callBack).to.be.calledOnce;

      done();
    });

    it('":eventNameSpace" shouldn\'t trigger "eventNameSpace"', function(done){

      EventBus.on('eventNameSpace', callBack);
      
      EventBus.trigger(':eventNameSpace');

      expect(callBack).to.not.be.calledOnce;

      done();
    });

    it('simple event handler should fire with arguments', function(done){

      EventBus.on('myEvent', callBack);
      
      EventBus.trigger('myEvent', simpleArg, complexArg);
      
      expect(callBack).to.be.calledOnce;
      expect(callBack).to.be.calledWithExactly(simpleArg, complexArg);

      done();
    });

    it('complex event handler should fire without arguments', function(done){

      var level0Callback = sinon.spy();
      var level1Callback = sinon.spy();
      var level2Callback = sinon.spy();

      EventBus.on('outer', level0Callback);
      EventBus.on('outer:inner', level1Callback);
      EventBus.on('outer:inner:myEvent', level2Callback);

      EventBus.trigger('outer:inner:myEvent');

      expect(level0Callback).to.be.calledOnce;
      expect(level1Callback).to.be.calledOnce;
      expect(level2Callback).to.be.calledOnce;

      done();
    });

    it('complex event handler should fire without arguments', function(done){

      var level0Callback = sinon.spy();
      var level1Callback = sinon.spy();
      var level2Callback = sinon.spy();

      EventBus.on('outer', level0Callback);
      EventBus.on('outer:inner', level1Callback);
      EventBus.on('outer:inner:myEvent', level2Callback);

      EventBus.trigger('outer:inner:myEvent', simpleArg, complexArg);

      expect(level0Callback).to.be.calledWith(simpleArg, complexArg);
      expect(level1Callback).to.be.calledWith(simpleArg, complexArg);
      expect(level2Callback).to.be.calledWith(simpleArg, complexArg);

      done();
    });

  });

});
