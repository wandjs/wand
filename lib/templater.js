


if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(
[
  'require',
  'underscore',
  'handlebars',
  './utils',
  './wand-base-class'
],
function (
  require,
  _,
  Handlebars,
  Utils,
  BaseClass
) {
  
  var TemplaterClass = BaseClass.extend(
    {
      
      initialize: function(options)
      {
        this.rawTemplates = options.rawTemplates ? options.rawTemplates : {};
        this.compiledTemplates = options.compiledTemplates ? options.compiledTemplates : {};
        this.handlebarsHelperName = options.handlebarsHelperName ? options.handlebarsHelperName : 'template';

        this._createHandlebarsHelper();
      },

      // Compiles a template and populates with data
      compile: function(id, data)
      {
        return this.getCompiledTemplate(id)(data);
      },

      // Adds a key value map of raw templates
      //
      // addRawTemplates(
      //   {
      //     {
      //       header: '<div><h1>{{title}}<h1/></div>',
      //       footer: '<div><h3>{{contactDetails}}<h3/></div>'
      //     }
      //   }
      // )
      addRawTemplates: function(templates)
      {
        _.each(
          templates,
          function(template, id)
          {
            this.rawTemplates[id] = template;
          },
          this
        );
      },

      addCompiledTemplates: function(templates)
      {
        _.each(
          templates,
          function(template, id)
          {
            this.compiledTemplates[id] = template;
          },
          this
        );
      },

      // Returns a raw template
      getRawTemplate: function(id)
      {
        return this.rawTemplates[id];
      },

      // Returns a compiled template. 
      getCompiledTemplate: function(id)
      {
        // Lazily compile the templates
        var compiledTemplate = this.compiledTemplates[id];
        if(!compiledTemplate)
        {
          compiledTemplate = Handlebars.compile(this.getRawTemplate(id));
          this.compiledTemplates[id] = compiledTemplate;
        }

        return compiledTemplate;
      },

      // Compiles all raw templates synchronously
      compileAllRawTemplates: function(){
        _.each(
          this.rawTemplates,
          function(template, id)
          {
            this.rawTemplates[id] = template;
          },
          this
        );
      },

      // Clears both raw and compiled templates
      clearTemplates: function(){
        Utils.empty(this.rawTemplates);
        Utils.empty(this.compiledTemplates);
      },

      // Creates a handlebars helper to allow nested templating.
      _createHandlebarsHelper: function()
      {
        var self = this;

        Handlebars.registerHelper(
          this.handlebarsHelperName,
          function(templateName, data)
          {
            return self.compile(templateName, data);
          }
        );
      }

    }
  );

  return new TemplaterClass();

});