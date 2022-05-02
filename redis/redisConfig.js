const {createClient} = require('redis');
module.exports = createClient(
    {
        url: 'redis://:OdjhFDfIIuF5eODQ4H7ejU20cgPyJYTJ@SG-redish-testing-50990.servers.mongodirector.com:6379',
        legacyMode: true
    }
);
