if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(function(require, exports, module) {
    return {
      BaseClass: require('./lib/base-class'),
      BaseView: require('./lib/base-view'),
      EventBus: require('./lib/event-bus'),
      EventDispatcher: require('./lib/event-dispatcher'),
      Templater: require('./lib/templater'),
      Utils: require('./lib/utils'),
      controls: {
        BaseControl: require('./lib/controls/base-control'),
        Checkbox: require('./lib/controls/checkbox'),
        DropDown: require('./lib/controls/drop-down'),
        RadioButtonGroup: require('./lib/controls/radio-button-group'),
        TextInput: require('./lib/controls/text-input')
      },
      io: {
        AbstractLoader: require('./lib/io/AbstractLoader'),
        DataLoader: require('./lib/io/DataLoader'),
        ImageLoader: require('./lib/io/ImageLoader'),
        LoadQueue: require('./lib/io/LoadQueue')
      }
    };
});
