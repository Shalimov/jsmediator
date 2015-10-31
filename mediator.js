(function(global) {
  function Mediator(eventEmitter) {
    this._eventEmitter = eventEmitter;
    this._components = {};
    this._deps = [];
  }

  _.extend(Mediator.prototype, {
    addComponent: function(name, registrator) {
      if (this._components.hasOwnProperty(name)) {
        throw new Error('Component [' + name + '] already exist')
      }

      var meta = registrator(this._eventEmitter.emit.bind(this._eventEmitter));

      if (typeof meta !== 'object') {
        throw new Error('Component: [' + name + '] -> mediator#registrator function should return an object');
      }

      if (meta.hasOwnProperty('onEvents')) {
        _.each(meta.onEvents, function(handler, eventName) {
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

    removeComponent: function(name) {
      return delete this._components[name];
    },

    hasComponent: function(name) {
      return !!this._components[name];
    },

    getComponent: function(name) {
      return this._components[name];
    },

    componentsList: function() {
      return Object.keys(this._components);
    },

    getMetaRegistredDeps: function() {
      return this._deps;
    }
  });

  global.Mediator = Mediator;
})(window);
