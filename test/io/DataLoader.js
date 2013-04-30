var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var $ = require("jquery");
var DataLoader = require('../../lib/io/DataLoader');

chai.use(sinonChai);

var expect = chai.expect;

describe('DataLoader', function(){
  var id1 = 'a';
  var pathString1 = 'data/data-1.json';
  var pathString2 = 'data/data-2.json';
  var pathFunction = function(){ return pathString2; };
  var json1 = { message: 'hello' };

  var callBack;
  var dataLoader;
  var dataLoaderStringPath;
  var dataLoaderFunctionPath;

  beforeEach(function() {
    callBack = sinon.spy();
    
    dataLoader = new DataLoader( { id: id1, path: pathString1 } );
    dataLoader.off();
    dataLoaderStringPath = new DataLoader( { id: id1, path: pathString1 } );
    dataLoaderStringPath.off();
    dataLoaderFunctionPath = new DataLoader( { id: id1, path: pathFunction } );
    dataLoaderFunctionPath.off();

    sinon.stub($, 'ajax').yieldsTo('success', json1);
  });

  afterEach(function() {
    $.ajax.restore();
  });

  describe('data-loader', function(){
    it('should fire onStart', function(done){
      var onStartSpy = sinon.spy(dataLoader, 'onStart');
      dataLoader.start();
      expect(onStartSpy).to.be.calledOnce;
      done();
    });

    it('should allow custom onStart handler', function(done){
      var check = 0;
      dataLoader = new DataLoader({
        id: id1,
        path: pathString1,
        onStart: function()
        {
          check = 1;
          this.triggerStart();
        }
      });

      dataLoader.on('start', callBack);
      dataLoader.start();
      expect(callBack).to.be.calledOnce;
      expect(check).to.equal(1);
      done();
    });

    it('should fire start callback', function(done){
      dataLoader.start(callBack);
      expect(callBack).to.be.calledOnce;
      expect(callBack).to.be.calledWith(null, json1, dataLoader);
      done();
    });

    it('should trigger start event', function(done){
      dataLoader.on('start', callBack);
      dataLoader.start();
      expect(callBack).to.be.calledOnce;
      expect(callBack).to.be.calledWithMatch({target:dataLoader});
      done();
    });

    it('data should be set', function(done){
      dataLoader.start();
      expect(dataLoader.data).to.be.equal(json1);
      done();
    });

    it('complete should be true', function(done){
      expect(dataLoader.complete).to.be.false;
      dataLoader.start();
      expect(dataLoader.complete).to.be.true;
      done();
    });

    it('should fire onComplete', function(done){
      var onCompleteSpy = sinon.spy(dataLoader, 'onComplete');
      dataLoader.start();
      expect(onCompleteSpy).to.be.calledOnce;
      done();
    });

    it('should allow custom onStart handler', function(done){
      var check = 0;
      dataLoader = new DataLoader({
        id: id1,
        path: pathString1,
        onStart: function()
        {
          check = 1;
          this.triggerStart();
        }
      });

      dataLoader.on('start', callBack);
      dataLoader.start();
      expect(callBack).to.be.calledOnce;
      expect(check).to.equal(1);
      done();
    });

    it('should allow custom onComplete handler', function(done){
      var check = 0;
      dataLoader = new DataLoader({
        id: id1,
        path: pathString1,
        onComplete: function()
        {
          check = 1;
          this.triggerComplete();
        }
      });

      dataLoader.on('complete', callBack);
      dataLoader.start();
      expect(callBack).to.be.calledOnce;
      expect(check).to.equal(1);
      done();
    });

    it('should trigger complete event', function(done){
      dataLoader.on('complete', callBack);
      dataLoader.start();
      expect(callBack).to.be.calledOnce;
      expect(callBack).to.be.calledWithMatch({target:dataLoader});
      done();
    });

  });  
});
