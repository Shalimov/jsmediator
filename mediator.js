(function (global) {
  'use strict';

  var _ = {
    each: function (collection, handler, ctx) {
      if (Array.isArray(collection)) {
        collection.forEach(handler.bind(ctx));
      } else if (typeof collection === 'object') {
        Object.keys(collection).forEach(function (key) {
          handler.call(ctx, collection[key], key, collection);
        });
      }
    },

    extend: function extend(dest, source) {
      this.each(source, function (val, key) {
        dest[key] = val;
      });
    }
  };

  function EventEmitter() {
    this._events = {};
  }

  _.extend(EventEmitter.prototype, {
    on: function (eventName, handler) {
      if (this._events.hasOwnProperty(eventName)) {
        this._events[eventName].push(handler);
      } else {
        this._events[eventName] = [handler];
      }
    },

    once: function (eventName, handler) {
      var self = this;

      self.on(eventName, decorator);

      function decorator() {
        try {
          handler.apply(this, arguments);
        } finally {
          self.off(eventName, decorator);
        }
      }
    },

    off: function (eventName, handler) {
      if (handler) {
        var handlerIndex = this._events[eventName].indexOf(handler);
        this._events[eventName].splice(handlerIndex, 1);
      } else {
        delete this._events[eventName];
      }
    },

    emit: function (eventName) {
      if (this._events.hasOwnProperty(eventName)) {
        var args = Array.prototype.slice.call(arguments, 1);

        this._events[eventName].forEach(function (handler) {
          handler.apply(null, args);
        });
      }
    }
  });


  function Mediator(eventEmitter) {
    this._eventEmitter = eventEmitter;
    this._components = {};
    this._deps = [];
  }

  _.extend(Mediator.prototype, {
    addComponent: function (name, registrator) {
      if (this._components.hasOwnProperty(name)) {
        throw new Error('Component [' + name + '] already exist')
      }

      var meta = registrator(this._eventEmitter.emit.bind(this._eventEmitter));

      if (typeof meta !== 'object') {
        throw new Error('Component: [' + name + '] -> mediator#registrator function should return an object');
      }

      if (meta.hasOwnProperty('onEvents')) {
        _.each(meta.onEvents, function (handler, eventName) {
          this._eventEmitter.on(eventName, handler);
          this._deps.push({
            component: name,
            event: eventName
          });
        }, this);

        delete meta.onEvents;
      }

      this._components[name] = meta;
    },

    removeComponent: function (name) {
      return delete this._components[name];
    },

    hasComponent: function (name) {
      return !!this._components[name];
    },

    getComponent: function (name) {
      return this._components[name];
    },

    componentsList: function () {
      return Object.keys(this._components);
    },

    getMetaRegistredDeps: function () {
      return this._deps;
    },

    shareResponsibility: function (mediator) {
      if (mediator instanceof Mediator) {
        this._eventEmitter = mediator._eventEmitter;
      }
    }
  });

  // Export the Mediator object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `Mediator` as a global object.
  if (typeof exports !== 'undefined') {
    exports.EventEmitter = EventEmitter;
    exports.Mediator = Mediator;
    exports._ = _;

    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = {
        Mediator: Mediator,
        EventEmitter: EventEmitter,
        _: _
      };
    }
  } else {
    global.EventEmitter = EventEmitter;
    global.Mediator = Mediator;
    global._ = _;
  }
})(this);