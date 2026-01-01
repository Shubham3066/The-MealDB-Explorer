const { LRUCache } = require("lru-cache");

const cache = new LRUCache({
  max: 100, // max 100 items
  ttl: 1000 * 60 * 10, // 10 minutes
});

module.exports = cache;
