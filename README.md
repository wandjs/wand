# Wand

A collection of tools for HTML5 web app development, built upon Backbone, Underscore and jQuery.

Wand is aimed primarily at Backbone-based web app development, but many modules don't require it as a depedency, meaning it can be useful in conjunction with other frameworks and utilities.

Wand is designed to be as modular as possible. You're not required to use all of it if you just want to use part of it - pick and choose the features you want.

## Getting Wand

The best way to get Wand is via a package manager.

Node NPM: `npm install wand`

Bower: `bower install wand`

Jam: `jam install wand`

## Using Wand

Wand is made up of lots of independent modules. Each module is defined in the AMD format using RequireJS. This means you can simply require them in your own modules when you want to use them:

    define(['jquery', 'wand/lib/base-view'], function($, BaseView) {
      var Animal = BaseView.extend({});
    });

The modules are also CommonJS compatible, so you can use them in Node.js:

    var Backbone = require('Backbone');
    var BaseView = require('wand/lib/base-view');

Alternatively the entire Wand library can be required, meaning each module can be referenced as a property of the returned value:

    define(['backbone', 'wand'], function(Backbone, Wand) {
      var Animal = Wand.BaseView.extend({});
      Wand.Utils.round(4.5);
    });

For information on each module see below.

## Wand Modules

* Utils
* BaseClass
* BaseView
* EventBus
* Templater

## Dependencies

#### Hard dependencies

* [RequireJS](http://requirejs.org/)
* [Underscore.js](http://underscorejs.org/)

#### Optional dependencies

* [Backbone](http://backbonejs.org/) - Only parts of Wand require Backbone, see the individual modules for a list of their dependencies.
* [Handlebars](http://handlebarsjs.com/) - Only used in the Templater.