
const cache = new Map();

function setCache(key, data, ttl = 300000) { // default 5 min
    const expiry = Date.now() + ttl;

    cache.set(key, {
        data,
        expiry,
    });
}

function getCache(key) {
    const item = cache.get(key);

    if (!item) return null;

    if (Date.now() > item.expiry) {
        cache.delete(key);
        return null;
    }

    return item.data;
}

module.exports = {
    setCache,
    getCache,
};
