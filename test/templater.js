var expect = require('chai').expect;
var templater = require('../lib/templater');
var handleBars = require('handleBars');

// Dummy raw templates
var innerRawTemplate = '<p>{{body}}</p>';
var outerRawTemplate = '<hr/><div><h1>{{title}}</h1>{{{template "inner" message}}}</div><hr/>';
var headerRawTemplate = '<h1>{{title}}</h1>';
var footerRawTemplate = '<h3>{{emailAddress}}</h3>';

// Dummy compiled templates
var headerCompiledTemplate = handleBars.compile(headerRawTemplate);
var footerCompiledTemplate = handleBars.compile(footerRawTemplate);

describe('templater', function(){

  beforeEach(function(){
    templater.clearRawTemplates();
    templater.clearCompiledTemplates();

    templater.initialize(
      {
        rawTemplates: {
          inner: innerRawTemplate,
          outer: outerRawTemplate
        },
        compiledTemplates: {
          header: headerCompiledTemplate,
          footer: footerCompiledTemplate
        }
      }
    );

  });

  describe('initialize', function(){
    
    it('should initialize with raw templates', function(){
      
      expect(templater.getRawTemplate('inner')).to.equal(innerRawTemplate);
      expect(templater.getRawTemplate('outer')).to.equal(outerRawTemplate);
    });

    it('should initialize with compiled templates', function(){
      expect(templater.getCompiledTemplate('header')).to.equal(headerCompiledTemplate);
      expect(templater.getCompiledTemplate('footer')).to.equal(footerCompiledTemplate);
    });
    
  });

  describe('template', function(){
    
    it('should template simple template', function(){
      var titleText = 'title text';
      var bodyText = 'body text';

      var simpleDataProvider = {
        body:bodyText
      };

      var nestedDataProvider = {
        title: titleText,
        message: {
          body:bodyText
        }
      };

      expect(templater.template('inner', simpleDataProvider)).to.equal('<p>body text</p>');
      expect(templater.template('outer', nestedDataProvider)).to.equal('<hr/><div><h1>title text</h1><p>body text</p></div><hr/>');
      
    });
    
  });

  describe('addRawTemplates', function(){
    it('should add raw templates', function(){
      
      templater.addRawTemplates({
        header: headerRawTemplate,
        footer: footerRawTemplate
      });

      expect(templater.getRawTemplate('header')).to.equal(headerRawTemplate);
      expect(templater.getRawTemplate('footer')).to.equal(footerRawTemplate);
    });
  });

  describe('addCompiledTemplates', function(){
    it('should add compiled templates', function(){
      
      templater.addCompiledTemplates({
        header: headerCompiledTemplate,
        footer: footerCompiledTemplate
      });

      expect(templater.getCompiledTemplate('header')).to.equal(headerCompiledTemplate);
      expect(templater.getCompiledTemplate('footer')).to.equal(footerCompiledTemplate);
    });
  });

  describe('getRawTemplate', function(){
    it('should get raw template', function(){
      expect(templater.getRawTemplate('inner')).to.equal(innerRawTemplate);
      expect(templater.getRawTemplate('outer')).to.equal(outerRawTemplate);
    });
  });

  describe('getCompiledTemplate', function(){
    it('should get compiled template', function(){
      expect(templater.getCompiledTemplate('header')).to.equal(headerCompiledTemplate);
      expect(templater.getCompiledTemplate('footer')).to.equal(footerCompiledTemplate);
      expect(templater.getCompiledTemplate('none')).to.not.exist;
    });
  });

  describe('compileAllRawTemplates', function(){
    it('should compile all raw templates', function(){
      templater.compileAllRawTemplates();

      expect(templater.getCompiledTemplate('inner')).to.exist;
      expect(templater.getCompiledTemplate('inner')).to.be.instanceof(Function);
    });
  });

  describe('clearRawTemplates', function(){
    it('should clear all raw templates', function(){
      templater.clearRawTemplates();

      expect(templater.getRawTemplate('inner')).to.not.exist;
      expect(templater.getRawTemplate('outer')).to.not.exist;
    });
  });

  describe('clearCompiledTemplates', function(){
    it('should clear all compiled templates', function(){
      templater.clearCompiledTemplates();

      expect(templater.getCompiledTemplate('header')).to.not.exist;
      expect(templater.getCompiledTemplate('footer')).to.not.exist;
    });
  });

});
