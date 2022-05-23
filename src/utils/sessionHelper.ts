import session from 'express-session';
import { randomBytes } from 'crypto';
import {redisClient} from '@redis/config';
const RedisStore = require("connect-redis")(session);

export const sessionOption = session({
    store: new RedisStore({client: redisClient}),
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    genid: function() {
        return randomBytes(8).toString("hex");
    },
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60 * 10,
    }
})