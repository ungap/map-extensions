((classes, defineProperty) => {
  for (let proto, i = 0; i < classes.length; i++) {
    proto = classes[i].prototype;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/getOrInsert
    if (!('getOrInsert' in proto)) {
      defineProperty(proto, 'getOrInsert', {
        configurable: true,
        writable: true,
        value(key, defaultValue) {
          let value = this.get(key);
          if (value === void 0 && !this.has(key)) {
            value = defaultValue;
            this.set(key, value);
          }
          return /** @type {V} */(value);
        },
      });
    }

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/getOrInsertComputed
    if (!('getOrInsertComputed' in proto)) {
      defineProperty(proto, 'getOrInsertComputed', {
        configurable: true,
        writable: true,
        value(key, callback) {
          let value = this.get(key);
          if (value === void 0 && !this.has(key)) {
            value = callback(key);
            this.set(key, value);
          }
          return /** @type {V} */(value);
        },
      });
    }
  }
})([Map, WeakMap], Object.defineProperty);
