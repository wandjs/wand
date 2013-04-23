# Wand

A collection of tools for HTML5 web app development, built upon Backbone, Underscore and jQuery.

Wand is aimed primarily at Backbone-based web app development, but many of the modules don't require it as a dependency, meaning it can be useful in conjunction with other frameworks and utilities.

Wand is designed to be as modular as possible. You're not required to use all of it if you just want to use part of it - pick and choose the features you want.


## Key features

* Simple modules to help bind data sources to HTML controls, such as checkboxes, radio-buttons and text boxes.
* Extensions to Backbone.View to help with common lifecycle tasks and nested view management.
* Flexible event system to help inter-module communication throughout apps.
* Load manager for loading assets such as images and json data.
* General utilities to help maximise the power of Underscore.js.


## Getting started with Wand in a browser app

### Install Wand via Bower

The best way to install and use Wand in a browser app is to use the [Bower](http://bower.io/) package manager:

    bower install wand

This will install Wand into `components/wand` or whatever directory you've specified in your `.bowerrc` file.

Alternatively you can install Wand via [Jam](http://jamjs.org/):

    jam install wand


### Set up RequireJS

In order to use Wand you must use the [RequireJS](http://requirejs.org/) AMD loader. Wand is written as a CommonJS package, but each module is also wrapped in an AMD function, allowing the library to be used both in Node.js and the browser. Because of this you need to configure RequireJS to treat Wand as a CommonJS package.

To do this just ensure Wand is specified as a package in your RequireJS config:

    require.config({
      packages: [{
        name: 'wand',
        location: '/components/wand'
      }],
    });

(Here we are assuming you've installed Wand into the default `components` directory provided by Bower.)

For more information see [Loading modules from packages](http://requirejs.org/docs/api.html#packages) in the RequireJS documentation.


### Requiring Wand

There are two ways to use Wand in your RequireJS modules:

##### Include the entire Wand library:

    define(['wand'], function(Wand) {
      var Animal = Wand.BaseView.extend({});
      var rounded = Wand.Utils.round(4.5);
    });

This is the most convenient, and preferable method. Each module in Wand will be accessible as a property of the returned `Wand` object. However, be aware that it will load *all* modules. See the example below for an alternative to this.

##### Include the individual modules

    define(['wand/lib/BaseView', 'wand/lib/Utils'], function($, BaseView) {
      var Animal = BaseView.extend({});
      var rounded = Utils.round(4.5);
    });

This is a more explicit approach and allows you to see exactly what modules from Wand are used. It also means that only those modules will be loaded, helping keep script size and download times to a minimum.

(Please note: the `lib` folder is necessary, and is a minor inconvenience in order to support cross-compatibility with CommonJS and AMD formats).

For information on using each Wand module please see the Wiki.


## Using Wand in Node.js

### Install Wand via npm

    npm install wand


### Requiring Wand

As with the browser-based version you can import the entire Wand library, and access the modules as properties of the returned object:

    var Wand = require('wand');
    var rounded = Wand.Utils.round(4.5);

Or you can import the individual modules:

    var Utils = require('wand/lib/Utils');
    var rounded = Wand.Utils.round(4.5);

(Please note: the `lib` folder is necessary, and is a minor inconvenience in order to support cross-compatibility with CommonJS and AMD formats).


## The Wand Modules

TODO: Put links to Wiki pages


## Wand's Dependencies

If you're using npm, Bower, or Jam then dependencies will be managed for you. However it is  useful to understand what frameworks and libraries Wand requires in order to manage browser dependencies safely.


### Hard dependencies

These are required by almost all modules in Wand, and should be included in your browser-based app:

* [RequireJS](http://requirejs.org/) - version `~2.1.5`
* [Underscore.js](http://underscorejs.org/) - version `~1.4.4`


### Optional dependencies

These are required by *some*, but not *all* modules. Please see each module's documentation in the wiki for its exact dependencies.

* [Backbone](http://backbonejs.org/) - version `~1.0.0`
* [Handlebars](http://handlebarsjs.com/) - version `~1.0.10`