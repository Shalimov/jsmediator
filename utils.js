(function(global) {
  'use strict';

  var _ = {
    each: function(collection, handler, ctx) {
      if (Array.isArray(collection)) {
        collection.forEach(handler.bind(ctx));
      } else if (typeof collection === 'object') {
        Object.keys(collection).forEach(function(key) {
          handler.call(ctx, collection[key], key, collection);
        });
      }
    },

    extend: function extend(dest, source) {
      this.each(source, function(val, key) {
        dest[key] = val;
      });
    },

    inherits: function(Child, Parent) {
      Child.prototype = Object.create(Parent.prototype, {
        constructor: {
          writable: false,
          enumerable: false,
          value: Parent
        }
      });

      Child.prototype._super_ = Parent.prototype;
    }
  };

  global._ = _;
})(window);
