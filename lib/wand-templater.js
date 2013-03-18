
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

          this.createHandlebarsHelper();
        },

        compile: function(id, data)
        {
          return this.getCompiledTemplate(id)(data);
        },

        addTemplates: function(templates)
        {
          _.each(
            templates,
            function(template)
            {
              this.rawTemplates[template.id] = template.value;
            },
            this
          );
        },

        getCompiledTemplate: function(id)
        {
          var compiledTemplate = this.compiledTemplates[id];
          if(!compiledTemplate)
          {
            compiledTemplate = Handlebars.compile(this.getRawTemplate(id));
            this.compiledTemplates[id] = compiledTemplate;
          }

          return compiledTemplate;
        },

        getRawTemplate: function(id)
        {
          return this.rawTemplates[id];
        },

        createHandlebarsHelper: function()
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