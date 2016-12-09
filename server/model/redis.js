const config = require('../conf/config');
const redis = require('redis');
const bluebird = require("bluebird");
const log = require('../utils/log');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = redis.createClient({
    host: config.redisHost,
    port: config.redisPort
});

client.on("error", function (err) {
    log.error("Redis Error " + err);
});

client.on('connect', function () {
    log.debug('Redis is ready');
});

module.exports = client;