var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
var $ = require("jquery");
// var DataLoader = require('../../lib/io/DataLoader');

chai.use(sinonChai);

var expect = chai.expect;

describe('DataLoader', function(){
  var testId = 'a';
  var testPath = 'folder/file.jpg';

  var callBack;
  var dataLoader;

  beforeEach(function() {
    callBack = sinon.spy();
    sinon.spy($, 'ajax');
    // console.log('DataLoader: ', DataLoader);
    // dataLoader = new DataLoader( { id: testId, path: testPath } );
  });

  afterEach(function() {
    $.ajax.restore();
  })


  describe('trigger', function(){

    it('should be true', function(){
      expect(true).to.be.true;
    });

    it('should be true', function(){
      expect(true).to.be.true;
    });

  });
  

});