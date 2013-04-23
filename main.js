if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
    return {
      BaseClass: require('./lib/BaseClass'),
      BaseView: require('./lib/BaseView'),
      EventBus: require('./lib/EventBus'),
      EventDispatcher: require('./lib/EventDispatcher'),
      Templater: require('./lib/Templater'),
      Utils: require('./lib/Utils'),
      controls: {
        BaseControl: require('./lib/controls/BaseControl'),
        Checkbox: require('./lib/controls/Checkbox'),
        DropDown: require('./lib/controls/Dropdown'),
        RadioButtonGroup: require('./lib/controls/RadioButtonGroup'),
        TextInput: require('./lib/controls/TextInput')
      },
      io: {
        AbstractLoader: require('./lib/io/AbstractLoader'),
        DataLoader: require('./lib/io/DataLoader'),
        ImageLoader: require('./lib/io/ImageLoader'),
        LoadQueue: require('./lib/io/LoadQueue')
      }
    };
});
