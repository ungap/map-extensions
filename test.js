// @ts-check

// @ts-ignore
delete Map.prototype.getOrInsert;
// @ts-ignore
delete Map.prototype.getOrInsertComputed;

// @ts-ignore
import('./index.js').then(() => {
  /** @type {import('./index.d.ts').Map<string, string>} */
  const map = new Map;

  console.assert(map.getOrInsert('foo', 'bar') === 'bar', 'getOrInsert');
  console.assert(map.getOrInsertComputed('baz', key => {
    console.assert(key === 'baz', 'key');
    return key;
  }) === 'baz', 'getOrInsertComputed');

});
