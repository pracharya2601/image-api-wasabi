const { MongoClient } = require('mongodb');

global.mongo = global.mongo || {};

module.exports.connectToDB = async () => {
    
    if(!global.mongo.client) {
        global.mongo.client = new MongoClient(process.env.MONGODB_URL, {
            sslCA: './caCert.pem',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000
        })
        console.log('connecting to DB');
        await global.mongo.client.connect();
        console.log('connected to DB');
    }
    const db = global.mongo.client.db('api-management-testing')
    return { db }
}

