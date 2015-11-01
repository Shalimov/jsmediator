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

    map: function (collection, handler) {
      var result = [];

      this.each(collection, function (value, key, collection) {
        result.push(handler(value, key, collection));
      });

      return result;
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
    this._deps = {};
  }

  _.extend(Mediator.prototype, {
    addComponent: function (name, registrator) {
      if (this._components.hasOwnProperty(name)) {
        throw new Error('Component [' + name + '] already exist')
      }

      var meta = registrator(function emit() {
        if (this.hasComponent(name)) {
          this._eventEmitter.emit.apply(this._eventEmitter, arguments);
        } else {
          throw new Error('Try to emit event by unregistered component: [' + name + ']');
        }
      }.bind(this));

      if (typeof meta !== 'object') {
        throw new Error('Component: [' + name + '] -> mediator#registrator function should return an object');
      }

      if (meta.hasOwnProperty('onEvents')) {

        this._deps[name] = [];

        _.each(meta.onEvents, function (handler, eventName) {
          this._eventEmitter.on(eventName, handler);
          this._deps[name].push({
            event: eventName,
            handler: handler
          });
        }, this);

        delete meta.onEvents;
      }

      this._components[name] = meta;
    },

    removeComponent: function (name) {
      if (this._deps.hasOwnProperty(name)) {
        _.each(this._deps[name], function (dep) {
          this.off(dep.event, dep.handler);
        }, this._eventEmitter);

        delete this._deps[name];
      }

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