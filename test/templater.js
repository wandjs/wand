var expect = require('chai').expect;
var templater = require('../lib/templater');
var handleBars = require('handleBars');

// Dummy raw templates
var innerTemplate = '<p>{{body}}</p>';
var outerTemplate = '<hr/><div><h1>{{title}}</h1>{{{template "inner" message}}}</div><hr/>';
var headerTemplate = '<h1>{{title}}</h1>';
var footerTemplate = '<h3>{{emailAddress}}</h3>';

// Dummy compiled templates
var compiledHeaderTemplate = handleBars.compile(headerTemplate);
var compiledFooterTemplate = handleBars.compile(footerTemplate);

describe('templater', function(){

  beforeEach(function(){
    
    templater.clearTemplates();
    templater.initialize(
      {
        rawTemplates: {
          inner: innerTemplate,
          outer: outerTemplate
        },
        compiledTemplates: {
          header: compiledHeaderTemplate,
          footer: compiledFooterTemplate
        }
      }
    );

  });

  describe('initialize', function(){
    
    it('should initialize with raw templates', function(){
      expect(templater.rawTemplates).to.have.keys(['inner', 'outer']);
      expect(templater.rawTemplates.inner).to.equal(innerTemplate);
      expect(templater.rawTemplates.outer).to.equal(outerTemplate);
    });

    it('should initialize with compiled templates', function(){
      expect(templater.compiledTemplates).to.have.keys(['header', 'footer']);
      expect(templater.compiledTemplates.header).to.equal(compiledHeaderTemplate);
      expect(templater.compiledTemplates.footer).to.equal(compiledFooterTemplate);
    });
    
  });

  describe('addRawTemplates', function(){
    
    before(function(){
      
      

    });
    
    it('should add a single template', function(){

      
      templater.addRawTemplates({
        header: headerTemplate,
        footer: footerTemplate
      });

      console.log('templater.rawTemplates.header: ' + templater.rawTemplates.header);
      console.log('templater.rawTemplates.footer: ' + templater.rawTemplates.footer);

      expect(templater.rawTemplates).to.have.keys(['header', 'footer']);
      // expect(templater.rawTemplates.header).to.equal(headerTemplate);
      // expect(templater.rawTemplates.footer).to.equal(footerTemplate);
    });
    
  });

});
