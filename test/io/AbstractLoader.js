var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var AbstractLoader = require('../../lib/io/AbstractLoader');

var expect = chai.expect;
chai.use(sinonChai);

describe('AbstractLoader', function(){
  var id1 = 'a';
  var pathString1 = 'data/data-1.json';
  var pathString2 = 'data/data-2.json';
  var pathFunction = function(){ return pathString2; };

  var callBack;
  var dataLoader;
  var dataLoaderStringPath;
  var dataLoaderFunctionPath;

  beforeEach(function() {
    callBack = sinon.spy();
    
    dataLoader = new AbstractLoader( { id: id1, path: pathString1 } );
    dataLoader.off();
    dataLoaderStringPath = new AbstractLoader( { id: id1, path: pathString1 } );
    dataLoaderStringPath.off();
    dataLoaderFunctionPath = new AbstractLoader( { id: id1, path: pathFunction } );
    dataLoaderFunctionPath.off();
  });

  afterEach(function() {
  });

  describe('initialize', function(){    

    it('should have id property set', function(){
      expect(dataLoader.id).to.equal(id1);
    });

    it('should have path set to a string', function(){
      expect(dataLoaderStringPath.path).to.equal(pathString1);
    });

    it('should have path set to a function', function(){
      expect(dataLoaderFunctionPath.path).to.equal(pathFunction);
    });

  });

  describe('getPath', function(){

    it('should return correct string for string type', function(){
      expect(dataLoaderStringPath.getPath()).to.equal(pathString1);
    });

    it('should return correct string for function type', function(){
      expect(dataLoaderFunctionPath.getPath()).to.equal(pathString2);
    });

  });

  describe('triggerStart', function(){

    it('should trigger start event', function(done){
      dataLoader.on('start', callBack);
      dataLoader.triggerStart();
      expect(callBack).to.be.calledOnce;
      expect(callBack).to.be.calledWithMatch({target:dataLoader});
      done();
    });

  });

  describe('triggerComplete', function(){

    it('should trigger complete event', function(done){
      dataLoader.on('complete', callBack);
      dataLoader.triggerComplete();
      expect(callBack).to.be.calledOnce;
      expect(callBack).to.be.calledWithMatch({target:dataLoader});
      done();
    });

  });

  describe('start', function(){

    it('should fire onStart', function(done){
      var onStartSpy = sinon.spy(dataLoader, 'onStart');
      dataLoader.start();
      expect(onStartSpy).to.be.calledOnce;
      done();
    });

    it('should allow custom onStart handler', function(done){
      var check = 0;
      dataLoader = new AbstractLoader({
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
      done();
    });

    it('should trigger start event', function(done){
      dataLoader.on('start', callBack);
      dataLoader.start();
      expect(callBack).to.be.calledOnce;
      expect(callBack).to.be.calledWithMatch({target:dataLoader});
      done();
    });

    it('should fire onComplete', function(done){
      var onCompleteSpy = sinon.spy(dataLoader, 'onComplete');
      dataLoader.start();
      expect(onCompleteSpy).to.be.calledOnce;
      done();
    });

    it('should allow custom onComplete handler', function(done){
      var check = 0;
      dataLoader = new AbstractLoader({
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
