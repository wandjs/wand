var expect = require('chai').expect;
var Templater = require('../lib/Templater');
var handleBars = require('handleBars');

// Dummy raw templates
var innerRawTemplate = '<p>{{body}}</p>';
var outerRawTemplate = '<hr/><div><h1>{{title}}</h1>{{{template "inner" message}}}</div><hr/>';
var headerRawTemplate = '<h1>{{title}}</h1>';
var footerRawTemplate = '<h3>{{emailAddress}}</h3>';

// Dummy compiled templates
var headerCompiledTemplate = handleBars.compile(headerRawTemplate);
var footerCompiledTemplate = handleBars.compile(footerRawTemplate);

describe('Templater', function(){

  beforeEach(function(){
    Templater.clearRawTemplates();
    Templater.clearCompiledTemplates();

    Templater.initialize(
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
      
      expect(Templater.getRawTemplate('inner')).to.equal(innerRawTemplate);
      expect(Templater.getRawTemplate('outer')).to.equal(outerRawTemplate);
    });

    it('should initialize with compiled templates', function(){
      expect(Templater.getCompiledTemplate('header')).to.equal(headerCompiledTemplate);
      expect(Templater.getCompiledTemplate('footer')).to.equal(footerCompiledTemplate);
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

      expect(Templater.template('inner', simpleDataProvider)).to.equal('<p>body text</p>');
      expect(Templater.template('outer', nestedDataProvider)).to.equal('<hr/><div><h1>title text</h1><p>body text</p></div><hr/>');
      
    });
    
  });

  describe('addRawTemplates', function(){
    it('should add raw templates', function(){
      
      Templater.addRawTemplates({
        header: headerRawTemplate,
        footer: footerRawTemplate
      });

      expect(Templater.getRawTemplate('header')).to.equal(headerRawTemplate);
      expect(Templater.getRawTemplate('footer')).to.equal(footerRawTemplate);
    });
  });

  describe('addCompiledTemplates', function(){
    it('should add compiled templates', function(){
      
      Templater.addCompiledTemplates({
        header: headerCompiledTemplate,
        footer: footerCompiledTemplate
      });

      expect(Templater.getCompiledTemplate('header')).to.equal(headerCompiledTemplate);
      expect(Templater.getCompiledTemplate('footer')).to.equal(footerCompiledTemplate);
    });
  });

  describe('getRawTemplate', function(){
    it('should get raw template', function(){
      expect(Templater.getRawTemplate('inner')).to.equal(innerRawTemplate);
      expect(Templater.getRawTemplate('outer')).to.equal(outerRawTemplate);
    });
  });

  describe('getCompiledTemplate', function(){
    it('should get compiled template', function(){
      expect(Templater.getCompiledTemplate('header')).to.equal(headerCompiledTemplate);
      expect(Templater.getCompiledTemplate('footer')).to.equal(footerCompiledTemplate);
      expect(Templater.getCompiledTemplate('none')).to.not.exist;
    });
  });

  describe('compileAllRawTemplates', function(){
    it('should compile all raw templates', function(){
      Templater.compileAllRawTemplates();

      expect(Templater.getCompiledTemplate('inner')).to.exist;
      expect(Templater.getCompiledTemplate('inner')).to.be.instanceof(Function);
    });
  });

  describe('clearRawTemplates', function(){
    it('should clear all raw templates', function(){
      Templater.clearRawTemplates();

      expect(Templater.getRawTemplate('inner')).to.not.exist;
      expect(Templater.getRawTemplate('outer')).to.not.exist;
    });
  });

  describe('clearCompiledTemplates', function(){
    it('should clear all compiled templates', function(){
      Templater.clearCompiledTemplates();

      expect(Templater.getCompiledTemplate('header')).to.not.exist;
      expect(Templater.getCompiledTemplate('footer')).to.not.exist;
    });
  });

});
