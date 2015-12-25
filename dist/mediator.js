(function (global) {
  'use strict';

    var _ = {
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
        extend: function extend(dest, source) {
      this.each(source, function (val, key) {
        dest[key] = val;
      });
      return dest;
    }
  };

    function Mediator(eventEmitter, settings) {
    settings = _.extend({
      emitHistory: false,
      emitHistoryLength: 0
    }, settings);

    this._eventEmitter = eventEmitter;
    this._components = {};
    this._settings = settings;

    this._emitHistory = settings.emitHistory ? [] : null;
  }

  _.extend(Mediator, {
    EVENTS: {
      ADD: 'mediator:component:add',
      REMOVE: 'mediator:component:remove'
    }
  });

  _.extend(Mediator.prototype,
        {
      _pushEmitHistory: function (component, event) {
        if (this._settings.emitHistory) {
          this._emitHistory.push({
            component: component,
            event: event
          });

          if (this._emitHistory.length > this._settings.emitHistoryLength) {
            this._emitHistory.shift();
          }
        }
      },
            addComponent: function (name, registrator) {
        if (this._components.hasOwnProperty(name)) {
          throw new Error('Component [' + name + '] already exist');
        }

        var meta = registrator(function () {
          if (this.hasComponent(name)) {
            this._eventEmitter.emit.apply(this._eventEmitter, arguments);
            this._pushEmitHistory(name, arguments[0]);
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
            removeComponent: function (name) {
        this._eventEmitter.off('.' + name);

        var componentDeleted = delete this._components[name];

        if (componentDeleted) {
          this._eventEmitter.emit(Mediator.EVENTS.REMOVE, name);
        }

        return componentDeleted;
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
      },

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