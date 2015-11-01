(function (global) {
  'use strict';

  /**
   *
   * @type {{each: Function, map: Function, extend: Function}}
   * @private
   */
  var _ = {
    /**
     * Function helps to iterate over collection and execute some login that is provided by iterator function on each step if iteration
     * @param collection Object that will be iterated by provided handler
     * @param {Function} iterator Function that will be invoked for each step of iteration
     * @param {Object} |ctx| Context for iterator
     * */
    each: function (collection, iterator, ctx) {
      if (Array.isArray(collection)) {
        collection.forEach(iterator.bind(ctx));
      } else if (typeof collection === 'object') {
        Object.keys(collection).forEach(function (key) {
          iterator.call(ctx, collection[key], key, collection);
        });
      }
    },
    /**
     * Function helps to iterate over collection and transform values
     * @param collection Object that will be iterated by provided handler
     * @param {Function} iterator Function that will be invoked for each step of iteration
     * @param {Object} |ctx| Context for iterator
     * @returns {Array} Array of transformed values
     */
    map: function (collection, iterator, ctx) {
      var result = [];

      this.each(collection, function (value, key, collection) {
        result.push(handler.call(this, value, key, collection));
      }, ctx);

      return result;
    },
    /**
     * Functions helps to extend an object by the other object properties (Only direct properties (without prototype props))
     * @param {Object} dest Destenation object that will be extended
     * @param {Object} source Source object provides properties for extension
     */
    extend: function extend(dest, source) {
      this.each(source, function (val, key) {
        dest[key] = val;
      });
    }
  };

  /**
   *
   * @constructor
   */
  function EventEmitter() {
    /**
     *
     * @type {Object}
     * @private
     */
    this._events = {};
  }

  _.extend(EventEmitter.prototype, {
    /**
     *
     * @param eventName
     * @param handler
     */
    on: function (eventName, handler) {
      if (this._events.hasOwnProperty(eventName)) {
        this._events[eventName].push(handler);
      } else {
        this._events[eventName] = [handler];
      }
    },
    /**
     *
     * @param eventName
     * @param handler
     */
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
    /**
     *
     * @param eventName
     * @param handler
     */
    off: function (eventName, handler) {
      if (handler) {
        var handlerIndex = this._events[eventName].indexOf(handler);
        this._events[eventName].splice(handlerIndex, 1);
      } else {
        delete this._events[eventName];
      }
    },
    /**
     *
     * @param eventName
     */
    emit: function (eventName) {
      if (this._events.hasOwnProperty(eventName)) {
        var args = Array.prototype.slice.call(arguments, 1);

        this._events[eventName].forEach(function (handler) {
          handler.apply(null, args);
        });
      }
    },

    toString: function () {
      return '[object EventEmitter]';
    }
  });

  /**
   *
   * @param eventEmitter
   * @constructor
   */
  function Mediator(eventEmitter) {
    this._eventEmitter = eventEmitter;
    /**
     * Dictionary to store all registered components
     * @type {Object}
     * @private
     */
    this._components = {};
    /**
     * Dictionary to store all event handler dependencies for registered components
     * @type {Object}
     * @private
     */
    this._deps = {};
  }

  _.extend(Mediator.prototype, {
    /**
     *
     * @param {string} name
     * @param {Function} registrator
     */
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
    /**
     * Method removes existing component, unattached event handlers for component and remove dependencies
     * @param {string} name Component Name
     * @returns {boolean} True if component was removed in opposite false
     */
    removeComponent: function (name) {
      if (this._deps.hasOwnProperty(name)) {
        _.each(this._deps[name], function (dep) {
          this.off(dep.event, dep.handler);
        }, this._eventEmitter);

        delete this._deps[name];
      }

      return delete this._components[name];
    },
    /**
     *
     * @param name
     * @returns {boolean}
     */
    hasComponent: function (name) {
      return !!this._components[name];
    },
    /**
     *
     * @param name
     * @returns {Object}
     */
    getComponent: function (name) {
      return this._components[name];
    },
    /**
     * Function provides components' names list for all registered components
     * @returns {Array} Array that contains string names of each registered component
     */
    componentsList: function () {
      return Object.keys(this._components);
    },
    /**
     *
     * @param {Mediator} mediator
     */
    shareResponsibility: function (mediator) {
      if (mediator instanceof Mediator) {
        this._eventEmitter = mediator._eventEmitter;
      }
    },

    toString: function () {
      return '[object Mediator]';
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