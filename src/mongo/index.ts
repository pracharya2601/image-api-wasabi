import { MongoClient } from "mongodb";
import {join, resolve} from 'path';

global.mongo = global.mongo || {};

export const connectToDB = async () => {
    if(!global.mongo.client) {
        global.mongo.client = new MongoClient(process.env.MONGODB_URL as string, {
            //caCert file on home directory which is 2 directory up
            sslCA: join(resolve(__dirname, '../../'), 'caCert.pem'),
            connectTimeoutMS: 10000,
        })
        console.log('connecting to DB');
        await global.mongo.client.connect();
        console.log('connected to DB');
    }
    const db = global.mongo.client.db('api-management-testing');
    return {db}
}