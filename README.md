# Wand

> A collection of classes and utilities for HTML5/JavaScript web app development.

## Introduction

Wand is a library of tools to help you write modern web apps. It's designed to be used in conjunction with Backbone, but it's not exclusive to it. Many of the features don't rely on Backbone as a dependency, meaning you're free to use them alone or with other frameworks.

The library is built as a collection of modules, provided in CommonJS and AMD format. You can  use the whole library or just the modules you want. Dependencies are handled for you and unused modules won't be downloaded or included in optimized builds. Wand tries to keep your app as light as possible.


## Modules

* [BaseClass](https://github.com/wandjs/wand/wiki/BaseClass) - Provides Backbone-style definitions for your custom classes.
* [BaseModel](https://github.com/wandjs/wand/wiki/BaseModel) - A subclass of `Backbone.Model` that helps manage nested models.
* [BaseView](https://github.com/wandjs/wand/wiki/BaseView) - A subclass of `Backbone.View` that helps with lifecycle and subview management.
* [BindableControls](https://github.com/wandjs/wand/wiki/BindableControls) - Lightweight, customizable binding of data sources to HTML controls and views.
* [EventBus](https://github.com/wandjs/wand/wiki/EventBus) - Centralised event system for communicating across modules.
* [EventDispatcher](https://github.com/wandjs/wand/wiki/EventDispatcher) - Adds Backbone event dispatching functionality to BaseClass
* [IO](https://github.com/wandjs/wand/wiki/IO) - Extensible data and asset loading framework with an interruptible load queue.
* [Templater](https://github.com/wandjs/wand/wiki/Templater) - Nested templating for Handlebars
* [ShowHide](https://github.com/wandjs/wand/wiki/ShowHide) - A mixin to add show/hide functionality to views.
* [Utils](https://github.com/wandjs/wand/wiki/Utils) - Lots of useful stuff.

*(See [Roadmap](https://github.com/wandjs/wand#roadmap) for future plans)*



## Getting started with Wand in a browser app

The easiest way to get started with Wand is to use the [boilerplate](https://github.com/wandjs/wand-boilerplate) library. If you want to configure it yourself then following steps will show you how.

### Install Wand via Bower

The best way to install and use Wand in a browser app is to use the [Bower](http://bower.io/) package manager:

    bower install wand

This will install Wand into `components/wand` (or the directory you've specified in your `.bowerrc` file).

Wand is also available via [Jam](http://jamjs.org/):

    jam install wand


### Configure RequireJS

In order to use Wand you must use the [RequireJS](http://requirejs.org/) AMD loader. Wand is written as a CommonJS package, but each module is also wrapped in an AMD function, allowing the library to be used both in Node.js and the browser. Because of this you'll need to configure RequireJS to treat Wand as a module:

```javascript
require.config({
  // Map library paths to shorter ones
  paths: {
    'jquery': '/components/jquery/jquery',
    'underscore': '/components/underscore/underscore',
    'backbone': '/components/backbone/backbone'
  },

  // Configure Wand as a CommonJS package
  packages: [{
    name: 'wand',
    location: '/components/wand'
  }]
});
```

**Note:** this assumes you've installed the libraries into the default `components` directory provided by Bower.

See [Loading modules from packages](http://requirejs.org/docs/api.html#packages) in the RequireJS documentation for more information on how to handle CommonJS packages.


### Using Wand

There are two ways to use Wand in your own RequireJS modules:

**Include the entire Wand library:**

    define(['wand'], function(Wand) {
      var Animal = Wand.BaseView.extend({});
      var rounded = Wand.Utils.round(4.5);
    });

This is the most convenient method. Each module in Wand will be accessible as a property of the returned `Wand` object. However, be aware that this will load *all* modules.

**Include the individual modules:**

    define(['wand/lib/BaseView', 'wand/lib/Utils'], function($, BaseView) {
      var Animal = BaseView.extend({});
      var rounded = Utils.round(4.5);
    });

This is a more explicit approach. It ensures only specific modules and their dependencies will be loaded, keeping script size and download times to a minimum.

**Note:** the `lib` in the module paths is necessary.

### The Wand modules

See the [Wand wiki](https://github.com/wandjs/wand/wiki) for information on each module.


## Using Wand in Node.js

### Install Wand via npm

    npm install wand


### Requiring Wand

As with the browser-based version you can use the library in two different ways:

    var Wand = require('wand');
    var rounded = Wand.Utils.round(4.5);

Or import the individual modules:

    var Utils = require('wand/lib/Utils');
    var rounded = Wand.Utils.round(4.5);

**Note:** the `lib` in the module paths is necessary.


## Wand's Dependencies

If you're using npm, Bower, or Jam then dependencies will be managed for you. However it's  useful to understand what frameworks and libraries Wand requires in order to manage browser dependencies safely.


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

* A stateful extension to Backbone.Router
* Cascading n-level JavaScript/JSON config manager
* A low level command system to facilitate undo/redo
* A model layer with server state caching and resetting

And in the slightly more distant future, real time and push functionality using Node.js and Socket.io.