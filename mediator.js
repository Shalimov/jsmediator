/** @namespace MediatorDefinition */
(function (global) {
  'use strict';

  /**
   * Internal utilities which help to iterate over object, extend or transform collections
   * @namespace
   * @private
   */
  var _ = {
    /**
     * Function helps to iterate over collection and execute some login that is provided by iterator function on each step if iteration
     * @param {Array|Object} collection Object that will be iterated by provided handler
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
     * @param {Array|Object} collection Object that will be iterated by provided handler
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
   * EventEmitter - provides event-driven system
   * @class
   * @constructor
   * @memberof MediatorDefinition
   */
  function EventEmitter() {
    this._events = {};
  }

  _.extend(EventEmitter.prototype,
    /**
     * @lends EventEmitter.prototype
     * @memberof MediatorDefinition
     */
    {
      /**
       * Method provide ability to subscribe on some event by name and react on it by handler
       * @method
       * @param {string} eventName
       * @param {function} handler
       */
      on: function (eventName, handler) {
        if (this._events.hasOwnProperty(eventName)) {
          this._events[eventName].push(handler);
        } else {
          this._events[eventName] = [handler];
        }
      },
      /**
       * Method allows to subscribe on some event and unsubscribe automatically after event will happen
       * @method
       * @param {string} eventName
       * @param {function} handler
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
       * Method allows to remove subscription for specify handler of all event if handler is not defined
       * @method
       * @param {string} eventName
       * @param {function} [handler]
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
       * Method allows to trigger all handler which are subscribed on some event and also pass any number of arguments
       * @method
       * @param {string} eventName
       * @param {arguments} List of arguments
       */
      emit: function (eventName) {
        if (this._events.hasOwnProperty(eventName)) {
          var args = Array.prototype.slice.call(arguments, 1);

          this._events[eventName].forEach(function (handler) {
            handler.apply(null, args);
          });
        }
      },
      /**
       * Overriding of standart toString method
       * @method
       * @returns {string} Returns string '[object EventEmitter]'
       */
      toString: function () {
        return '[object EventEmitter]';
      }
    });

  /**
   * Mediator - Provide ability to you create a simple mediator to control interaction among components based on low coupling
   * @class
   * @constructor
   * @param {EventEmitter} eventEmitter
   * @param {Object} setting
   * @memberof MediatorDefinition
   */
  function Mediator(eventEmitter, settings) {
    this._eventEmitter = eventEmitter;
    this._components = {};
    this._deps = {};
    this._settings = settings;
  }

  _.extend(Mediator,
    /**
     * @lends Mediator
     * @memberof MediatorDefinition
     */ {
      /**
       * @constant
       */
      EVENTS: {
        /**
         * Event with this name is emitted every time when new component is registered in system
         * @constant
         */
        ADD: 'mediator:add:component',
        /**
         * Event with this name is emitted every time when component is removed in system
         * @constant
         */
        REMOVE: 'mediator:remove:component'
      }
    });

  _.extend(Mediator.prototype,
    /**
     * @lends Mediator.prototype
     * @memberof MediatorDefinition
     */
    {
      /**
       * Method provides ability to add component
       * @method
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
        this._eventEmitter.emit(Mediator.EVENTS.ADD, name, meta);
      },
      /**
       * Method removes existing component, unattached event handlers for component and remove dependencies
       * @method
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

        var componentDeleted = delete this._components[name];

        if (componentDeleted) {
          this._eventEmitter.emit(Mediator.EVENTS.REMOVE, name);
        }

        return componentDeleted;
      },
      /**
       * Method provides you ability to check component existence by name
       * @method
       * @param {string} name
       * @returns {boolean}
       */
      hasComponent: function (name) {
        return !!this._components[name];
      },
      /**
       * Method provides component by name
       * @method
       * @param {string} name
       * @returns {Object}
       */
      getComponent: function (name) {
        return this._components[name];
      },
      /**
       * Method provides components' names list for all registered components
       * @method
       * @returns {Array} Array that contains string names of each registered component
       */
      componentsList: function () {
        return Object.keys(this._components);
      },
      /**
       * Method can be used if you want to share events among several mediators in application
       * @method
       * @param {Mediator} mediator
       */
      shareResponsibility: function (mediator) {
        if (mediator instanceof Mediator) {
          this._eventEmitter = mediator._eventEmitter;
        }
      },

      /**
       * Return string for Instance of Mediator [object Mediator]
       * @method
       * @returns {string}
       */
      toString: function () {
        return '[object Mediator]';
      }
    });

  if (typeof exports !== 'undefined') {
    exports.EventEmitter = EventEmitter;
    exports.Mediator = Mediator;

    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = {
        Mediator: Mediator,
        EventEmitter: EventEmitter
      };
    }
  } else {
    global.EventEmitter = EventEmitter;
    global.Mediator = Mediator;
  }
})(this);