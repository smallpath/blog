const redis = require('redis');
const bluebird = require("bluebird");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

let client = redis.createClient();

client.on("error", function (err) {
    console.log("Redis Error " + err);
});

client.on('connect', function () {
    console.log('Redis is ready');
});

module.exports = client;