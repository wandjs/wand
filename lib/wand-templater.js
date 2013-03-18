
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(
  [
    'require',
    'underscore',
    'handlebars',
    './wand-base-class'
  ],
  function (
    require,
    _,
    Handlebars,
    BaseClass
  ) {
    
    return BaseClass.extend(
      {
        constructor: function()
        {
          this.initialize.apply(this, arguments);
        },
        
        initialize: function(options)
        {
          this.rawTemplates = options.rawTemplates ? options.rawTemplates : {};
          this.compiledTemplates = options.compiledTemplates ? options.compiledTemplates : {};
          this.handlebarsHelperMethodName = options.handlebarsHelperMethodName ? options.handlebarsHelperMethodName : 'template';

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
          // TODO when underscore utilities are in place, do a removeAll on this.rawTemplates and this.compiledTemplates
        },

        // Creates a handlebars helper to allow nested templating.
        _createHandlebarsHelper: function()
        {
          var self = this;

          Handlebars.registerHelper(
            this.handlebarsHelperMethodName,
            function(templateName, data)
            {
              return self.compile(templateName, data);
            }
          );
        }

      }
    );

});