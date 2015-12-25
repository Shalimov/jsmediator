/** @namespace global */
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
      var i, length;

      if (Array.isArray(collection)) {
        for (i = 0, length = collection.length; i < length; i++) {
          if (iterator.call(ctx, collection[i], i, collection)) {
            break;
          }
        }
      } else if (typeof collection === 'object') {
        var keys = Object.keys(collection);

        for (i = 0, length = keys.length; i < length; i++) {
          var key = keys[i];
          if (iterator.call(ctx, collection[key], key, collection)) {
            break;
          }
        }
      }
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
   * Mediator - Provide ability to you create a simple mediator to control interaction among components based on low coupling
   * @class
   * @constructor
   * @param {EventEmitter} eventEmitter
   * @param {Object} setting
   * @memberof global
   */
  function Mediator(eventEmitter, settings) {
    this._eventEmitter = eventEmitter;
    this._components = {};
    this._settings = settings;
  }

  _.extend(Mediator, {
    EVENTS: {
      ADD: 'MEDIATOR:EVENT:ADD',
      REMOVE: 'MEDIATOR:EVENT:REMOVE'
    }
  });

  _.extend(Mediator.prototype,
    /**
     * @lends Mediator.prototype
     * @memberof global
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
          throw new Error('Component [' + name + '] already exist');
        }

        var meta = registrator(function () {
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
          _.each(meta.onEvents, function (handler, eventName) {
            this._eventEmitter.on(eventName + '.' + name, handler);
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
        this._eventEmitter.off('.' + name);

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

  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = Mediator;
  } else {
    global.Mediator = Mediator;
  }
})(this);