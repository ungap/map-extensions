# Map Extensions

Small ESM polyfill for the latest `Map` and `WeakMap` insertion helpers.

It defines the following methods on `Map.prototype` and `WeakMap.prototype`, only when they are not already available:

  * [`getOrInsert`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/getOrInsert)
  * [`getOrInsertComputed`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/getOrInsertComputed)

## Install

```sh
npm i @ungap/map-extensions
```

## Usage

Import the module once for its side effect:

```js
import '@ungap/map-extensions';

const map = new Map;

map.getOrInsert('key', 'value');
// 'value'

map.getOrInsertComputed('other', key => key.toUpperCase());
// 'OTHER'
```

`getOrInsert(key, value)` stores and returns `value` only when `key` is missing.

`getOrInsertComputed(key, callback)` calls `callback(key)`, stores its result, and returns it only when `key` is missing.

Both methods return the existing value without replacing it when the key is already present.

```js
import 'map-extensions';

const map = new Map([['key', 'current']]);

map.getOrInsert('key', 'next');
// 'current'
```

## WeakMap

The same methods are also available on `WeakMap`:

```js
import '@ungap/map-extensions';

const key = {};
const weakmap = new WeakMap;

weakmap.getOrInsertComputed(key, () => ({ created: true }));
// { created: true }
```

## TypeScript And JSDoc

Types are included. Importing the package augments the global `Map` and `WeakMap` interfaces, and the declaration file also exports typed `Map` and `WeakMap` aliases for JSDoc users.

```js
// @ts-check
import '@ungap/map-extensions';

/**
 * @template K,V
 * @typedef {import('map-extensions').Map<K, V>} Map
 */

/**
 * @template K,V
 * @typedef {import('map-extensions').WeakMap<K, V>} WeakMap
 */

/** @type {Map<string, string>} */
const map = new globalThis.Map;

map.getOrInsert('hello', 'world');
```

Runtime imports are side-effect only; `Map` and `WeakMap` are type exports for TypeScript/JSDoc.