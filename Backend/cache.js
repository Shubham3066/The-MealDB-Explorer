const { LRUCache } = require("lru-cache");

const cache = new LRUCache({
  max: 100, 
  ttl: 1000 * 60 * 10, 
});

module.exports = cache;

