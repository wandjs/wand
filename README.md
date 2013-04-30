# Wand

A collection of tools for HTML5 web app development, built on RequireJS, Backbone, Underscore and jQuery.

## Introduction

Wand is aimed primarily at Backbone-based web app development, but many of the modules don't require it as a dependency, meaning it can be used in conjunction with other frameworks and utilities.

The library is designed to be as modular as possible, so use the features you want, and let RequireJS handle the dependencies.


## Modules
* [BaseClass](https://github.com/wandjs/wand/wiki/BaseClass) - Provides prototypal inheritance and Backbone style class definition.
* [BaseView](https://github.com/wandjs/wand/wiki/BaseView) - A subclass of `Backbone.View` that helps with lifecycle management
* [BindableControls](https://github.com/wandjs/wand/wiki/BindableControls) - Lightweight, customizable binding of data sources to HTML controls and views.
* [EventBus](https://github.com/wandjs/wand/wiki/EventBus) - Flexible event system to allow inter-module communication.
* [EventDispatcher](https://github.com/wandjs/wand/wiki/EventDispatcher) - Adds Backbone event dispatching functionality to BaseClass
* [IO](https://github.com/wandjs/wand/wiki/IO) - Extensible data and asset loading framework with an interruptible load queue.
* [Templater](https://github.com/wandjs/wand/wiki/Templater) - Nested templating for Handlebars
* [Utils](https://github.com/wandjs/wand/wiki/Utils) - Lots of useful stuff.

*(See [Roadmap](https://github.com/wandjs/wand#roadmap) for future plans)*



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


##RoadMap

Future plans include:

* Modules to be split out into separate repositories
* A stateful extension to Backbone.Router
* Cascading n-level JavaScript/JSON config manager
* A low level command system to facilitate undo/redo
* A model layer with server state caching and resetting

And in the slightly more distant future, real time and push functionality using Node.js and Socket.io.