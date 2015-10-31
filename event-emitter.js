(function (global) {
  'use strict';

  function EventEmitter() {
    this._events = {};
  }

  _.extend(EventEmitter.prototype, {
    on: function(eventName, handler) {
      if (this._events.hasOwnProperty(eventName)) {
        this._events[eventName].push(handler);
      } else {
        this._events[eventName] = [handler];
      }
    },

    once: function(eventName, handler) {
      var self = this;

      self.on(eventName, decorator);

      function decorator() {
        try {
          handler.apply(this, arguments);
        } finally {
          self.off(eventName, fakeHandler);
        }
      }
    },

    off: function(eventName, handler) {
      if (handler) {
        var handlerIndex = this._events[eventName].indexOf(handler);
        this._events[eventName].splice(handlerIndex, 1);
      } else {
        delete this._events[eventName];
      }
    },

    emit: function(eventName) {
      if (this._events.hasOwnProperty(eventName)) {
        var args = Array.prototype.slice.call(arguments, 1);

        this._events[eventName].forEach(function(handler) {
          handler.apply(null, args);
        });
      }
    }
  });

  global.EventEmitter = EventEmitter;
})(window);
