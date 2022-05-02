const {createClient} = require('redis');
module.exports = createClient(
    {
        url: process.env.REDIS_URL,
        legacyMode: true
    }
);
