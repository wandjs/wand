if (typeof define !== 'function') { var define = require('amdefine')(module); }

// Templater
// 
// The Wand Templater facilitates nested templating for Handlebars, minimizing markup duplication for both browser and server environments.
//
// For documentation and examples follow: https://github.com/wandjs/wand/wiki/Templater

define(function(require, exports, module) {

  var _ = require('underscore');
  var Handlebars = require('handlebars');
  var Utils = require('./Utils');

  return {
    //
    initialize: function(options) {
      if (!options) {
        options = {};
      }

      this.rawTemplates = options.rawTemplates ? options.rawTemplates : {};
      this.compiledTemplates = options.compiledTemplates ? options.compiledTemplates : {};
      this.handlebarsHelperName = options.handlebarsHelperName ? options.handlebarsHelperName : 'template';

      this._createHandlebarsHelper();
    },

    // Compiles a template and populates with data
    template: function(id, data) {
      return this.getCompiledTemplate(id)(data);
    },

    // Adds a key value map of raw templates
    //
    // addRawTemplates(
    //   {
    //     header: '<div><h1>{{title}}<h1/></div>',
    //     footer: '<div><h3>{{contactDetails}}<h3/></div>'
    //   }
    // )
    addRawTemplates: function(templates) {
      _.each(
        templates,
        function(template, id){
          this.rawTemplates[id] = template;
        },
        this
      );
    },

    // Adds a key value map of compiled templates
    //
    // addCompiledTemplates(
    //   {
    //     header: Handlebars.compile('<div><h1>{{title}}<h1/></div>'),
    //     footer: Handlebars.compile('<div><h3>{{contactDetails}}<h3/></div>')
    //   }
    // )
    addCompiledTemplates: function(templates) {
      _.each(
        templates,
        function(template, id) {
          this.compiledTemplates[id] = template;
        },
        this
      );
    },

    // Returns a raw template
    getRawTemplate: function(id) {
      return this.rawTemplates[id];
    },

    // Returns a compiled template. 
    getCompiledTemplate: function(id) {
      // Lazily compile the templates
      var compiledTemplate = this.compiledTemplates[id];
      if (!compiledTemplate) {
        var rawTemplate = this.getRawTemplate(id);
        if (!rawTemplate)
        {
          return null;
        }
        compiledTemplate = Handlebars.compile(rawTemplate);
        this.compiledTemplates[id] = compiledTemplate;
      }

      return compiledTemplate;
    },

    // Compiles all raw templates synchronously
    compileAllRawTemplates: function(){
      var self = this;

      _.each(
        this.rawTemplates,
        function(template, id) {
          self.getCompiledTemplate(id);
        },
        this
      );
    },

    // Clears raw templates
    clearRawTemplates: function() {
      Utils.collection.empty(this.rawTemplates);
    },

    // Clears compiled templates
    clearCompiledTemplates: function() {
      Utils.collection.empty(this.compiledTemplates);
    },

    // Creates a handlebars helper to allow nested templating.
    _createHandlebarsHelper: function() {
      var self = this;

      Handlebars.registerHelper(
        this.handlebarsHelperName,
        function(templateName, data) {
          return self.template(templateName, data);
        }
      );
    }
  };
});
